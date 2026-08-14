# Curso DIO Spread Fullstack 

## Módulo III: Desafio de projeto
### Aprenda a Criar um Sistema de Estacionamento Usando TypeScript

Você já se perguntou porque o Typescript está cada vez mais sendo utilizado entre os desenvolvedores? De que forma a tipagem de código pode tornar o desenvolvimento mais produtivo? Na aula de hoje vamos desenvolver um sistema básico de estacionamento em Typescript. Ao final dela você irá compreender o quão simples e poderoso é esse magnifico superset. CUIDADO, o uso excessivo de Typescript gera dependência e você pode NUNCA MAIS querer criar um projeto sem usar ele. Assista por sua conta e risco :)

💻 Full-stack: Intermediário

- TypeScript
- Git

---
## Sistema de Gestão de Estacionamento (Parking App)

Projeto prático desenvolvido durante a jornada no bootcamp Fullstack, focado na aplicação de **TypeScript**.

Esta aplicação opera inteiramente no *client-side*, garantindo reatividade imediata e armazenamento dos dados no próprio navegador (`localStorage`).

---

## Especificação de Requisitos

### 1. Formulário de Entrada
- **Campo 1 (Nome/Modelo do Veículo):** Entrada de texto para identificação do automóvel (ex: *Fusca Azul*, *Civic Preto*).
- **Campo 2 (Placa do Veículo):** Entrada de texto para identificação única da placa (ex: *ABC-1234* ou *ABC1D23*).
- **Ação (Botão Enviar/Registrar):** Gatilho que valida e submete os dados digitados para o sistema.

### 2. Regras Automáticas de Negócio
- **Horário de Entrada Automático:** No momento exato em que o usuário clica em "Registrar", o sistema captura a data e hora atual do sistema.
- **Persistência Local (localStorage):** Todos os registros gravados são salvos no armazenamento local do navegador. Ao atualizar a página (`F5`) ou fechar o navegador, os dados permanecem preservados.

### 3. Tabela de Visualização e Controle
- Exibição organizada em formato tabular contendo:
  - Nome / Modelo do Veículo
  - Placa
  - Horário de Entrada
  - **Ações:** Botão para remover (*Deletar/Saída*) o veículo do pátio.

---

## Modelo Mental & Arquitetura de Negócio

Antes da implementação em sintaxe de código, o fluxo da aplicação segue o seguinte modelo conceitual de funcionamento:

```text
  [ ENTRADA DO PÁTIO ]
  ┌─────────────────────────────────────────┐
  │ Nome do Veículo: [ Fusca Azul ]         │
  │ Placa do Veículo: [ ABC-1234 ]          │
  │ [ Registrar Veículo ]                   │
  └────────────────────┬────────────────────┘
                       │
                       ▼ (Processamento no Clique)
  ┌────────────────────────────────────────────────────────┐
  1. Captura o horário atual (ex: 14:30:00)                │
  2. Empacota a ficha: { Nome, Placa, Entrada }            │
  3. Adiciona a ficha na lista geral em memória            │
  4. Sincroniza e grava a lista atualizada no localStorage │
  5. Limpa os campos do formulário para o próximo registro │
  └────────────────────┬───────────────────────────────────┘
                       │
                       ▼ (Reatividade na Tela)
  [ TABELA DE VEÍCULOS ESTACIONADOS ]
  ┌──────────────┬───────────┬──────────────────┬───────────┐
  │ Veículo      │ Placa     │ Horário Entrada  │ Ações     │
  ├──────────────┼───────────┼──────────────────┼───────────┤
  │ Fusca Azul   │ ABC-1234  │ 14:30            │ [Deletar] │
  └──────────────┴───────────┴──────────────────┴───────────┘
  ```