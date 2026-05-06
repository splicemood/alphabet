const toast = document.querySelector(".toast");
const alphabetSelect = document.querySelector("#alphabet-select");
const runtimeSelect = document.querySelector("#runtime-select");
const selectedLabel = document.querySelector("[data-selected-label]");
const snippets = new Map();
let toastTimer;

function copyFallback(value) {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

async function copyText(value) {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(value);
  } else {
    copyFallback(value);
  }

  toast.hidden = false;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.hidden = true;
  }, 1600);
}

function toCamelCase(value) {
  return value.replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase());
}

function moduleAlias(id) {
  return id.replace(/-digits$/, "").replaceAll("-", "_");
}

function alphabetRows() {
  return [...document.querySelectorAll("#alphabets tbody tr")];
}

function parseImport(row, label, pattern) {
  const button = [...row.querySelectorAll("button")].find((item) => item.textContent.trim() === label);
  return button?.getAttribute("data-copy")?.match(pattern)?.[1] ?? "";
}

function readAlphabets() {
  return alphabetRows().map((row) => {
    const cells = row.querySelectorAll("td");
    const id = cells[0].textContent.trim();

    return {
      id,
      name: cells[1].textContent.trim(),
      base: cells[2].textContent.trim(),
      exportName: toCamelCase(id),
      pythonModule: parseImport(row, "Python", /splicemood_alphabet\.([a-z0-9_]+)/),
      goPackage: parseImport(row, "Go", /github\.com\/splicemood\/alphabet\/([a-z0-9]+)/),
      row,
    };
  });
}

const alphabets = readAlphabets();

function selectedAlphabet() {
  return alphabets.find((item) => item.id === alphabetSelect.value) ?? alphabets[0];
}

function installSnippet(runtime) {
  if (runtime === "go") {
    return "go get github.com/splicemood/alphabet github.com/matoous/go-nanoid/v2";
  }

  if (runtime === "python") {
    return "pip install splicemood-alphabet nanoid";
  }

  return "npm install @splicemood/alphabet nanoid";
}

function importSnippet(alphabet, runtime) {
  if (runtime === "go") {
    return `import "github.com/splicemood/alphabet/${alphabet.goPackage}"`;
  }

  if (runtime === "python") {
    return `from splicemood_alphabet.${alphabet.pythonModule} import alphabet as ${moduleAlias(alphabet.id)}`;
  }

  return `import { ${alphabet.exportName} } from "@splicemood/alphabet";`;
}

function nanoidSnippet(alphabet, runtime) {
  if (runtime === "go") {
    return `package main

import (
\t"fmt"

\t"github.com/matoous/go-nanoid/v2"
\t"github.com/splicemood/alphabet/${alphabet.goPackage}"
)

func main() {
\tid := gonanoid.MustGenerate(${alphabet.goPackage}.Alphabet, 21)
\tfmt.Println(id)
}`;
  }

  if (runtime === "python") {
    const alias = moduleAlias(alphabet.id);
    return `from nanoid import generate
from splicemood_alphabet.${alphabet.pythonModule} import alphabet as ${alias}

content = generate(${alias}, 21)
print(content)`;
  }

  return `import { customAlphabet } from "nanoid";
import { ${alphabet.exportName} } from "@splicemood/alphabet";

const gen = customAlphabet(${alphabet.exportName}, 21);
console.log(gen());`;
}

function renderExamples() {
  const alphabet = selectedAlphabet();
  const runtime = runtimeSelect.value;
  const rendered = {
    hero: nanoidSnippet(alphabet, runtime),
    install: installSnippet(runtime),
    import: importSnippet(alphabet, runtime),
    nanoid: nanoidSnippet(alphabet, runtime),
  };

  for (const [key, value] of Object.entries(rendered)) {
    snippets.set(key, value);
    for (const target of document.querySelectorAll(`[data-snippet="${key}"]`)) {
      target.textContent = value;
    }
  }

  selectedLabel.textContent = `${alphabet.id} · ${alphabet.name} · base ${alphabet.base}`;
  for (const item of alphabets) {
    item.row.classList.toggle("is-selected", item.id === alphabet.id);
  }

  window.localStorage.setItem(
    "splicemood-alphabet-selection",
    JSON.stringify({ alphabet: alphabet.id, runtime }),
  );
}

function restoreSelection() {
  const defaultAlphabet = alphabets.find((item) => item.id === "ru-digits") ?? alphabets[0];
  let stored = {};

  try {
    stored = JSON.parse(window.localStorage.getItem("splicemood-alphabet-selection") ?? "{}");
  } catch {
    stored = {};
  }

  alphabetSelect.value = alphabets.some((item) => item.id === stored.alphabet)
    ? stored.alphabet
    : defaultAlphabet.id;
  runtimeSelect.value = ["js", "go", "python"].includes(stored.runtime) ? stored.runtime : "js";
}

if (alphabetSelect && runtimeSelect && alphabets.length > 0) {
  for (const alphabet of alphabets) {
    const option = document.createElement("option");
    option.value = alphabet.id;
    option.textContent = `${alphabet.id} — ${alphabet.name}`;
    alphabetSelect.append(option);
  }

  restoreSelection();
  renderExamples();

  alphabetSelect.addEventListener("change", renderExamples);
  runtimeSelect.addEventListener("change", renderExamples);
}

for (const button of document.querySelectorAll("[data-copy], [data-copy-target]")) {
  button.addEventListener("click", async () => {
    const target = button.getAttribute("data-copy-target");
    await copyText(target ? snippets.get(target) : button.getAttribute("data-copy"));
  });
}
