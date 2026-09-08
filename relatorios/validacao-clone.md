# Validação do clone open source — Netlify AXIS

- Repositório: <https://github.com/netlify/axis>
- Commit: `71fb75838c5873bf27f9b97e3240baa19b0b16b8`
- Versão: `1.17.5`
- Licença declarada: MIT
- Ambiente da validação: macOS arm64, Node disponível no shell de execução
- Data: 7 de setembro de 2026 (America/Sao_Paulo)

## Resultado

1. `npm ci`: concluído, 691 pacotes adicionados.
2. `npm run build`: concluído; TypeScript e report UI gerados.
3. `npm test`: **53 arquivos e 1.129 testes aprovados**.
4. `npm run typecheck`: concluído sem erro.
5. CLI: versão `1.17.5`; `run --scenario`, `reports --html` e baselines confirmados pela ajuda local.

## Achados úteis para a apresentação

- Na primeira tentativa, `npm test` foi executado antes de gerar a report UI:
  29 testes falharam com a mensagem para executar `npm run build:report-ui`.
  Após seguir a ordem documentada — build antes dos testes — toda a suíte passou.
  Isso é um exemplo concreto de como uma instrução operacional reduz falha de
  ambiente para pessoas e agentes.
- `npm ci`/`npm audit` reportou **15 vulnerabilidades conhecidas nas
  dependências**: 1 baixa, 3 moderadas, 10 altas e 1 crítica. Nenhum `audit fix`
  foi aplicado porque o clone é evidência de terceiro e uma correção automática
  poderia alterar compatibilidade. Antes de uso em produção, a equipe deve
  revisar o relatório completo, o alcance (runtime vs. dev dependency) e as
  versões corrigidas.
- O build emitiu um aviso de fonte `Digerati-Regular.woff` não resolvida no
  momento do bundle; o build terminou com sucesso.

## Comandos reproduzíveis

```bash
cd opensource/axis
npm ci
npm run build
npm test
npm run typecheck
npm audit
```

