# Histórico de Prompts

Este arquivo documenta os principais prompts utilizados no desenvolvimento do projeto e mostra como a Inteligência Artificial foi incorporada ao processo de QA.

A IA foi usada em duas frentes:

- **Implementação assistida:** apoio na criação da estrutura, dos testes e da documentação.
- **Auditoria adversarial:** revisão secundária com o objetivo de questionar a primeira solução, identificar vulnerabilidades e sugerir cenários ou asserções ausentes.

A utilização da IA não substituiu o raciocínio de QA. O planejamento baseado no CTFL, a avaliação de riscos, a decisão sobre a cobertura, a revisão dos resultados e a validação final foram responsabilidades do processo de teste.

## Estratégia utilizada

O trabalho seguiu este ciclo:

1. Planejamento baseado no CTFL.
2. Implementação assistida por IA.
3. Auditoria dos primeiros resultados.
4. Auditoria adversarial da estrutura dos testes.
5. Correção dos pontos identificados.
6. Nova execução e verificação do objetivo principal.

## Prompt 1 Planejamento baseado no CTFL

> Tenho um desafio técnico de QA para automatizar cenários E2E no SauceDemo com Cypress. Quero usar fundamentos do CTFL para planejar os testes. Ajude a transformar os requisitos obrigatórios em uma matriz de rastreabilidade com risco, prioridade, técnica de teste e critério de aceite.

Objetivo:

- Organizar os requisitos do desafio.
- Identificar os riscos principais.
- Definir prioridades de teste.
- Relacionar cada requisito a um caso de teste.
- Usar técnicas como teste baseado em risco, particionamento de equivalência e transição de estados.

## Prompt 2 Arquitetura inicial

> Crie uma sugestão de arquitetura Cypress para um projeto pequeno de desafio técnico, cobrindo login, checkout e ordenação de produtos. Prefira uma estrutura simples.

Objetivo:

- Definir a estrutura de diretórios.
- Separar especificações, dados de teste e interações de tela.
- Criar uma base simples e manutenível.

## Prompt 3 Implementação dos cenários

> Gere testes Cypress para o SauceDemo cobrindo: login válido, login com usuário bloqueado, compra completa com dois produtos e ordenação por preço Low to High. Use seletores `data-test` quando existirem e escreva asserções claras.

Objetivo:

- Criar uma primeira versão executável dos testes.
- Cobrir os cenários obrigatórios do desafio.
- Usar Page Objects, fixtures e comandos customizados.

## Prompt 4 Auditoria da primeira versão

> Revise os testes Cypress gerados como um QA sênior. Procure problemas de nomenclatura, textos sem acentuação, fragilidade de seletores, dependência entre testes, dados duplicados, asserções fracas e oportunidades de melhoria na organização do projeto.

Objetivo:

- Corrigir nomenclaturas pouco claras.
- Melhorar a documentação em português.
- Identificar seletores frágeis.
- Verificar se os testes eram independentes.
- Conferir a coerência entre README, plano de testes e código.

## Prompt 5 Auditoria adversarial

> Faça uma segunda auditoria adversarial desta estrutura de testes Cypress. Tente encontrar pontos de vulnerabilidade que poderiam permitir que um teste passasse mesmo com um defeito real. Verifique especificamente: cardinalidade de itens, produtos extras, nomes e preços, quantidade individual, contador do carrinho, resumo financeiro, subtotal, imposto, total, confirmação do filtro `lohi`, validação de todos os produtos, preços inválidos, seletores genéricos, mensagens parciais, URL incorreta, finalização sem validar o overview e ausência de testes negativos de login. Liste os ajustes necessários por prioridade e indique os arquivos afetados.

Objetivo:

- Questionar a suficiência das asserções existentes.
- Encontrar falsos positivos possíveis.
- Identificar gaps de cobertura.
- Avaliar se as expectativas eram independentes do DOM.
- Levantar vulnerabilidades de manutenção e seleção de elementos.

## Prompt 6 Correções orientadas pelo feedback

> Aplique as correções identificadas na auditoria adversarial. Fortaleça os Page Objects e os testes sem criar dependências entre cenários. Mantenha as expectativas de produtos e preços em fixtures independentes da interface. Valide o carrinho completo, o resumo financeiro antes da finalização, o valor do filtro de ordenação e cenários negativos de login.

Objetivo:

- Corrigir os pontos encontrados pela auditoria.
- Evitar expectativas derivadas dos mesmos valores coletados da interface.
- Melhorar a precisão das asserções.
- Preservar a legibilidade e a manutenibilidade do projeto.

## Prompt 7 Verificação final

> Execute uma revisão final do projeto de automação Cypress. Confirme se os requisitos obrigatórios do desafio estão cobertos, se os testes são independentes, se a documentação explica a estratégia de QA e o uso de IA e se a suíte pode ser validada em modo headless. Liste pendências reais e o critério de aceite final.

Objetivo:

- Confirmar a cobertura dos requisitos.
- Verificar a consistência entre código e documentação.
- Avaliar se o objetivo principal foi atendido.
- Registrar o resultado da execução final.

## Resultado da estratégia

Após as correções e a nova verificação, a suíte final executou:

```text
8 testes
8 aprovados
0 falhas
```

Esse resultado foi usado como evidência de que os cenários obrigatórios estavam automatizados e que as principais vulnerabilidades identificadas durante as auditorias haviam sido tratadas.
