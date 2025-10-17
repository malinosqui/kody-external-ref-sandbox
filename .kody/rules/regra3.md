---
description: Não permitir funções ou métodos com nomes genéricos e pouco descritivos
globs: []
alwaysApply: true
# @kody-sync  severity: high
---

# Nomeação Clara para Funções e Métodos

Sempre nomeie funções e métodos de forma clara e descritiva quanto à sua finalidade. Nomes genéricos (ex: `doWork()`, `handle()`, `process()`, `data()`) dificultam a leitura, manutenção e revisão do código.

## Critérios

- Evite nomes vagos para funções, métodos e variáveis.
- O nome da função deve indicar *explicitamente* o que ela faz, seu domínio de atuação ou efeito colateral principal.
- Prefira nomes compostos (“action-target”): ex: `buscarUsuarioPorEmail()`, `enviarEmailDeVerificacao()`, `atualizarEstoqueProduto()`

## Exemplos de Más Práticas

```java
void execute() { ... }
void process() { ... }
String getData() { ... }
```

## Exemplos de Boas Práticas

```java
void salvarRelatorioMensal() { ... }
void atualizarStatusPedido() { ... }
Usuario buscarUsuarioPorId(Long id) { ... }
```

## Observações

- Esteja atento especialmente a handlers de eventos, métodos auxiliares e nomes herdados de geradores automáticos.
- Se o domínio da função ficar extenso, prefira dividir em funções menores com nomes ainda mais precisos.

