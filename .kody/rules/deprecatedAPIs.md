---
title: "Evitar APIs banidas do catálogo"
scope: "file"            # "file" or "pull_request"
path: []                 # list of globs. example: ["**/*.ts", "apps/web/**"]
severity_min: "critical"     # "low", "medium", "high", "critical"
languages: []            # optional. ex: ["jsts", "go", "php", "ruby", "java", "csharp", "dart", "kotlin", "rust"]
buckets: []              # optional. ex: ["style-conventions", "error-handling", "security"]
uuid: ""                 # optional. use for stable rule ID
enabled: true            # optional
---

## Instructions
Não usar APIs listadas em catalogs/deprecated_apis.json. Para qualquer ocorrência, explique por que é banida e proponha alternativa do campo 'fix'.