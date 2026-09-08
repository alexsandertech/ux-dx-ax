#!/usr/bin/env node

import { readFile, access } from "node:fs/promises";
import path from "node:path";

const root = path.dirname(new URL(import.meta.url).pathname);
const read = (relative) => readFile(path.join(root, relative), "utf8");
const parse = async (relative) => JSON.parse(await read(relative));
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const config = await parse("axis.config.json");
assert(
  config.agents?.some((entry) => (typeof entry === "string" ? entry : entry.agent) === "codex"),
  "config deve incluir codex",
);

const scenarios = ["scenarios/01-before.json", "scenarios/02-after.json"];
for (const scenarioPath of scenarios) {
  const scenario = await parse(scenarioPath);
  assert(scenario.name && scenario.prompt, `${scenarioPath}: name/prompt obrigatórios`);
  assert(Array.isArray(scenario.judge) && scenario.judge.length >= 2, `${scenarioPath}: judge insuficiente`);
  const weight = scenario.judge.reduce((total, item) => total + (item.weight ?? 0), 0);
  assert(Math.abs(weight - 1) < 1e-9, `${scenarioPath}: pesos somam ${weight}, esperado 1`);
  const command = scenario.setup?.[0]?.command ?? "";
  const fixture = command.match(/fixtures\/(before|after)/)?.[1];
  assert(fixture, `${scenarioPath}: fixture não detectada no setup`);
  await access(path.join(root, "fixtures", fixture, "src/pricing.js"));
}

for (const relative of ["src/pricing.js", "test/pricing.test.js"]) {
  const before = await read(`fixtures/before/${relative}`);
  const after = await read(`fixtures/after/${relative}`);
  assert(before === after, `${relative}: before e after devem ser idênticos`);
}

await access(path.join(root, "fixtures/after/AGENTS.md"));
await access(path.join(root, "fixtures/after/README.md"));

console.log("✓ axis.config.json válido");
console.log("✓ 2 cenários com rubricas ponderadas em 1.0");
console.log("✓ código e testes idênticos entre before/after");
console.log("✓ after adiciona README.md e AGENTS.md");
console.log("Laboratório pronto para execução com AXIS.");
