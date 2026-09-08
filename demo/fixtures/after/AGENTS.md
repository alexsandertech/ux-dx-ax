# Instruções para agentes

## Escopo

Este repositório contém um único módulo público em `src/pricing.js`. Preserve o
nome, os argumentos e a exportação `calculateTotalInCents`.

## Contrato

- `unitPriceInCents`: inteiro maior ou igual a zero.
- `quantity`: inteiro maior ou igual a 1.
- `discountPercent`: número entre 0 e 100, inclusive.
- retorno: inteiro em centavos; arredonde o resultado final com `Math.round`.
- entradas fora do domínio devem lançar `TypeError` com o nome do argumento.

## Verificação

Execute `npm test` durante a iteração e `npm run check` antes de concluir. Não
modifique testes para acomodar uma implementação incorreta. Não adicione
dependências para esta tarefa.

