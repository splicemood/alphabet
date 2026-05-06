import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  codePoints,
  loadAlphabets,
  repoRoot,
  validateAlphabets,
  validateGeneratedOutputs,
  type AlphabetDefinition,
  type AlphabetMap,
} from "./validate.ts";

const generatedNotice = "AUTO-GENERATED FILE. DO NOT EDIT.";
const jsHeader = `// ${generatedNotice}\n\n`;
const pythonHeader = `# ${generatedNotice}\n\n`;
const goHeader = `// ${generatedNotice}\n\n`;

type AlphabetEntry = [string, AlphabetDefinition];

function orderedEntries(alphabets: AlphabetMap): AlphabetEntry[] {
  return Object.entries(alphabets);
}

function jsonString(value: string): string {
  return JSON.stringify(value);
}

function preview(alphabet: string): string {
  const chars = codePoints(alphabet);
  if (chars.length <= 24) {
    return alphabet;
  }
  return `${chars.slice(0, 14).join("")}…${chars.slice(-8).join("")}`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function replaceGeneratedBlock(content: string, start: string, end: string, replacement: string): string {
  const startIndex = content.indexOf(start);
  const endIndex = content.indexOf(end);

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    throw new Error(`Missing generated block markers ${start} / ${end}`);
  }

  return `${content.slice(0, startIndex + start.length)}\n${replacement}\n${content.slice(endIndex)}`;
}

async function writeGeneratedFile(filePath: string, content: string): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, content, "utf8");
}

async function removeGeneratedFiles(directory: string, extension: string): Promise<void> {
  let files: string[];
  try {
    files = await readdir(directory);
  } catch {
    return;
  }

  for (const fileName of files) {
    if (!fileName.endsWith(extension)) {
      continue;
    }

    const filePath = path.join(directory, fileName);
    const content = await readFile(filePath, "utf8");
    if (content.includes(generatedNotice)) {
      await rm(filePath);
    }
  }
}

function createJsModule(id: string, definition: AlphabetDefinition): string {
  const base = codePoints(definition.alphabet).length;
  return `${jsHeader}export const ${definition.exportName} =\n  ${jsonString(definition.alphabet)};\n\nexport const alphabet = ${definition.exportName};\nexport const base = ${base};\n\nexport default ${definition.exportName};\n`;
}

function createJsIndex(entries: AlphabetEntry[]): string {
  const exports = entries
    .map(([id, definition]) => `export { ${definition.exportName} } from "./${id}.js";`)
    .join("\n");
  return `${jsHeader}${exports}\n`;
}

function createPythonModule(definition: AlphabetDefinition): string {
  const base = codePoints(definition.alphabet).length;
  return `${pythonHeader}alphabet = ${jsonString(definition.alphabet)}\nbase = ${base}\n`;
}

function createPythonInit(entries: AlphabetEntry[], version: string): string {
  const modules = entries.map(([, definition]) => definition.pythonModule);
  const all = ["__version__", ...modules].map((name) => jsonString(name)).join(", ");
  return `${pythonHeader}__version__ = ${jsonString(version)}\n__all__ = [${all}]\n`;
}

function createGoModule(definition: AlphabetDefinition): string {
  const base = codePoints(definition.alphabet).length;
  return `${goHeader}package ${definition.packageName}\n\nconst Alphabet = ${jsonString(definition.alphabet)}\nconst Base = ${base}\n`;
}

function createGoTest(definition: AlphabetDefinition): string {
  return `${goHeader}package ${definition.packageName}\n\nimport "testing"\n\nfunc TestAlphabetBase(t *testing.T) {\n\trunes := []rune(Alphabet)\n\tif len(runes) != Base {\n\t\tt.Fatalf("len([]rune(Alphabet)) = %d, want %d", len(runes), Base)\n\t}\n}\n\nfunc TestAlphabetUnique(t *testing.T) {\n\tseen := make(map[rune]bool, Base)\n\tfor _, value := range Alphabet {\n\t\tif seen[value] {\n\t\t\tt.Fatalf("duplicate rune %q", value)\n\t\t}\n\t\tseen[value] = true\n\t}\n}\n`;
}

function jsExports(entries: AlphabetEntry[]): Record<string, Record<string, string>> {
  const exportsMap: Record<string, Record<string, string>> = {
    ".": {
      types: "./dist/index.d.ts",
      import: "./dist/index.js",
      default: "./dist/index.js",
    },
  };

  for (const [id] of entries) {
    exportsMap[`./${id}`] = {
      types: `./dist/${id}.d.ts`,
      import: `./dist/${id}.js`,
      default: `./dist/${id}.js`,
    };
  }

  return exportsMap;
}

function readmeTable(entries: AlphabetEntry[]): string {
  const rows = entries.map(([id, definition]) => {
    const base = codePoints(definition.alphabet).length;
    return `| \`${id}\` | ${definition.name} | ${base} | \`${preview(definition.alphabet)}\` | \`@splicemood/alphabet/${id}\` | \`splicemood_alphabet.${definition.pythonModule}\` | \`github.com/splicemood/alphabet/${definition.packageName}\` |`;
  });

  return [
    "| id | description | base | characters preview | JS import | Python module | Go import |",
    "| --- | --- | ---: | --- | --- | --- | --- |",
    ...rows,
  ].join("\n");
}

function landingRows(entries: AlphabetEntry[]): string {
  return entries
    .map(([id, definition]) => {
      const base = codePoints(definition.alphabet).length;
      const jsImport = `import alphabet from "@splicemood/alphabet/${id}";`;
      const pythonImport = `from splicemood_alphabet.${definition.pythonModule} import alphabet`;
      const goImport = `import "github.com/splicemood/alphabet/${definition.packageName}"`;

      return [
        "          <tr>",
        `            <td><code>${escapeHtml(id)}</code></td>`,
        `            <td>${escapeHtml(definition.name)}</td>`,
        `            <td>${base}</td>`,
        `            <td><code>${escapeHtml(preview(definition.alphabet))}</code></td>`,
        "            <td>",
        `              <button class="copy-link" type="button" data-copy="${escapeHtml(jsImport)}">JS</button>`,
        `              <button class="copy-link" type="button" data-copy="${escapeHtml(pythonImport)}">Python</button>`,
        `              <button class="copy-link" type="button" data-copy="${escapeHtml(goImport)}">Go</button>`,
        "            </td>",
        "          </tr>",
      ].join("\n");
    })
    .join("\n");
}

async function syncJsPackage(entries: AlphabetEntry[], version: string): Promise<void> {
  const packagePath = path.join(repoRoot, "packages", "js", "package.json");
  const packageJson = JSON.parse(await readFile(packagePath, "utf8")) as Record<string, unknown>;
  packageJson.version = version;
  packageJson.exports = jsExports(entries);
  await writeFile(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`, "utf8");
}

async function syncPythonVersion(version: string): Promise<void> {
  const pyprojectPath = path.join(repoRoot, "packages", "python", "pyproject.toml");
  const content = await readFile(pyprojectPath, "utf8");
  await writeFile(pyprojectPath, content.replace(/^version = ".+"$/m, `version = "${version}"`), "utf8");
}

async function syncReadme(entries: AlphabetEntry[]): Promise<void> {
  const readmePath = path.join(repoRoot, "README.md");
  const content = await readFile(readmePath, "utf8");
  const updated = replaceGeneratedBlock(
    content,
    "<!-- ALPHABETS_TABLE_START -->",
    "<!-- ALPHABETS_TABLE_END -->",
    readmeTable(entries),
  );
  await writeFile(readmePath, updated, "utf8");
}

async function syncLanding(entries: AlphabetEntry[]): Promise<void> {
  const indexPath = path.join(repoRoot, "packages", "landing", "src", "index.html");
  const content = await readFile(indexPath, "utf8");
  const updated = replaceGeneratedBlock(
    content,
    "<!-- ALPHABETS_ROWS_START -->",
    "<!-- ALPHABETS_ROWS_END -->",
    landingRows(entries),
  );
  await writeFile(indexPath, updated, "utf8");
}

async function generate(): Promise<void> {
  const version = (await readFile(path.join(repoRoot, "VERSION"), "utf8")).trim();
  const alphabets = await loadAlphabets();
  const errors = validateAlphabets(alphabets);
  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }

  const entries = orderedEntries(alphabets);
  const jsSrc = path.join(repoRoot, "packages", "js", "src");
  const pythonPackage = path.join(repoRoot, "packages", "python", "src", "splicemood_alphabet");

  await mkdir(jsSrc, { recursive: true });
  await mkdir(pythonPackage, { recursive: true });
  await removeGeneratedFiles(jsSrc, ".ts");
  await removeGeneratedFiles(pythonPackage, ".py");

  for (const [id, definition] of entries) {
    await writeGeneratedFile(path.join(jsSrc, `${id}.ts`), createJsModule(id, definition));
    await writeGeneratedFile(path.join(pythonPackage, `${definition.pythonModule}.py`), createPythonModule(definition));

    const goPackage = path.join(repoRoot, definition.packageName);
    await mkdir(goPackage, { recursive: true });
    await removeGeneratedFiles(goPackage, ".go");
    await writeGeneratedFile(path.join(goPackage, "alphabet.go"), createGoModule(definition));
    await writeGeneratedFile(path.join(goPackage, "alphabet_test.go"), createGoTest(definition));
  }

  await writeGeneratedFile(path.join(jsSrc, "index.ts"), createJsIndex(entries));
  await writeGeneratedFile(path.join(pythonPackage, "__init__.py"), createPythonInit(entries, version));
  await syncJsPackage(entries, version);
  await syncPythonVersion(version);
  await syncReadme(entries);
  await syncLanding(entries);

  const generatedErrors = await validateGeneratedOutputs(alphabets);
  if (generatedErrors.length > 0) {
    throw new Error(generatedErrors.join("\n"));
  }

  console.log(`Generated ${entries.length} alphabets for JS, Python and Go.`);
}

await generate();
