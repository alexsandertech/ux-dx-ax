# Comparação ilustrativa AXIS — before × after

Duas execuções reais, uma por condição, realizadas em 7 de setembro de 2026.
**N = 1 por condição:** os números demonstram o método, não provam superioridade.

| Medida do manifest | Before | After | Diferença observada |
|---|---:|---:|---:|
| AXIS Result | 98 | 99 | +1 ponto |
| Goal Achievement | 100 | 100 | igual |
| Environment | 93 | 100 | +7 pontos |
| Service | 100 | 100 | igual; 0 chamadas externas |
| Agent | 95 | 96 | +1 ponto |
| Duração | 115,717 s | 56,470 s | after 51,2% menor |
| Interações | 12 | 9 | after 25% menor |
| Tool interactions de ambiente | 7 | 4 | after 42,9% menor |
| Input tokens reportados | 128.573 | 68.819 | after 46,5% menor |
| Cache-read input reportado | 118.656 | 57.984 | after 51,1% menor |
| Output tokens reportados | 2.405 | 1.118 | after 53,5% menor |

## Leitura do transcript

- Ambos alcançaram o objetivo e passaram seus testes finais.
- Before precisou procurar instruções em diretórios ancestrais, consultar Git em
  um workspace que não era repositório e fazer uma segunda rodada de alteração
  após explorar precisão numérica. O juiz considerou essa exploração relevante,
  por isso a diferença no score de agente foi pequena.
- After encontrou `AGENTS.md`, README, scripts canônicos e contrato explícito;
  executou baseline, uma alteração, `npm test` e `npm run check`.
- O dado mais visível em N=1 foi eficiência da trajetória, não sucesso final.

## Limitações

- Mesma família de agente atuou e julgou. Para benchmark, use juiz independente
  e calibre com revisão humana.
- Agentes são estocásticos; 3–5 repetições é um mínimo operacional, não garantia
  estatística universal.
- Os campos de tokens são reproduzidos exatamente como o AXIS os registrou. A
  documentação do AXIS diz que limites durante streaming usam estimativa
  conservadora e que a contagem autoritativa chega ao fim. Não converta esta
  soma em custo sem confirmar a semântica de cache da versão do Codex usada.
- O cenário mede AX de desenvolvimento em um laboratório pequeno; não cobre
  segurança de produção, integração externa, dados reais ou rollback.

## Evidências publicáveis

- Before: `demo/evidencias/resultado-before.json`
- After: `demo/evidencias/resultado-after.json`
- Relatórios completos e transcripts permanecem locais em `demo/.axis/` e não
  são versionados, pois podem conter caminhos, prompts e outros dados do ambiente.
