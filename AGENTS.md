Ты — senior open-source maintainer и build/release engineer. Нужно создать production-ready monorepo-проект SpliceMood Alphabet.

Цель проекта:
Сделать единый cross-language registry стабильных Unicode-алфавитов для генерации ID, Nano ID, base-N/base-X кодирования, визуальных токенов и локализованных строк.

Проект должен поддерживать:
1. JavaScript / TypeScript npm package: @splicemood/alphabet
2. Python package: splicemood-alphabet
3. Go module: github.com/splicemood/alphabet

Главный принцип:
Алфавиты нельзя копировать руками в каждый язык. Единственный source of truth — data/alphabets.json. Все JS/Python/Go файлы должны генерироваться автоматически.

Архитектура репозитория:

splicemood-alphabet/
  data/
    alphabets.json

  scripts/
    generate.ts
    validate.ts

  packages/
    js/
      package.json
      tsconfig.json
      src/
        index.ts
        ru.ts
        ru-digits.ts
        en.ts
        en-digits.ts

    python/
      pyproject.toml
      src/
        splicemood_alphabet/
          __init__.py
          ru.py
          ru_digits.py
          en.py
          en_digits.py

  ru/
    alphabet.go
  rudigits/
    alphabet.go
  en/
    alphabet.go
  endigits/
    alphabet.go

  go.mod
  README.md
  LICENSE
  .github/
    workflows/
      ci.yml
      release.yml

Важно:
Go-пакеты должны лежать в корне, чтобы import path был красивым:

import "github.com/splicemood/alphabet/ru"

А не:

import "github.com/splicemood/alphabet/packages/go/ru"

JS API должен поддерживать оба варианта:

import alphabet from "@splicemood/alphabet/ru";

и:

import { ru } from "@splicemood/alphabet";

Для JS:
- ESM-only.
- TypeScript.
- sideEffects: false.
- Subpath exports через package.json exports.
- Каждый алфавит — отдельный модуль.
- Не делать default object registry типа { ru, en, tr }, потому что это хуже для tree-shaking.
- Root index.ts должен только re-export named exports.

Пример JS generated-файла:

// AUTO-GENERATED FILE. DO NOT EDIT.

export const ru =
  "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя";

export const alphabet = ru;
export const base = 66;

export default ru;

Пример root index.ts:

// AUTO-GENERATED FILE. DO NOT EDIT.

export { ru } from "./ru.js";
export { ruDigits } from "./ru-digits.js";
export { en } from "./en.js";
export { enDigits } from "./en-digits.js";

Python API:

from splicemood_alphabet.ru import alphabet
from splicemood_alphabet.ru_digits import alphabet

Python generated-файл:

# AUTO-GENERATED FILE. DO NOT EDIT.

alphabet = "..."
base = 66

Go API:

import "github.com/splicemood/alphabet/ru"

fmt.Println(ru.Alphabet)

Go generated-файл:

// AUTO-GENERATED FILE. DO NOT EDIT.

package ru

const Alphabet = "..."
const Base = 66

data/alphabets.json должен быть единственным редактируемым местом для алфавитов.

Начальные алфавиты MVP:
- ru
- ru-digits
- en
- en-digits
- tr
- tr-digits
- es
- es-digits

Важно по именованию:
- ru = только современные русские буквы.
- ru-digits = русские буквы + 0-9.
- Не добавлять символы вроде -_.~ в ru, потому что это уже не русские символы.
- Не использовать исторические символы вроде Ѣ, Ѳ, Ѵ.
- Для языков с неоднозначным понятием алфавита использовать честные имена:
  - ja-kana
  - ko-hangul
  - zh-common
  - ar
  - hi
  - he
  - el

Формат data/alphabets.json:

{
  "ru": {
    "name": "Russian letters",
    "exportName": "ru",
    "packageName": "ru",
    "pythonModule": "ru",
    "alphabet": "..."
  },
  "ru-digits": {
    "name": "Russian letters + digits",
    "exportName": "ruDigits",
    "packageName": "rudigits",
    "pythonModule": "ru_digits",
    "alphabet": "..."
  }
}

Генератор должен:
1. Читать data/alphabets.json.
2. Валидировать каждый алфавит.
3. Генерировать JS файлы.
4. Генерировать Python файлы.
5. Генерировать Go пакеты.
6. Генерировать JS package.json exports.
7. Генерировать README таблицу алфавитов.
8. Генерировать тесты или snapshots.

Валидация:
- Нет повторяющихся символов.
- Нет пробелов.
- Нет invisible/control characters.
- Строка нормализована в NFC.
- Каждый символ должен быть одним Unicode code point в MVP.
- base должен равняться Array.from(alphabet).length.
- Для JS/Python/Go длина должна совпадать.
- Нельзя случайно добавить combining marks.
- Нельзя добавлять emoji в MVP.
- Нельзя использовать ambiguous generated-файлы как source of truth.

CI:
Добавить GitHub Actions:
1. npm install
2. npm run generate
3. git diff --exit-code
4. npm run lint
5. npm run test
6. npm run build
7. Python tests
8. Go tests

Корневые scripts:
- generate
- validate
- check:generated
- test
- build
- release

README должен быть красивым и понятным:
- Что это такое.
- Чем это не является.
- Это не криптография и не security layer.
- Это stable Unicode alphabets.
- Примеры для Nano ID.
- Примеры для base-x encoder.
- Примеры для JS/Python/Go.
- Таблица всех алфавитов:
  - id
  - description
  - base
  - characters preview
  - import path

README positioning:
Stable Unicode alphabets for Nano ID, base-X encoders, visual IDs and localized tokens.

Не писать:
Secure alphabets.
Military-grade.
Encryption.
Crypto-safe.

Можно писать:
Stable.
Deterministic.
Tree-shakeable.
Zero-dependency.
Generated from one source of truth.
Cross-language.

JS package requirements:
- package name: @splicemood/alphabet
- type: module
- sideEffects: false
- files: ["dist"]
- exports:
  - "."
  - "./ru"
  - "./ru-digits"
  - "./en"
  - "./en-digits"
  - etc.
- default export для каждого subpath — строка алфавита.
- named exports: alphabet, base, ru/ruDigits/etc.
- root export только named exports.

Python package requirements:
- package name: splicemood-alphabet
- import package: splicemood_alphabet
- pyproject.toml
- поддержка Python 3.9+
- zero dependencies

Go requirements:
- module github.com/splicemood/alphabet
- каждый алфавит — отдельный package в корне
- package names без дефисов:
  - ru
  - rudigits
  - en
  - endigits
- const Alphabet
- const Base

Тесты:
JS:
- проверить, что import "@splicemood/alphabet/ru" работает.
- проверить, что import { ru } from "@splicemood/alphabet" работает.
- проверить base.
- проверить отсутствие дубликатов.

Python:
- проверить import.
- проверить base.
- проверить отсутствие дубликатов.

Go:
- go test ./...
- проверить len([]rune(Alphabet)) == Base.
- проверить уникальность rune.

Документация:
Добавить usage examples:

JS Nano ID:

import { customAlphabet } from "nanoid";
import alphabet from "@splicemood/alphabet/ru-digits";

const createId = customAlphabet(alphabet, 21);
console.log(createId());

JS root import:

import { ruDigits } from "@splicemood/alphabet";

Python:

from splicemood_alphabet.ru_digits import alphabet

Go:

import "github.com/splicemood/alphabet/rudigits"

Release strategy:
Начать с версии 0.1.0.
Одинаковая версия для JS/Python/Go.
Релиз должен публиковать:
- npm package
- PyPI package
- git tag для Go module

Качество:
Проект должен выглядеть как аккуратный open-source package:
- чистый README
- MIT license
- zero dependencies runtime
- generated files clearly marked
- CI green
- typed JS
- stable API
- no unnecessary abstractions
- no overengineering

Не надо делать на первом этапе:
- encoder/decoder
- crypto
- CLI
- web-site
- огромную базу всех языков мира
- сложные grapheme clusters
- emoji alphabets
- runtime JSON registry

Нужно сделать сначала идеальный маленький MVP:
1. data/alphabets.json
2. generator
3. JS package
4. Python package
5. Go module
6. validation
7. README
8. CI
9. first alphabets

После MVP можно добавить отдельный пакет:
@splicemood/basex

Но @splicemood/alphabet должен оставаться только registry/data package.

Финальный результат должен быть таким, чтобы пользователь мог написать:

import alphabet from "@splicemood/alphabet/ru";

или:

import { ru } from "@splicemood/alphabet";

и получить стабильный, протестированный, документированный алфавит без лишнего веса.
