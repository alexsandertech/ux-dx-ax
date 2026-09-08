# Roteiro do apresentador — AX × UX × DX

Formato sugerido: **35–45 minutos**, incluindo demo e discussão. Reduza para 25
minutos pulando os slides de método e executando apenas o pré-flight.

## 1. Abertura — 2 min

Pergunta para a sala: “Se um novo desenvolvedor levasse dois dias para rodar os
testes, chamaríamos isso de boa DX. Por que aceitamos que um agente trabalhe sem
conseguir descobrir o mesmo comando?”

Defina a promessa: sair com um modelo mental, uma forma de medir e um
laboratório reproduzível — não com uma lista de prompts mágicos.

## 2. Três experiências, um sistema — 5 min

UX observa a pessoa no contexto de uso. DX observa quem constrói/opera o
software dentro de um sistema sociotécnico. AX observa um agente que recebe um
objetivo delegado, interpreta contexto, escolhe ferramentas, altera estado e
precisa verificar o resultado.

Ressalva importante: “Agent Experience” é uma disciplina emergente. A ISO
fundamenta UX; SPACE e DORA fundamentam DX; para AX, usamos definição comunitária
e uma implementação open source, sempre expondo premissas.

## 3. Da resposta à ação — 3 min

Contraste chatbot e agente. O risco muda quando o modelo pode executar shell,
gravar arquivos, chamar API ou publicar algo. Um texto plausível não é mais o
resultado: o estado correto, seguro e auditável é.

## 4. O loop AX — 4 min

Percorra: descobrir → compreender → planejar → agir → observar → verificar →
recuperar. Em cada etapa, pergunte qual evidência o sistema oferece. Mostre que
README/AGENTS.md ajudam no começo, mas testes, estados consultáveis e rollback
fecham o loop.

## 5. Pirâmide de avaliação — 4 min

Explique os três níveis:

1. pré-flight estático: barato, rápido, detecta ausência de affordances;
2. cenários sintéticos: mede tarefas e trajetória sob controle;
3. produção: mede distribuição real, incidentes, custo e impacto humano.

Nenhuma camada substitui a outra. O scanner entregue é propositalmente
heurístico; o AXIS executa cenários; telemetria real fica sob governança da
organização.

## 6. AXIS — 5 min

Mostre o clone e o commit fixado. Aponte o design do resultado: Goal Achievement
40%, Environment 20%, Service 20%, Agent 20% por padrão. O valor didático está
na separação:

- ambiente/serviço: a chamada funcionou e foi rápida?
- agente: a chamada deveria ter acontecido, foi relevante e bem dimensionada?
- objetivo: o estado final atende a rubrica?

Reforce que pesos são configuráveis e a nota serve como baseline/direção.

## 7. Demo — 8 a 12 min

Antes da reunião, rode o roteiro em `demo/README.md` e guarde o relatório HTML.
Ao vivo:

1. mostre que código e testes de `before` e `after` são iguais;
2. mostre apenas os arquivos contextuais adicionados no `after`;
3. execute `list` e, se rede/autenticação estiverem estáveis, um cenário;
4. abra o transcript e procure evidências, não apenas a nota;
5. se houver falha de rede/chave, use o relatório previamente salvo e execute o
   pré-flight local — isso também demonstra desenho resiliente da apresentação.

Não prometa que “after sempre vence”. A hipótese é testável e agentes são
estocásticos; uma inversão em uma execução é uma ótima ponte para falar de
repetição e dispersão.

## 8. Checklist e gates — 5 min

Mostre as oito dimensões em `checklist/checklist-ax.md`. Destaque três gates:

- sem segurança/isolamento, não há autonomia;
- sem oráculo independente, o resultado é inconclusivo;
- sem repetição, não há comparação confiável.

## 9. Fechamento — 3 min

Três mensagens:

1. boa DX é a infraestrutura invisível da AX, mas AX adiciona delegação,
   trajetória e risco de ação;
2. medir resultado sem trajetória esconde fragilidade; medir trajetória sem
   resultado recompensa movimento;
3. comece com um fluxo crítico, um cenário e uma melhoria observável.

Convite: selecionar na sala uma tarefa de 15–30 minutos de um produto da equipe
e transformá-la no primeiro cenário na semana seguinte.

## Perguntas prováveis

**“AGENTS.md melhora qualquer agente?”** É uma affordance de contexto, não uma
garantia. Pode ajudar, ser ignorado ou até piorar se estiver longo, conflitante
ou desatualizado. Meça por cenário.

**“AX é só DX para robôs?”** Há forte sobreposição, mas AX adiciona problemas de
descoberta de ferramenta, interpretação probabilística, autonomia, delegação e
controle de efeitos. Melhorar build/test/docs beneficia ambos.

**“Uma nota 90 significa seguro?”** Não. Score composto não substitui gates de
segurança, revisão de ameaça, autorização nem observabilidade em produção.

**“Podemos comparar modelos?”** Sim, se cenário, ambiente, versão, esforço,
juiz, repetições e orçamento forem controlados. Reporte distribuição, não a
melhor execução.

**“Qual primeiro cenário?”** Escolha tarefa frequente, pequena, reversível e
com oráculo forte: corrigir bug com teste, consultar pedido sem PII, ou criar
recurso descartável em sandbox.

