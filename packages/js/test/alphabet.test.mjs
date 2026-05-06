import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(packageRoot, "../..");
const alphabets = JSON.parse(
  await readFile(path.join(repoRoot, "data", "alphabets.json"), "utf8"),
);

test("subpath exports expose default alphabet, alphabet and base", async () => {
  for (const [id, definition] of Object.entries(alphabets)) {
    const module = await import(`@splicemood/alphabet/${id}`);
    const chars = Array.from(definition.alphabet);

    assert.equal(module.default, definition.alphabet);
    assert.equal(module.alphabet, definition.alphabet);
    assert.equal(module[definition.exportName], definition.alphabet);
    assert.equal(module.base, chars.length);
    assert.equal(new Set(chars).size, chars.length);
  }
});

test("root export exposes named alphabets only", async () => {
  const root = await import("@splicemood/alphabet");

  for (const definition of Object.values(alphabets)) {
    assert.equal(root[definition.exportName], definition.alphabet);
  }

  assert.equal("default" in root, false);
  assert.equal("alphabet" in root, false);
});
