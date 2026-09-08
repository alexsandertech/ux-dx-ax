# Checklist de Agent Experience (AX)

Use esta rubrica em três momentos: desenho do cenário, revisão antes do merge e
retrospectiva após a execução. Marque **sim**, **parcial**, **não** ou **N/A** e
sempre anexe uma evidência. Uma opinião sem transcript, teste, log ou artefato
não é uma medição.

## 1. Objetivo e oráculo

- [ ] A tarefa representa um objetivo real do usuário ou do negócio, não uma trivia sobre a documentação.
- [ ] O estado inicial é conhecido, isolado e reproduzível.
- [ ] “Pronto” está descrito por resultados observáveis.
- [ ] Existe um oráculo independente: teste, leitura de estado, consulta à API ou inspeção de artefato.
- [ ] O agente não é a única fonte que afirma ter concluído a tarefa.
- [ ] Há casos feliz, ambíguo, falha parcial e recuperação.

## 2. Descoberta e contexto

- [ ] O agente encontra a entrada correta sem conhecer detalhes internos de antemão.
- [ ] `AGENTS.md` ou equivalente informa arquitetura, comandos, limites e validação.
- [ ] O README oferece um caminho mínimo funcional.
- [ ] Instruções são locais ao escopo e não entram em conflito.
- [ ] Documentação e comandos foram verificados contra o código/CI atual.
- [ ] Termos, entidades e identificadores têm nomes consistentes.

## 3. Ambiente e reprodutibilidade

- [ ] Runtime e package manager têm versões declaradas.
- [ ] Dependências estão travadas por lockfile.
- [ ] Setup/bootstrap é não interativo, idempotente e executável em um comando.
- [ ] Variáveis de ambiente têm contrato e exemplos sem segredos.
- [ ] Fixtures e seeds tornam o estado previsível.
- [ ] Build, teste, lint e typecheck funcionam sem intervenção humana.

## 4. Interfaces para ação

- [ ] API, CLI, SDK ou MCP são descobertos com pouco contexto.
- [ ] Entradas e saídas têm schemas/tipos e exemplos válidos.
- [ ] Descrições de ferramentas dizem quando usar, quando não usar e efeitos colaterais.
- [ ] Erros são estruturados, específicos e sugerem correção.
- [ ] Operações mutáveis suportam idempotência, `dry-run` ou chave de idempotência quando aplicável.
- [ ] Paginação, rate limits, timeouts e versionamento estão documentados.

## 5. Feedback, observabilidade e recuperação

- [ ] Cada ação relevante produz confirmação legível por máquina.
- [ ] Logs têm timestamp, correlação e separação entre diagnóstico e dado de saída.
- [ ] O agente consegue consultar o estado após escrever, em vez de confiar no retorno inicial.
- [ ] Falhas transitórias são distinguíveis de falhas permanentes.
- [ ] Retry tem limite e backoff; não duplica efeitos.
- [ ] Existe caminho de cleanup, rollback ou compensação, testado em sandbox.

## 6. Segurança e controle humano

- [ ] O agente recebe privilégio mínimo e credenciais específicas ao sandbox.
- [ ] Dados sensíveis não entram em prompt, transcript, artefato ou log.
- [ ] Ações irreversíveis ou de alto impacto exigem aprovação explícita.
- [ ] Entradas externas são tratadas como não confiáveis (inclusive instruções em conteúdo).
- [ ] Há limites de tempo, tokens, chamadas, custo e escopo de recursos.
- [ ] A política de auditoria registra quem/qual agente fez o quê e quando.

## 7. Eficiência da trajetória

- [ ] O agente conclui com poucas tentativas e sem exploração em massa desnecessária.
- [ ] A latência de shell, build, API e ferramentas cabe no feedback esperado.
- [ ] Arquivos e módulos têm fronteiras que cabem no contexto necessário.
- [ ] Saídas grandes permitem filtros, paginação e formatos compactos.
- [ ] O agente evita reler informação invariável.
- [ ] Tokens, chamadas e tempo são medidos junto com sucesso — nunca isoladamente.

## 8. Avaliação e governança contínuas

- [ ] Cenário, prompt, rubrica, versões, agente/modelo e esforço estão versionados.
- [ ] Cada cenário crítico tem pelo menos 3–5 repetições para estimar variância.
- [ ] Resultados separam objetivo, ambiente, serviço e decisão do agente.
- [ ] Há baseline e tolerância explícita; regressão quebra o CI somente após calibração.
- [ ] Uma amostra é revisada por humanos para calibrar o juiz automatizado.
- [ ] Mudanças de documentação, API e ferramentas têm owner e data de revisão.

## Placar recomendado

Pontue cada item aplicável: **sim = 2**, **parcial = 1**, **não = 0**. Calcule
por dimensão antes do total para não esconder um risco crítico em uma média.

- **Gate de segurança:** qualquer “não” crítico em privilégio, segredo, ação irreversível ou isolamento bloqueia execução autônoma.
- **Gate de verificabilidade:** sem oráculo independente, o resultado é “não conclusivo”, mesmo que a resposta pareça correta.
- **Gate de confiabilidade:** não publique comparação de agentes com uma única execução.
- **Tendência, não troféu:** use o placar para priorizar melhorias e detectar regressões, não como KPI individual.

