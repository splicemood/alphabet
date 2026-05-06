import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export type AlphabetDefinition = {
  name: string;
  exportName: string;
  packageName: string;
  pythonModule: string;
  alphabet: string;
};

export type AlphabetMap = Record<string, AlphabetDefinition>;

const scriptDir = path.dirname(fileURLToPath(import.meta.url));

export const repoRoot = path.resolve(scriptDir, "..");
export const dataPath = path.join(repoRoot, "data", "alphabets.json");

const idPattern = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
const jsExportPattern = /^[a-z][A-Za-z0-9]*$/;
const goPackagePattern = /^[a-z][a-z0-9]*$/;
const pythonModulePattern = /^[a-z][a-z0-9_]*$/;

export async function pathExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function loadAlphabets(filePath = dataPath): Promise<AlphabetMap> {
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw) as AlphabetMap;
}

export function codePoints(value: string): string[] {
  return Array.from(value);
}

function inRange(codePoint: number, start: number, end: number): boolean {
  return codePoint >= start && codePoint <= end;
}

function isControlOrInvisible(codePoint: number): boolean {
  return (
    inRange(codePoint, 0x0000, 0x001f) ||
    inRange(codePoint, 0x007f, 0x009f) ||
    codePoint === 0x00ad ||
    codePoint === 0x034f ||
    codePoint === 0x061c ||
    inRange(codePoint, 0x115f, 0x1160) ||
    inRange(codePoint, 0x17b4, 0x17b5) ||
    inRange(codePoint, 0x180b, 0x180f) ||
    inRange(codePoint, 0x200b, 0x200f) ||
    inRange(codePoint, 0x2028, 0x202f) ||
    inRange(codePoint, 0x2060, 0x206f) ||
    inRange(codePoint, 0xfe00, 0xfe0f) ||
    codePoint === 0xfeff ||
    inRange(codePoint, 0xfff0, 0xfff8) ||
    inRange(codePoint, 0x1bca0, 0x1bca3) ||
    inRange(codePoint, 0x1d173, 0x1d17a) ||
    inRange(codePoint, 0xe0000, 0xe0fff)
  );
}

function isCombiningMark(codePoint: number): boolean {
  return (
    inRange(codePoint, 0x0300, 0x036f) ||
    inRange(codePoint, 0x1ab0, 0x1aff) ||
    inRange(codePoint, 0x1dc0, 0x1dff) ||
    inRange(codePoint, 0x20d0, 0x20ff) ||
    inRange(codePoint, 0xfe20, 0xfe2f)
  );
}

function isUnicodeMark(char: string): boolean {
  return /\p{Mark}/u.test(char);
}

function isEmojiLike(codePoint: number): boolean {
  return (
    inRange(codePoint, 0x1f000, 0x1faff) ||
    inRange(codePoint, 0x2600, 0x27bf)
  );
}

function validateDefinition(id: string, definition: AlphabetDefinition): string[] {
  const errors: string[] = [];

  if (!idPattern.test(id)) {
    errors.push(`${id}: id must use lowercase kebab-case`);
  }

  if (!definition.name || typeof definition.name !== "string") {
    errors.push(`${id}: name is required`);
  }

  if (!jsExportPattern.test(definition.exportName)) {
    errors.push(`${id}: exportName must be a valid camelCase JS identifier`);
  }

  if (!goPackagePattern.test(definition.packageName)) {
    errors.push(`${id}: packageName must be lowercase alphanumeric`);
  }

  if (!pythonModulePattern.test(definition.pythonModule)) {
    errors.push(`${id}: pythonModule must be lowercase snake_case`);
  }

  if (!definition.alphabet || typeof definition.alphabet !== "string") {
    errors.push(`${id}: alphabet is required`);
    return errors;
  }

  if (definition.alphabet !== definition.alphabet.normalize("NFC")) {
    errors.push(`${id}: alphabet must be NFC-normalized`);
  }

  const chars = codePoints(definition.alphabet);
  const seen = new Set<string>();

  for (const char of chars) {
    const codePoint = char.codePointAt(0);
    if (codePoint === undefined) {
      errors.push(`${id}: invalid code point`);
      continue;
    }

    if (seen.has(char)) {
      errors.push(`${id}: duplicate character ${JSON.stringify(char)}`);
    }
    seen.add(char);

    if (/\s/u.test(char)) {
      errors.push(`${id}: whitespace is not allowed`);
    }

    if (isControlOrInvisible(codePoint)) {
      errors.push(`${id}: control or invisible character U+${codePoint.toString(16).toUpperCase()}`);
    }

    if (isCombiningMark(codePoint) || isUnicodeMark(char)) {
      errors.push(`${id}: combining mark U+${codePoint.toString(16).toUpperCase()} is not allowed in MVP`);
    }

    if (isEmojiLike(codePoint)) {
      errors.push(`${id}: emoji-like symbol U+${codePoint.toString(16).toUpperCase()} is not allowed in MVP`);
    }
  }

  if (chars.length !== seen.size) {
    errors.push(`${id}: base must match unique Unicode code point count`);
  }

  return errors;
}

export function validateAlphabets(alphabets: AlphabetMap): string[] {
  const errors: string[] = [];
  const exportNames = new Set<string>();
  const packageNames = new Set<string>();
  const pythonModules = new Set<string>();

  for (const [id, definition] of Object.entries(alphabets)) {
    errors.push(...validateDefinition(id, definition));

    if (exportNames.has(definition.exportName)) {
      errors.push(`${id}: duplicate exportName ${definition.exportName}`);
    }
    exportNames.add(definition.exportName);

    if (packageNames.has(definition.packageName)) {
      errors.push(`${id}: duplicate packageName ${definition.packageName}`);
    }
    packageNames.add(definition.packageName);

    if (pythonModules.has(definition.pythonModule)) {
      errors.push(`${id}: duplicate pythonModule ${definition.pythonModule}`);
    }
    pythonModules.add(definition.pythonModule);
  }

  return errors;
}

function parseGeneratedString(content: string, pattern: RegExp): string | undefined {
  const match = content.match(pattern);
  if (!match) {
    return undefined;
  }

  return JSON.parse(match[1].trim()) as string;
}

function parseGeneratedBase(content: string, pattern: RegExp): number | undefined {
  const match = content.match(pattern);
  return match ? Number(match[1]) : undefined;
}

async function validateGeneratedFile(
  filePath: string,
  id: string,
  expectedAlphabet: string,
  expectedBase: number,
  stringPattern: RegExp,
  basePattern: RegExp,
): Promise<string[]> {
  const errors: string[] = [];

  if (!(await pathExists(filePath))) {
    return [`${id}: missing generated file ${path.relative(repoRoot, filePath)}`];
  }

  const content = await readFile(filePath, "utf8");
  if (!content.includes("AUTO-GENERATED FILE. DO NOT EDIT.")) {
    errors.push(`${id}: ${path.relative(repoRoot, filePath)} must be marked as generated`);
  }

  const alphabet = parseGeneratedString(content, stringPattern);
  const base = parseGeneratedBase(content, basePattern);

  if (alphabet !== expectedAlphabet) {
    errors.push(`${id}: ${path.relative(repoRoot, filePath)} alphabet differs from data/alphabets.json`);
  }

  if (base !== expectedBase) {
    errors.push(`${id}: ${path.relative(repoRoot, filePath)} base differs from Unicode code point count`);
  }

  return errors;
}

export async function validateGeneratedOutputs(alphabets: AlphabetMap): Promise<string[]> {
  const errors: string[] = [];

  for (const [id, definition] of Object.entries(alphabets)) {
    const expectedBase = codePoints(definition.alphabet).length;
    const jsPath = path.join(repoRoot, "packages", "js", "src", `${id}.ts`);
    const pythonPath = path.join(
      repoRoot,
      "packages",
      "python",
      "src",
      "splicemood_alphabet",
      `${definition.pythonModule}.py`,
    );
    const goPath = path.join(repoRoot, definition.packageName, "alphabet.go");

    errors.push(
      ...(await validateGeneratedFile(
        jsPath,
        id,
        definition.alphabet,
        expectedBase,
        new RegExp(`export const ${definition.exportName}\\s*=\\s*([^;]+);`),
        /export const base\s*=\s*(\d+);/,
      )),
    );

    errors.push(
      ...(await validateGeneratedFile(
        pythonPath,
        id,
        definition.alphabet,
        expectedBase,
        /alphabet\s*=\s*([^\n]+)/,
        /base\s*=\s*(\d+)/,
      )),
    );

    errors.push(
      ...(await validateGeneratedFile(
        goPath,
        id,
        definition.alphabet,
        expectedBase,
        /const Alphabet\s*=\s*([^\n]+)/,
        /const Base\s*=\s*(\d+)/,
      )),
    );
  }

  return errors;
}

async function main(): Promise<void> {
  const alphabets = await loadAlphabets();
  const errors = validateAlphabets(alphabets);
  errors.push(...(await validateGeneratedOutputs(alphabets)));

  if (errors.length > 0) {
    for (const error of errors) {
      console.error(error);
    }
    process.exitCode = 1;
    return;
  }

  console.log(`Validated ${Object.keys(alphabets).length} alphabets.`);
}

const currentFile = path.resolve(fileURLToPath(import.meta.url));
const invokedFile = process.argv[1] ? path.resolve(process.argv[1]) : "";

if (currentFile === invokedFile) {
  await main();
}
