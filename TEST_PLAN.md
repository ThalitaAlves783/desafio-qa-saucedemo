# Plano de Testes do Desafio SauceDemo

## Objetivo

Validar os principais fluxos E2E da aplicação SauceDemo usando Cypress, cobrindo autenticação, carrinho, checkout e ordenação de produtos. O plano usa princípios do CTFL para manter rastreabilidade entre requisitos, riscos, técnicas de teste, critério de aceite e evidência esperada.

## Processo de planejamento e execução

O planejamento e a execução foram organizados em um ciclo de melhoria contínua:

1. **Planejamento baseado no CTFL:** identificação dos requisitos, riscos, prioridades, técnicas de teste, dados de teste, critérios de entrada e critérios de saída.
2. **Implementação por meio de IA:** uso de prompts para propor a arquitetura do projeto, os testes Cypress, os Page Objects, as fixtures e a documentação inicial.
3. **Auditoria da primeira versão:** revisão manual dos resultados gerados, com correções de nomenclatura, acentuação, clareza textual, organização dos arquivos e aderência ao desafio.
4. **Auditoria adversarial com IA:** análise secundária orientada a encontrar falhas ou vulnerabilidades na solução, incluindo:
   - asserções parciais ou frágeis;
   - seletores genéricos;
   - ausência de validação de cardinalidade;
   - produtos extras no carrinho;
   - quantidades e preços não validados;
   - expectativas obtidas da própria interface;
   - finalização do checkout sem validar o overview;
   - cobertura insuficiente de cenários negativos.
5. **Correção baseada no feedback:** fortalecimento dos Page Objects, testes, fixtures, mensagens esperadas e documentação.
6. **Verificação final:** execução da suíte completa em modo headless e análise do resultado para confirmar o atendimento do objetivo principal.

Essa abordagem combina o raciocínio de teste estruturado do CTFL com o uso responsável de IA. A IA contribuiu para gerar e desafiar a solução, enquanto a análise de risco, a decisão sobre a cobertura e a aceitação do resultado foram tratadas como responsabilidades de QA.

## Base CTFL usada na estratégia

- Teste baseado em risco: priorização dos fluxos que mais impactam o usuário e o negócio, como login e conclusão de compra.
- Rastreabilidade: cada caso automatizado recebe um identificador e cobre um requisito explícito do desafio.
- Particionamento de equivalência: credenciais válidas e usuário bloqueado representam classes de entrada distintas no login.
- Teste de transição de estados: o fluxo de compra percorre estados relevantes, como catálogo, carrinho, checkout e confirmação.
- Teste de valores e ordenação: a ordenação por preço valida uma regra de apresentação comparando a lista exibida com a lista ordenada esperada.
- Critérios de conclusão: todos os cenários obrigatórios devem executar em modo headless sem falha.
- Asserções independentes: valores esperados de produtos e preços são mantidos em fixtures, sem serem derivados da interface.

## Escopo

Dentro do escopo:

- Login com usuário válido.
- Login com usuário bloqueado.
- Adição de pelo menos dois produtos ao carrinho.
- Validação dos produtos no carrinho.
- Checkout completo com dados obrigatórios.
- Validação da mensagem final de sucesso.
- Ordenação por preço do menor para o maior.

Fora do escopo neste desafio:

- Testes de performance.
- Testes de acessibilidade completos.
- Testes cross-browser extensivos.
- Validação visual pixel a pixel.
- Integração com pipeline CI, embora o projeto esteja preparado para execução headless.

## Riscos e prioridades

| Risco | Impacto | Prioridade | Cobertura |
| --- | --- | --- | --- |
| Usuário válido não consegue acessar o catálogo | Alto | Alta | CT-001 |
| Usuário bloqueado consegue acessar o sistema ou não recebe feedback | Alto | Alta | CT-002 |
| Produto selecionado não aparece no carrinho | Alto | Alta | CT-003 |
| Checkout não conclui ou mensagem final muda | Alto | Alta | CT-003 |
| Ordenação por preço apresenta itens fora da ordem | Médio | Média | CT-004 |

## Matriz de rastreabilidade

| ID | Requisito do desafio | Técnica CTFL | Automação |
| --- | --- | --- | --- |
| CT-001 | Login com sucesso usando credenciais válidas | Particionamento de equivalência | `cypress/e2e/login.cy.js` |
| CT-002 | Login inválido com `locked_out_user` | Particionamento de equivalência e teste negativo | `cypress/e2e/login.cy.js` |
| CT-003 | Fluxo de compra completo com dois produtos | Transição de estados e teste E2E | `cypress/e2e/checkout.cy.js` |
| CT-004 | Ordenação por preço Low to High | Teste de regra de negócio e ordenação | `cypress/e2e/ordenacao-produtos.cy.js` |
| CT-005 | Login com usuário inexistente | Teste negativo e particionamento de equivalência | `cypress/e2e/login.cy.js` |
| CT-006 | Login com senha inválida | Teste negativo e particionamento de equivalência | `cypress/e2e/login.cy.js` |
| CT-007 | Login sem usuário | Teste de valores limite e validação de campos obrigatórios | `cypress/e2e/login.cy.js` |
| CT-008 | Login sem senha | Teste de valores limite e validação de campos obrigatórios | `cypress/e2e/login.cy.js` |

## Dados de teste

| Dado | Origem | Uso |
| --- | --- | --- |
| `standard_user` e `secret_sauce` | Página de login do SauceDemo | Login válido |
| `locked_out_user` e `secret_sauce` | Página de login do SauceDemo | Login bloqueado |
| Catálogo completo com seis produtos e preços | Fixture local independente do DOM | Ordenação Low to High |
| `Sauce Labs Backpack` e `Sauce Labs Bike Light` com quantidade 1 | Fixture local independente do DOM | Fluxo de compra |
| Nome, sobrenome e CEP fictícios | Fixture local | Checkout |

## Estratégia de automação

O projeto usa Cypress com Page Objects para separar intenção de teste e detalhes de seletores. Os testes ficam focados no comportamento esperado, enquanto a interação com telas fica em `cypress/pages`.

Boas práticas aplicadas:

- Uso de `data-test`, que são seletores estáveis fornecidos pela aplicação.
- Fixtures para dados de usuário, cliente e produtos.
- Comandos customizados para login.
- Testes independentes, com login feito dentro do próprio cenário quando necessário.
- Validações visíveis e orientadas ao comportamento do usuário.
- Validação exata do conjunto de itens do carrinho, incluindo quantidade, nome, preço e cardinalidade.
- Validação exata do resumo do pedido, incluindo produtos, subtotal, imposto e total.
- Confirmação do filtro selecionado por meio do valor `lohi`.
- Rejeição de preços não numéricos ou não finitos durante a coleta.

## Critérios de entrada

- Node.js instalado.
- Dependências instaladas com `npm install`.
- A aplicação SauceDemo disponível em `https://www.saucedemo.com/`.
- Acesso à internet para execução dos testes E2E.

## Critérios de saída

- Todos os testes obrigatórios executam com sucesso em modo headless.
- Os testes negativos de login também executam com sucesso.
- O README explica instalação, arquitetura e comandos.
- O histórico de prompts está documentado em `PROMPTS.md`.
- Evidências de falhas ficam em screenshots e vídeos gerados pelo Cypress.
- O objetivo principal do desafio é atendido: os fluxos obrigatórios estão automatizados, documentados e validados.

## Evidências esperadas

- Saída do comando `npm run cy:run`.
- Screenshots automáticas em `cypress/screenshots` quando houver falha.
- Vídeos em `cypress/videos` quando configurados e gerados na execução headless.
- Resultado final registrado durante o desenvolvimento: 8 testes executados, 8 aprovados e 0 falhas.
