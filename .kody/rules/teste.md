
---
description: Regra de tipagem - sempre torne explícitos os tipos para maior segurança e clareza
globs: []
alwaysApply: true
# @kody-sync  severity: critical
---

# Regras de Segurança de Tipagem

Evite inferência implícita de tipos e sempre declare explicitamente o tipo das variáveis, parâmetros, e valores de retorno. Isso previne erros silenciosos e aumenta a legibilidade e a robustez do código.

## Crítico: Tipos Devem Ser Explícitos

Nunca dependa apenas da inferência automática de tipos em código compartilhado ou crítico. Torne os tipos óbvios para leitores e ferramentas.

### Princípios-Chave

1. **Declare sempre tipos explicitamente** - para variáveis, propriedades, argumentos de funções e valores de retorno.
2. **Evite `var` ou `auto` sem necessidade** - só use quando o tipo é absolutamente claro a partir do contexto e a declaração seria redundante.
3. **Documente tipos complexos** - para coleções, mapas ou funções de ordem superior.

### Padrões Proibidos

**Inferência Implícita Perigosa**:
- `var usuario = buscarUsuario()` _(tipo de usuario obscuro)_
- `auto resultado = calcular();`

### Padrões Recomendados

```java
// Melhor: tipo explícito
String nome = usuario.getNome();
List<Pedido> pedidos = pedidoService.listarPedidos();
Map<String, Integer> idades = new HashMap<>();
int quantidade = calcularQuantidade();

// Funções com tipos explícitos
public Usuario buscarUsuarioPorId(Long id): Usuario { ... }
public List<Produto> listarProdutos(): List<Produto> { ... }
```

### Observações

- Em linguagens funcionalmente tipadas (ex: Typescript), também defina tipos de parâmetros e valores de retorno.
- Use generics explicitamente quando aplicável.


