# Kody External Reference Sandbox

Repositório mínimo para testar **Kody Rules com referência a arquivo externo**.

## O que tem aqui
- **Regra em linguagem natural** em `.kody/rules.json`.
- **Mapa de referências** em `.kody/references.json` (qual arquivo do repo deve ir junto no prompt).
- **Script local** (`scripts/build-prompt.js`) que simula a etapa “montar prompt”:
  - Lê as rules.
  - Carrega o arquivo referenciado.
  - (Opcional) Extrai apenas a seção demarcada por *anchors* `KODY-BEGIN:` / `KODY-END:`.
  - Gera `.kody/built_prompts.json` com o prompt já montado.

## Como usar
1. **Instale Node 18+**.
2. No diretório do projeto, rode:
   ```bash
   npm run build:prompt
   ```
   Isso cria `.kody/built_prompts.json`. Abra e confira se a referência foi embutida no prompt como esperado.

3. **Para testar na prática** com seu agente/infra atual (ex.: via PR e `@kody start-review`):
   - Abra um PR que mexa em `src/java/com/example/Proposta.java`.
   - O Kody deve buscar `domain/LoanType.java` (de acordo com a referência) e usar no contexto da rule.
   - Faça também um PR mexendo em `controllers/PropostaController.java` para exercitar a rule que usa `openapi/api.yaml`.

## Cenários de teste (rápidos)
- **Quebrar → Consertar (enum)**: em `Proposta.java`, defina `tipo = "SPACE_LOAN"` → Kody deveria reclamar. Depois adicione `SPACE_LOAN` no enum `LoanType` e o alerta deve sumir.
- **Quebrar → Consertar (OpenAPI)**: mude o controller para retornar `418` em `create()` → não está no spec; volte para `201`.
- **CODEOWNERS**: crie `src/security/Auth.java` sem dono em `CODEOWNERS` → Kody deve exigir `@sec-team`.

## Estrutura
```
.kody/
  config.yaml
  rules.json
  references.json
scripts/
  build-prompt.js
domain/
  LoanType.java
catalogs/
  statuses.json
openapi/
  api.yaml
controllers/
  PropostaController.java
src/java/com/example/
  Proposta.java
CODEOWNERS
package.json
.gitignore
```

## Notas de implementação
- O arquivo `.kody/references.json` é um **artefato de teste** para este sandbox. Na sua plataforma final, você provavelmente vai embutir esse “link” direto na rule (ex.: `references: [{type: "file", path: "...", anchor: "..."}]`) ou salvar em tabela própria.
- Anchors:
  - Em **Java**: `// KODY-BEGIN:<nome>` … `// KODY-END:<nome>`
  - Em **YAML**: `# KODY-BEGIN:<nome>` … `# KODY-END:<nome>`
