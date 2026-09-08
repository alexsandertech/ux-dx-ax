# AX × UX × DX — kit de apresentação e laboratório

Pacote em português para uma apresentação técnica sobre **Agent Experience (AX)**,
**User Experience (UX)** e **Developer Experience (DX)**. O material usa o
[AXIS](https://github.com/netlify/axis), da Netlify, como ferramenta open source
de avaliação por cenários.

## Entregáveis

- `apresentacao-introdutoria/` — versão recomendada para introduzir UX, DX e AX.
- `apresentacao/index.html` — 24 slides offline, navegáveis por teclado.
- `apresentacao/AX-UX-DX.pdf` — versão PDF 16:9 pronta para compartilhar.
- `apresentacao/roteiro-do-apresentador.md` — fala sugerida e dinâmica de 35–45 minutos.
- `demo/README.md` — roteiro de demonstração ao vivo com AXIS.
- `demo/scenarios/` — cenário de avaliação pronto para Codex.
- `checklist/checklist-ax.md` — rubrica prática para revisão de projetos.
- `tools/ax-preflight.mjs` — auditoria estática, local e sem dependências.
- `relatorios/axis-preflight.md` — evidência gerada sobre o clone do AXIS.
- `relatorios/comparacao-execucoes.md` — comparação real N=1 de before/after.
- `demo/evidencias/resultado-*.json` — resumos sanitizados das execuções reais.
- `fontes.md` — bibliografia comentada com fontes primárias e confiáveis.
- `opensource/axis/` — submódulo do projeto open source, fixado no commit avaliado.

## Comece aqui

Abra `apresentacao/index.html` no navegador. Use as setas, `Espaço`, `Home`,
`End` e `F` (tela cheia). Para imprimir, use `Ctrl/Cmd + P`; cada slide vira
uma página 16:9.

Reproduza a auditoria estática:

```bash
node tools/ax-preflight.mjs opensource/axis \
  --markdown relatorios/axis-preflight.md \
  --json relatorios/axis-preflight.json
```

Valide o projeto open source clonado:

```bash
cd opensource/axis
npm ci
npm run build
npm test
npm run typecheck
```

Para a avaliação AXIS completa (usa um agente e pode consumir tokens), siga
`demo/README.md`.

Depois de clonar este repositório, inicialize o avaliador com:

```bash
git submodule update --init --recursive
```

## Escopo e honestidade da medição

Neste material, **AX significa Agent Experience**: a experiência de um agente de
IA ao descobrir, compreender e operar um sistema para alcançar um objetivo
delegado. É um campo emergente; não é uma norma ISO consolidada. A nota do
pré-flight indica apenas prontidão estrutural. A evidência mais forte vem de
cenários reais, oráculos verificáveis, repetições e telemetria de produção.
