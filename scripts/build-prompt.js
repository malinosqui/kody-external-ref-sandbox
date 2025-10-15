// Simple local harness to simulate "compose prompt with external reference"
// Usage: node scripts/build-prompt.js
const fs = require("fs");
const path = require("path");

const RULES_PATH = path.join(".kody", "rules.json");
const REFS_PATH = path.join(".kody", "references.json");
const CONFIG_PATH = path.join(".kody", "config.yaml"); // not parsed here, just kept for reference
const OUT_PATH = path.join(".kody", "built_prompts.json");

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function extractByAnchor(content, anchorName) {
  if (!anchorName) return content;
  const startMarker = /KODY-BEGIN:([A-Za-z0-9_\-]+)/;
  const endMarker = /KODY-END:([A-Za-z0-9_\-]+)/;
  const lines = content.split(/\r?\n/);

  let capturing = false;
  let acc = [];
  for (const line of lines) {
    const startMatch = line.match(startMarker);
    const endMatch = line.match(endMarker);
    if (startMatch && startMatch[1] === anchorName) {
      capturing = true;
      continue;
    }
    if (endMatch && endMatch[1] === anchorName) {
      capturing = false;
      break;
    }
    if (capturing) acc.push(line);
  }
  return acc.length ? acc.join("\n") : content; // if not found, fallback to full file
}

function truncateBytes(str, maxBytes = 60000) {
  const buf = Buffer.from(str, "utf8");
  if (buf.length <= maxBytes) return str;
  return buf.subarray(0, maxBytes).toString("utf8") + "\n/* ...[truncated]... */";
}

function main() {
  const rules = JSON.parse(read(RULES_PATH));
  const refs = JSON.parse(read(REFS_PATH));

  const out = rules.map((rule) => {
    const ref = refs[rule.title];
    let referenceContent = "";
    if (ref && ref.file) {
      try {
        const raw = read(ref.file);
        const section = extractByAnchor(raw, ref.anchor);
        referenceContent = truncateBytes(section);
      } catch (e) {
        referenceContent = `/* Error reading reference file: ${e.message} */`;
      }
    }

    const composedPrompt = [
      "You are Kody. Enforce the following rule against the target code.",
      "",
      `Rule: ${rule.rule}`,
      `Severity: ${rule.severity}`,
      `Target path: ${rule.path}`,
      "",
      ref && ref.file ? `Reference (${ref.file}${ref.anchor ? `#${ref.anchor}` : ""}):` : "Reference: (none)",
      "```",
      referenceContent,
      "```",
      "",
      "If the target violates the rule, explain why and suggest a fix.",
    ].join("\n");

    return {
      title: rule.title,
      ruleText: rule.rule,
      targetPath: rule.path,
      reference: {
        path: ref ? ref.file : null,
        anchor: ref ? ref.anchor || null : null,
        contentPreview: referenceContent.slice(0, 800)
      },
      composedPrompt
    };
  });

  fs.writeFileSync(OUT_PATH, JSON.stringify(out, null, 2), "utf8");
  console.log(`Wrote ${OUT_PATH} with ${out.length} prompt(s).`);
}

main();
