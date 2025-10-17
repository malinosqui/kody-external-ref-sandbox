
---
description: Evite comentários desatualizados ou enganosos no código
globs: []
alwaysApply: true
# @kody-sync  severity: high
---

# Regras para Comentários de Código

Mantenha os comentários sempre atualizados e relevantes ao comportamento real do código. Comentários desatualizados ou enganosos causam confusão, erros e reduzem a confiabilidade da base de código.

## Crítico: Nunca deixe comentários desatualizados

Remova ou atualize comentários imediatamente após refatorações e mudanças funcionais. Comentários incorretos são piores do que código sem comentário algum.

### Princípios-Chave

1. **Comente o porquê, não apenas o quê** — Os melhores comentários explicam a intenção e decisões não óbvias.
2. **Remova código comentado** — Versionamento já preserva histórico; não deixe "lixo" no source.
3. **Evite redundância do óbvio** — Comentários repetitivos dificultam manutenção.

### Padrões Proibidos

**Comentários desatualizados:**
- Comentando comportamentos que o código já não possui
- Bugs ou TODOs que já foram resolvidos

**Código morto comentado:**
```java
// int contador = 0; // Código antigo, não utilizado
```

### Padrões Recomendados

```java
// Bom comentário: explica decisão arquitetural
// Utilizamos Double Checked Locking por questões de performance:
// https://shipilev.net/blog/2014/safe-public-construction/
private volatile Instancia instancia;

// Explique contexto e exceções
// Permitimos null neste campo pois integração X pode não retorná-lo
private String complementoEndereco;
```

### Observações

- Faça revisão e limpeza de comentários frequentemente.
- Ferramentas como linters podem ser configuradas para exigir remoção de código morto ou comentários obsoletos.
