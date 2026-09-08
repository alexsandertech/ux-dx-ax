# Demonstração ao vivo — AXIS

Objetivo: executar a mesma issue em dois ambientes equivalentes. A variante
“before” contém código e testes, mas quase nenhum contexto operacional. A
“after” acrescenta contrato, comandos canônicos e limites em `AGENTS.md` e
README. O código defeituoso e os testes são idênticos.

Isso testa uma hipótese útil: **melhor contexto reduz exploração e aumenta a
chance de verificação correta**. Não presuma o resultado; meça e repita.

## 1. Validar o avaliador open source

O clone usado está em `../opensource/axis` no commit registrado em
`../opensource/axis.commit.txt`.

```bash
cd ../opensource/axis
npm ci
npm run build
npm test
npm run typecheck
```

## 2. Fazer uma checagem seca do laboratório

```bash
cd ../../demo
node validate-lab.mjs
```

O comando valida os JSONs, os pesos, os caminhos de fixture e comprova que
código/testes de “before” e “after” são idênticos.

## 3. Executar a avaliação

Pré-requisito: Codex CLI autenticado (`codex login`) ou `CODEX_API_KEY`. A
execução usa tokens e cria somente workspaces temporários isolados.

```bash
node ../opensource/axis/dist/cli.js run
```

Para reduzir custo, execute uma variante por vez:

```bash
node ../opensource/axis/dist/cli.js run --scenario 01-before
node ../opensource/axis/dist/cli.js run --scenario 02-after
```

Consulte a ajuda da versão clonada se a CLI mudar:

```bash
node ../opensource/axis/dist/cli.js run --help
```

## 4. Abrir e comparar evidências

```bash
node ../opensource/axis/dist/cli.js reports latest
node ../opensource/axis/dist/cli.js reports latest --html
```

Observe:

1. Objetivo: implementação correta e testes passando.
2. Ambiente: erros e latência de shell/Node/npm.
3. Serviço: chamadas externas, se houver.
4. Agente: leituras e comandos necessários, relevantes e bem dimensionados.
5. Transcript: número de tentativas, arquivos lidos, erro recuperado e pedido de ajuda.

## 5. Tratar a variância

Uma execução é uma demonstração, não uma conclusão. Para comparar “before” e
“after”, faça no mínimo 3–5 repetições com a mesma versão de agente/modelo,
ordem alternada, estado inicial idêntico e juiz calibrado por amostra humana.
Registre mediana, dispersão, taxa de sucesso e custo — não apenas a melhor nota.

## Plano B para apresentação sem rede/chave

Mostre `../relatorios/axis-preflight.md`, execute o scanner local e abra a
síntese em `../relatorios/comparacao-execucoes.md`, acompanhada dos JSONs
sanitizados em `evidencias/resultado-*.json`. Se você já executou o laboratório,
os relatórios completos ficam localmente em `.axis/reports/`. Preserve
`evidencias/RELATORIO-EXEMPLO.md` como template para novas execuções.
