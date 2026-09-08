#!/usr/bin/env node

/**
 * AX pre-flight: auditoria heurística e determinística de prontidão estrutural.
 * Sem dependências, sem IA e sem envio de código. Node.js 18+.
 *
 * Não mede sucesso de agentes. Use um executor de cenários (por exemplo, AXIS)
 * para medir resultado, trajetória, latência e recuperação em tarefas reais.
 */

import { access, readFile, readdir, stat, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const args = process.argv.slice(2);
const targetArg = args.find((arg) => !arg.startsWith("--")) ?? ".";
const valueAfter = (flag) => {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
};

const root = path.resolve(targetArg);
const markdownPath = valueAfter("--markdown");
const jsonPath = valueAfter("--json");
const ignored = new Set([".git", "node_modules", "dist", "build", "coverage", ".next", ".cache"]);

async function exists(relativePath) {
  try {
    await access(path.join(root, relativePath));
    return true;
  } catch {
    return false;
  }
}

async function readText(relativePath) {
  try {
    return await readFile(path.join(root, relativePath), "utf8");
  } catch {
    return "";
  }
}

async function walk(directory = root, depth = 0) {
  if (depth > 5) return [];
  let entries = [];
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch {
    return [];
  }
  const files = [];
  for (const entry of entries) {
    if (ignored.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(absolute, depth + 1)));
    else files.push(path.relative(root, absolute));
  }
  return files;
}

async function newestMtime(files) {
  let newest = 0;
  for (const file of files.slice(0, 5000)) {
    try {
      newest = Math.max(newest, (await stat(path.join(root, file))).mtimeMs);
    } catch {
      // File changed while scanning; ignore this evidence.
    }
  }
  return newest ? new Date(newest).toISOString() : null;
}

const files = await walk();
const lowerFiles = files.map((file) => file.toLowerCase());
const packageText = await readText("package.json");
let pkg = {};
try {
  pkg = packageText ? JSON.parse(packageText) : {};
} catch {
  pkg = {};
}
const scripts = pkg.scripts ?? {};
const readme = (await readText("README.md")) || (await readText("readme.md"));
const agents = await readText("AGENTS.md");
const gitignore = await readText(".gitignore");
const workflows = await Promise.all(
  files
    .filter((file) => /^\.github\/workflows\/.*\.ya?ml$/i.test(file))
    .map((file) => readText(file)),
);
const ciText = workflows.join("\n");

const hasAny = (...patterns) => lowerFiles.some((file) => patterns.some((pattern) => pattern.test(file)));
const scriptMatches = (pattern) => Object.entries(scripts).some(([name, command]) => pattern.test(name) || pattern.test(String(command)));
const contentMatches = (content, pattern) => pattern.test(content);

const checks = [
  {
    category: "Contexto e descoberta",
    id: "readme",
    label: "README com propósito e início rápido",
    pass: Boolean(readme) && /install|quick.?start|getting.?started|come[cç]ar|uso|usage/i.test(readme),
    evidence: readme ? "README encontrado" : "README ausente",
    action: "Explique propósito, pré-requisitos, instalação e primeiro resultado esperado.",
  },
  {
    category: "Contexto e descoberta",
    id: "agents",
    label: "AGENTS.md com instruções operacionais",
    pass: Boolean(agents) && /test|build|lint|verif|arquitet|architecture/i.test(agents),
    evidence: agents ? "AGENTS.md encontrado" : "AGENTS.md ausente",
    action: "Documente mapa do repositório, comandos canônicos, limites e critério de pronto.",
  },
  {
    category: "Contexto e descoberta",
    id: "contributing",
    label: "Guia de contribuição ou desenvolvimento",
    pass: hasAny(/(^|\/)contributing\.md$/, /(^|\/)development\.md$/, /(^|\/)docs\/.*develop/),
    evidence: hasAny(/(^|\/)contributing\.md$/) ? "CONTRIBUTING.md encontrado" : "Guia específico não encontrado",
    action: "Registre o fluxo local, convenções e como validar uma mudança.",
  },
  {
    category: "Contexto e descoberta",
    id: "architecture",
    label: "Arquitetura, ADRs ou mapa de módulos",
    pass: hasAny(/architecture\.md$/, /(^|\/)adr[s]?\//, /(^|\/)docs\/.*architect/) || /## architecture|## arquitetura/i.test(agents),
    evidence: /## architecture|## arquitetura/i.test(agents) ? "Arquitetura descrita no AGENTS.md" : "Busca por arquitetura/ADRs",
    action: "Mostre limites de módulos, dependências e decisões que não devem ser revertidas.",
  },

  {
    category: "Ambiente reproduzível",
    id: "lockfile",
    label: "Dependências travadas",
    pass: hasAny(/(^|\/)(package-lock\.json|pnpm-lock\.yaml|yarn\.lock|uv\.lock|poetry\.lock|cargo\.lock|go\.sum)$/),
    evidence: "Busca por lockfiles conhecidos",
    action: "Versione o lockfile apropriado ao ecossistema.",
  },
  {
    category: "Ambiente reproduzível",
    id: "runtime",
    label: "Versão de runtime/toolchain declarada",
    pass: Boolean(pkg.engines) || hasAny(/(^|\/)(\.nvmrc|\.node-version|\.python-version|rust-toolchain.*|go\.mod|mise\.toml|\.tool-versions)$/),
    evidence: pkg.engines ? `package.json engines: ${JSON.stringify(pkg.engines)}` : "Busca por arquivo de toolchain",
    action: "Fixe a versão compatível de runtime e package manager.",
  },
  {
    category: "Ambiente reproduzível",
    id: "bootstrap",
    label: "Instalação ou bootstrap em um comando",
    pass: Boolean(scripts.prepare || scripts.setup || scripts.bootstrap) || /npm (ci|install)|pnpm install|yarn install|make (setup|install)|uv sync/i.test(readme),
    evidence: scripts.setup || scripts.bootstrap || scripts.prepare ? "Script de bootstrap encontrado" : "Comando procurado no README",
    action: "Forneça um comando idempotente para preparar o ambiente.",
  },
  {
    category: "Ambiente reproduzível",
    id: "env-contract",
    label: "Contrato de configuração e segredos",
    pass: hasAny(/(^|\/)\.env\.example$/, /(^|\/)\.env\.sample$/, /config.*example/) || /environment variable|vari[aá]ve(is|l) de ambiente|api key/i.test(readme + agents),
    evidence: "Busca por exemplo de ambiente ou documentação de variáveis",
    action: "Liste variáveis, defaults seguros e onde obter credenciais; nunca versione segredos.",
  },

  {
    category: "Verificação e feedback",
    id: "tests",
    label: "Testes presentes e comando canônico",
    pass: scriptMatches(/^test$|vitest|jest|pytest|go test|cargo test/i) && hasAny(/(^|\/)(test|tests|__tests__)\//, /\.(test|spec)\.[cm]?[jt]sx?$/, /_test\.go$/),
    evidence: scripts.test ? `npm test → ${scripts.test}` : "Script de teste não encontrado",
    action: "Inclua testes rápidos e um comando de saída não interativa.",
  },
  {
    category: "Verificação e feedback",
    id: "types",
    label: "Checagem de tipos ou compilação",
    pass: scriptMatches(/typecheck|tsc|mypy|pyright|cargo check|go vet/i),
    evidence: scripts.typecheck ? `typecheck → ${scripts.typecheck}` : "Busca nos scripts",
    action: "Disponibilize uma checagem estrutural rápida, quando aplicável.",
  },
  {
    category: "Verificação e feedback",
    id: "lint",
    label: "Lint/format automatizado",
    pass: scriptMatches(/lint|eslint|ruff|golangci|clippy|format|prettier/i),
    evidence: scripts.lint ? `lint → ${scripts.lint}` : "Busca nos scripts",
    action: "Forneça lint/format determinísticos e, se possível, autofix seguro.",
  },
  {
    category: "Verificação e feedback",
    id: "build",
    label: "Build executável e documentado",
    pass: scriptMatches(/^build$|tsc|cargo build|go build|make build/i),
    evidence: scripts.build ? `build → ${scripts.build}` : "Busca nos scripts",
    action: "Padronize o build e deixe claro o artefato esperado.",
  },

  {
    category: "Automação e governança",
    id: "ci",
    label: "Pipeline de CI versionado",
    pass: workflows.length > 0 || hasAny(/(^|\/)(\.gitlab-ci\.yml|jenkinsfile|azure-pipelines\.yml)$/),
    evidence: `${workflows.length} workflow(s) GitHub Actions`,
    action: "Execute os validadores canônicos em cada mudança.",
  },
  {
    category: "Automação e governança",
    id: "ci-tests",
    label: "CI executa testes/build",
    pass: /npm test|npm run build|pnpm test|yarn test|pytest|go test|cargo test/i.test(ciText),
    evidence: ciText ? "Comandos procurados nos workflows" : "Nenhum workflow lido",
    action: "Não deixe comandos documentados divergirem do pipeline real.",
  },
  {
    category: "Automação e governança",
    id: "security",
    label: "Política de segurança",
    pass: hasAny(/(^|\/)(security\.md|\.github\/security\.md)$/),
    evidence: "Busca por SECURITY.md",
    action: "Documente reporte de vulnerabilidades e limites de divulgação.",
  },
  {
    category: "Automação e governança",
    id: "ownership",
    label: "Ownership ou responsáveis claros",
    pass: hasAny(/(^|\/)(codeowners|\.github\/codeowners)$/) || /maintainer|owner|respons[aá]vel/i.test(readme),
    evidence: "Busca por CODEOWNERS ou mantenedores",
    action: "Defina quem aprova mudanças de risco e mantém instruções do agente.",
  },

  {
    category: "Interfaces legíveis por máquina",
    id: "contracts",
    label: "Contratos/esquemas detectáveis",
    pass: hasAny(/openapi.*\.ya?ml$/, /swagger.*\.json$/, /schema.*\.json$/, /graphql/, /src\/types\//, /proto\//) || hasAny(/tsconfig\.json$/),
    evidence: "Busca por OpenAPI, GraphQL, schemas, tipos ou protobuf",
    action: "Publique schemas, tipos, exemplos válidos e versões da interface.",
  },
  {
    category: "Interfaces legíveis por máquina",
    id: "agent-surface",
    label: "Superfície de automação explícita",
    pass: Boolean(pkg.bin) || hasAny(/mcp/, /cli\.[cm]?[jt]s$/, /makefile$/, /justfile$/) || /command|cli|api|mcp/i.test(readme),
    evidence: pkg.bin ? `CLI declarada: ${JSON.stringify(pkg.bin)}` : "Busca por CLI/API/MCP",
    action: "Ofereça API/CLI/MCP estável, descoberta simples e saída estruturada.",
  },
  {
    category: "Interfaces legíveis por máquina",
    id: "examples",
    label: "Exemplos, cenários ou fixtures executáveis",
    pass: hasAny(/(^|\/)(examples?|fixtures?|scenarios?|samples?)\//),
    evidence: "Busca por examples/fixtures/scenarios/samples",
    action: "Inclua um caminho feliz mínimo e casos de erro reproduzíveis.",
  },
  {
    category: "Interfaces legíveis por máquina",
    id: "versioning",
    label: "Versão e mudanças comunicadas",
    pass: Boolean(pkg.version) && (hasAny(/(^|\/)changelog\.md$/) || /semantic version|versioning|release/i.test(readme)),
    evidence: pkg.version ? `Versão declarada: ${pkg.version}` : "Versão não encontrada",
    action: "Use versionamento previsível e changelog orientado a impacto.",
  },

  {
    category: "Segurança e recuperação",
    id: "secret-hygiene",
    label: "Arquivos de segredo ignorados",
    pass: /(^|\n)\.env(\n|\*|$)|\.env\./m.test(gitignore) || /secret|credential|api key/i.test(agents),
    evidence: gitignore ? "Regras verificadas no .gitignore" : ".gitignore ausente",
    action: "Ignore segredos e declare credenciais somente por nome/escopo.",
  },
  {
    category: "Segurança e recuperação",
    id: "isolation",
    label: "Sandbox, fixtures ou isolamento documentado",
    pass: hasAny(/devcontainer/, /docker-compose/, /fixtures?\//, /scenarios?\//) || /sandbox|isolat|workspace tempor/i.test(readme + agents),
    evidence: "Busca por ambiente isolado, fixtures e cenários",
    action: "Faça avaliações mutáveis apenas em sandbox e com dados descartáveis.",
  },
  {
    category: "Segurança e recuperação",
    id: "limits",
    label: "Limites, timeout ou orçamento explícitos",
    pass: /timeout|rate.?limit|token|budget|limite/i.test(readme + agents) || hasAny(/renovate\.json$/, /dependabot/),
    evidence: "Busca por limites operacionais documentados",
    action: "Defina timeout, orçamento, escopo de ação e política de retry.",
  },
  {
    category: "Segurança e recuperação",
    id: "recovery",
    label: "Falhas e recuperação orientadas por evidência",
    pass: /rollback|retry|cleanup|teardown|recover|failed|erro|failure/i.test(readme + agents),
    evidence: "Busca por rollback/retry/cleanup/falhas",
    action: "Forneça erros acionáveis, operações idempotentes e caminho de rollback/cleanup.",
  },
];

const categories = [...new Set(checks.map((check) => check.category))].map((name) => {
  const categoryChecks = checks.filter((check) => check.category === name);
  const passed = categoryChecks.filter((check) => check.pass).length;
  return {
    name,
    passed,
    total: categoryChecks.length,
    score: Math.round((passed / categoryChecks.length) * 100),
  };
});

const passed = checks.filter((check) => check.pass).length;
const score = Math.round(categories.reduce((total, category) => total + category.score, 0) / categories.length);
const level = score >= 90 ? "Excelente" : score >= 75 ? "Bom" : score >= 60 ? "Básico" : "Frágil";
const report = {
  schema: "ax-preflight/v1",
  generatedAt: new Date().toISOString(),
  target: root,
  fileCount: files.length,
  newestFileMtime: await newestMtime(files),
  score,
  level,
  passed,
  total: checks.length,
  categories,
  checks,
  caveat:
    "Heurística de prontidão estrutural; não mede sucesso de tarefa, qualidade de decisão do agente, latência real nem segurança em produção.",
};

function escapeCell(value) {
  return String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
}

function toMarkdown(data) {
  const lines = [
    "# AX pre-flight — relatório de prontidão estrutural",
    "",
    `- **Alvo:** \`${data.target}\``,
    `- **Gerado em:** ${data.generatedAt}`,
    `- **Resultado:** **${data.score}/100 — ${data.level}** (${data.passed}/${data.total} sinais)`,
    "",
    `> ${data.caveat}`,
    "",
    "## Resumo por dimensão",
    "",
    "| Dimensão | Resultado | Sinais |",
    "|---|---:|---:|",
    ...data.categories.map((category) => `| ${category.name} | ${category.score}/100 | ${category.passed}/${category.total} |`),
    "",
    "## Evidências",
    "",
    "| Status | Dimensão | Item | Evidência |",
    "|:---:|---|---|---|",
    ...data.checks.map(
      (check) =>
        `| ${check.pass ? "✅" : "❌"} | ${escapeCell(check.category)} | ${escapeCell(check.label)} | ${escapeCell(check.evidence)} |`,
    ),
    "",
    "## Próximas ações prioritárias",
    "",
    ...data.checks.filter((check) => !check.pass).map((check, index) => `${index + 1}. **${check.label}:** ${check.action}`),
    ...(data.checks.every((check) => check.pass) ? ["1. Nenhuma lacuna heurística; avance para cenários AXIS e observação em produção."] : []),
    "",
    "## Como interpretar",
    "",
    "O pré-flight responde ‘o repositório oferece sinais estruturais para um agente começar e se verificar?’. Ele não responde ‘o agente alcança um objetivo real com segurança?’. Para isso, execute cenários repetidos com rubricas e oráculos verificáveis, compare agentes/modelos e registre regressões.",
    "",
  ];
  return lines.join("\n");
}

async function save(outputPath, contents) {
  const absolute = path.resolve(outputPath);
  await mkdir(path.dirname(absolute), { recursive: true });
  await writeFile(absolute, contents, "utf8");
}

if (markdownPath) await save(markdownPath, toMarkdown(report));
if (jsonPath) await save(jsonPath, `${JSON.stringify(report, null, 2)}\n`);

console.log(`AX pre-flight: ${report.score}/100 — ${report.level} (${report.passed}/${report.total})`);
for (const category of categories) {
  console.log(`  ${String(category.score).padStart(3)}  ${category.name}`);
}
if (markdownPath) console.log(`Markdown: ${path.resolve(markdownPath)}`);
if (jsonPath) console.log(`JSON: ${path.resolve(jsonPath)}`);

