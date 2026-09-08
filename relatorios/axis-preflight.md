# AX pre-flight — relatório de prontidão estrutural

- **Alvo:** `/Users/alexsandersiqueira/projects/ux-dx-ax/opensource/axis`
- **Gerado em:** 2026-09-08T00:42:27.115Z
- **Resultado:** **88/100 — Bom** (21/24 sinais)

> Heurística de prontidão estrutural; não mede sucesso de tarefa, qualidade de decisão do agente, latência real nem segurança em produção.

## Resumo por dimensão

| Dimensão | Resultado | Sinais |
|---|---:|---:|
| Contexto e descoberta | 75/100 | 3/4 |
| Ambiente reproduzível | 100/100 | 4/4 |
| Verificação e feedback | 100/100 | 4/4 |
| Automação e governança | 50/100 | 2/4 |
| Interfaces legíveis por máquina | 100/100 | 4/4 |
| Segurança e recuperação | 100/100 | 4/4 |

## Evidências

| Status | Dimensão | Item | Evidência |
|:---:|---|---|---|
| ✅ | Contexto e descoberta | README com propósito e início rápido | README encontrado |
| ✅ | Contexto e descoberta | AGENTS.md com instruções operacionais | AGENTS.md encontrado |
| ❌ | Contexto e descoberta | Guia de contribuição ou desenvolvimento | Guia específico não encontrado |
| ✅ | Contexto e descoberta | Arquitetura, ADRs ou mapa de módulos | Arquitetura descrita no AGENTS.md |
| ✅ | Ambiente reproduzível | Dependências travadas | Busca por lockfiles conhecidos |
| ✅ | Ambiente reproduzível | Versão de runtime/toolchain declarada | package.json engines: {"node":">=18.0.0"} |
| ✅ | Ambiente reproduzível | Instalação ou bootstrap em um comando | Script de bootstrap encontrado |
| ✅ | Ambiente reproduzível | Contrato de configuração e segredos | Busca por exemplo de ambiente ou documentação de variáveis |
| ✅ | Verificação e feedback | Testes presentes e comando canônico | npm test → vitest run |
| ✅ | Verificação e feedback | Checagem de tipos ou compilação | typecheck → tsc --noEmit |
| ✅ | Verificação e feedback | Lint/format automatizado | lint → eslint src/ test/ |
| ✅ | Verificação e feedback | Build executável e documentado | build → tsc -p tsconfig.build.json && npm run build:report-ui |
| ✅ | Automação e governança | Pipeline de CI versionado | 2 workflow(s) GitHub Actions |
| ✅ | Automação e governança | CI executa testes/build | Comandos procurados nos workflows |
| ❌ | Automação e governança | Política de segurança | Busca por SECURITY.md |
| ❌ | Automação e governança | Ownership ou responsáveis claros | Busca por CODEOWNERS ou mantenedores |
| ✅ | Interfaces legíveis por máquina | Contratos/esquemas detectáveis | Busca por OpenAPI, GraphQL, schemas, tipos ou protobuf |
| ✅ | Interfaces legíveis por máquina | Superfície de automação explícita | CLI declarada: {"axis":"./dist/cli.js"} |
| ✅ | Interfaces legíveis por máquina | Exemplos, cenários ou fixtures executáveis | Busca por examples/fixtures/scenarios/samples |
| ✅ | Interfaces legíveis por máquina | Versão e mudanças comunicadas | Versão declarada: 1.17.5 |
| ✅ | Segurança e recuperação | Arquivos de segredo ignorados | Regras verificadas no .gitignore |
| ✅ | Segurança e recuperação | Sandbox, fixtures ou isolamento documentado | Busca por ambiente isolado, fixtures e cenários |
| ✅ | Segurança e recuperação | Limites, timeout ou orçamento explícitos | Busca por limites operacionais documentados |
| ✅ | Segurança e recuperação | Falhas e recuperação orientadas por evidência | Busca por rollback/retry/cleanup/falhas |

## Próximas ações prioritárias

1. **Guia de contribuição ou desenvolvimento:** Registre o fluxo local, convenções e como validar uma mudança.
2. **Política de segurança:** Documente reporte de vulnerabilidades e limites de divulgação.
3. **Ownership ou responsáveis claros:** Defina quem aprova mudanças de risco e mantém instruções do agente.

## Como interpretar

O pré-flight responde ‘o repositório oferece sinais estruturais para um agente começar e se verificar?’. Ele não responde ‘o agente alcança um objetivo real com segurança?’. Para isso, execute cenários repetidos com rubricas e oráculos verificáveis, compare agentes/modelos e registre regressões.
