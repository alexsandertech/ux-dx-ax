# Fontes e notas de confiança

Consultadas em 7 de setembro de 2026. A apresentação prioriza normas, artigos
revisados por pares, documentação oficial e o código do projeto demonstrado.

## UX e design centrado em humanos

1. **ISO 9241-210:2019 — Human-centred design for interactive systems.**
   Requisitos e recomendações para atividades de design centrado em humanos ao
   longo do ciclo de vida. A norma foi confirmada em 2025.
   <https://www.iso.org/standard/77520.html>

2. **ISO 9241-11:2018 — Usability: Definitions and concepts.** Referência para
   efetividade, eficiência e satisfação em um contexto de uso especificado.
   <https://www.iso.org/standard/63500.html>

## DX e desempenho de desenvolvimento

3. **Forsgren et al. (2021), “The SPACE of Developer Productivity”. ACM Queue / Microsoft Research.**
   Demonstra por que produtividade do desenvolvedor não pode ser reduzida a uma
   métrica e propõe cinco dimensões: satisfação/bem-estar, desempenho,
   atividade, comunicação/colaboração e eficiência/fluxo.
   <https://www.microsoft.com/en-us/research/publication/the-space-of-developer-productivity-theres-more-to-it-than-you-think/>

4. **DORA, State of AI-assisted Software Development 2025.** Pesquisa do Google
   Cloud: IA funciona como amplificador das forças e fraquezas do sistema
   organizacional; resultados dependem das capacidades subjacentes.
   <https://dora.dev/research/2025/dora-report/>

## AX e avaliação prática

5. **Agent Experience — comunidade AX.** Definição pública de AX como a
   experiência holística de agentes ao acessar, compreender e operar ambientes
   digitais para alcançar objetivos definidos pelo usuário. AX ainda é um campo
   emergente, não uma norma internacional consolidada.
   <https://agentexperience.ax/>

6. **Netlify, Agent Experience.** Apresenta AX, sua relação com DX e a motivação
   para avaliar descoberta, uso confiável e recuperação de falhas.
   <https://www.netlify.com/agent-experience/>

7. **AXIS — Agent Experience Index Score.** Documentação oficial do framework
   open source usado no laboratório: resultado composto, cenários, relatórios e
   baselines.
   <https://axis.run/>

8. **AXIS Scoring Framework.** Fórmula e sinais: Goal Achievement 40%,
   Environment 20%, Service 20% e Agent 20% por padrão; separa qualidade de
   execução de qualidade de decisão.
   <https://axis.run/scoring/>

9. **netlify/axis no GitHub.** Código-fonte MIT, configuração, cenários e testes.
   O laboratório fixa o clone no commit
   `71fb75838c5873bf27f9b97e3240baa19b0b16b8`.
   <https://github.com/netlify/axis>

## Contexto, interoperabilidade e segurança

10. **AGENTS.md — formato aberto.** Local previsível para instruções de agentes
    de desenvolvimento; recomenda comandos, convenções, estrutura e arquivos
    aninhados por escopo.
    <https://agents.md/>

11. **Linux Foundation, formação da Agentic AI Foundation.** Fonte institucional
    sobre governança aberta de AGENTS.md, MCP e goose.
    <https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation>

12. **Model Context Protocol — especificação oficial.** Distingue recursos,
    prompts e ferramentas controladas pelo modelo; útil para projetar superfícies
    legíveis e acionáveis por agentes.
    <https://modelcontextprotocol.io/specification/2025-06-18/server/index>

13. **NIST AI Risk Management Framework 1.0 e perfil de GenAI.** Estrutura
    voluntária para governar, mapear, medir e gerenciar riscos e confiança em
    sistemas de IA.
    <https://www.nist.gov/itl/ai-risk-management-framework>

14. **OWASP Top 10 for Agentic Applications 2026.** Referência revisada pela
    comunidade para riscos de sistemas autônomos, usada no checklist de
    privilégio mínimo, isolamento, observabilidade e controle humano.
    <https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/>

## Limitações metodológicas citadas nos slides

- AX é usado aqui como **Agent Experience**; em outros setores pode significar
  “employee/agent experience” de atendentes humanos.
- O AXIS é uma implementação recente. Seus pesos são defaults configuráveis,
  não uma verdade científica universal.
- Juiz por LLM pode errar e deve ser calibrado com revisão humana e oráculos
  determinísticos.
- O pré-flight deste pacote é uma heurística autoral, transparente e local. Ele
  mede sinais de prontidão estrutural, não desempenho do agente.
- Comparações exigem repetição, controle de versão/configuração e análise de
  dispersão. Uma demo ao vivo é evidência ilustrativa, não benchmark.

