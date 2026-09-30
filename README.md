# Desafio Técnico Analista de QA SauceDemo

Projeto de automação de testes E2E desenvolvido para o desafio técnico de Analista de QA.

A solução foi construída com base em planejamento orientado pelo CTFL, priorização por risco, implementação assistida por IA e auditoria adversarial da suíte de testes.

![Cypress](https://img.shields.io/badge/Cypress-13.x-17202C?logo=cypress)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript)
![Testes E2E](https://img.shields.io/badge/Testes-E2E-2EA44F)
![Status](https://img.shields.io/badge/Status-Concluído-2EA44F)

## Objetivo

Cobrir os cenários obrigatórios do desafio técnico com uma suíte simples, rastreável e fácil de manter. A estratégia foi organizada com apoio de conceitos CTFL, principalmente teste baseado em risco, particionamento de equivalência, rastreabilidade e teste de transição de estados.

## Aplicação testada

- URL: <https://www.saucedemo.com/>
- Usuário válido: `standard_user`
- Usuário bloqueado: `locked_out_user`
- Senha: `secret_sauce`

## Pré-requisitos

- Node.js 18 ou superior.
- NPM.
- Acesso à internet para executar os testes contra o SauceDemo.

## Instalação

```bash
npm install
```

## Execução dos testes

Executar em modo headless:

```bash
npm run cy:run
```

Executar com interface gráfica do Cypress:

```bash
npm run cy:open
```

Executar usando o script padrão de teste:

```bash
npm test
```

## Cenários cobertos

| ID | Cenário | Arquivo |
| --- | --- | --- |
| CT-001 | Login com credenciais válidas | `cypress/e2e/login.cy.js` |
| CT-002 | Login com usuário bloqueado | `cypress/e2e/login.cy.js` |
| CT-003 | Fluxo completo de compra com dois produtos | `cypress/e2e/checkout.cy.js` |
| CT-004 | Ordenação de produtos por preço Low to High | `cypress/e2e/ordenacao-produtos.cy.js` |
| CT-005 | Login com usuário inexistente | `cypress/e2e/login.cy.js` |
| CT-006 | Login com senha inválida | `cypress/e2e/login.cy.js` |
| CT-007 | Login sem preencher o usuário | `cypress/e2e/login.cy.js` |
| CT-008 | Login sem preencher a senha | `cypress/e2e/login.cy.js` |

## Arquitetura escolhida

```text
cypress/
  e2e/          # Especificações dos testes automatizados
  fixtures/     # Dados de teste
  pages/        # Page Objects com interações de tela
  support/      # Comandos customizados e configuração global
```

A suíte usa Page Objects para reduzir duplicação e deixar os testes mais legíveis. Os arquivos em `cypress/e2e` descrevem os comportamentos esperados, enquanto os arquivos em `cypress/pages` concentram seletores e ações da interface.

## Estratégia de testes

O planejamento completo está em `TEST_PLAN.md`. Em resumo:

- Priorização por risco dos fluxos mais importantes.
- Rastreabilidade entre requisito, caso de teste e arquivo automatizado.
- Uso de teste positivo e negativo para login.
- Validação de estado no fluxo de compra, do catálogo até a confirmação.
- Validação da ordenação por preço comparando os valores exibidos com uma lista ordenada.
- Validação da quantidade, nome, preço e ausência de itens extras no carrinho.
- Validação do subtotal, imposto e total antes da finalização da compra.
- Validação de mensagens exatas para cenários negativos de login.

## Processo de trabalho

O projeto foi desenvolvido seguindo um ciclo de planejamento, implementação, auditoria e validação:

1. **Planejamento baseado no CTFL:** os requisitos foram transformados em cenários, riscos, prioridades, técnicas de teste e uma matriz de rastreabilidade.
2. **Implementação assistida por IA:** a IA foi utilizada para apoiar a criação da estrutura Cypress, Page Objects, fixtures, comandos customizados e primeiros testes.
3. **Auditoria dos primeiros resultados:** a estrutura gerada foi revisada, com ajustes de nomenclatura, correções de texto, melhoria da organização e conferência da cobertura dos requisitos.
4. **Auditoria adversarial com IA:** uma segunda revisão foi conduzida com foco em encontrar vulnerabilidades na estratégia e na implementação, como asserções fracas, seletores genéricos, expectativas derivadas do DOM, ausência de validação de cardinalidade e dependências entre testes.
5. **Correções orientadas pelo feedback:** os pontos identificados foram corrigidos no código, nas fixtures e na documentação.
6. **Nova verificação:** a suíte foi executada novamente em modo headless para confirmar que as correções não introduziram regressões e que o objetivo principal foi alcançado.

O histórico dos prompts e a finalidade de cada etapa estão documentados em `PROMPTS.md`. A IA foi utilizada como apoio à implementação e também como mecanismo de revisão crítica; as decisões finais, a análise dos riscos e a validação dos resultados fizeram parte do trabalho de QA.

## Boas práticas aplicadas

- Seletores baseados em `data-test`, mais estáveis para automação.
- Testes independentes.
- Dados de teste em fixtures.
- Comando customizado para login.
- Assertions focadas em comportamento observável.
- Captura automática de screenshots em falhas.

## Uso de Inteligência Artificial

O uso de IA foi registrado em `PROMPTS.md`, conforme solicitado no desafio. A estratégia combinou geração assistida, revisão inicial e uma auditoria adversarial independente da primeira versão. Os resultados gerados foram analisados, ajustados e validados por meio da execução da suíte.

## Evidências

Ao executar `npm run cy:run`, o Cypress apresenta o resultado no terminal. Em caso de falha, as evidências podem ser consultadas nas pastas:

- `cypress/screenshots`
- `cypress/videos`

Na validação final realizada durante o desenvolvimento, `npm test` executou 8 testes, com 8 aprovações e 0 falhas.
