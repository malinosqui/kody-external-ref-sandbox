---
title: "Controllers listados na openapi"
scope: "file"            # "file" or "pull_request"
path: []                 # list of globs. example: ["**/*.ts", "apps/web/**"]
severity_min: "critical"     # "low", "medium", "high", "critical"
languages: []            # optional. ex: ["jsts", "go", "php", "ruby", "java", "csharp", "dart", "kotlin", "rust"]
buckets: []              # optional. ex: ["style-conventions", "error-handling", "security"]
uuid: ""                 # optional. use for stable rule ID
enabled: true            # optional
---

## Instructions
Os controllers devem retornar apenas códigos listados no OpenAPI (openapi/api.yaml) para o endpoint correspondente.