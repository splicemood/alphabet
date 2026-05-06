# SpliceMood Alphabet

Stable Unicode alphabets for Nano ID, base-X encoders, visual IDs and localized tokens.

SpliceMood Alphabet is a small cross-language registry of deterministic alphabet strings. The source of truth is `data/alphabets.json`; JavaScript, Python and Go packages are generated from it.

## What It Is

- Stable Unicode alphabet strings with explicit names and import paths.
- Cross-language output for npm, PyPI and Go modules.
- Tree-shakeable ESM modules for JavaScript and TypeScript.
- Zero runtime dependencies.
- Generated from one source of truth.

## Coverage Model

The registry uses language IDs when a stable single-code-point letter set is practical, for example `ru`, `uk`, `pl`, `tr`, `ar`, `hi` and `ka`.

For writing systems where “alphabet” is not a precise finite language-level concept, the registry uses honest script-level names:

- `ja-hiragana`, `ja-katakana`, `ja-kana`
- `ko-jamo`, `ko-hangul`
- `zh-common`
- `sr-latin`, `sr-cyrillic`
- `pa-gurmukhi`
- `kk-cyrillic`, `ky-cyrillic`, `uz-cyrillic`, `mn-cyrillic`

Languages with digraph letters keep only single Unicode code point letters in this package. Complex grapheme clusters belong in a later package with explicit grapheme support.

## What It Is Not

- Not an encoder or decoder.
- Not a protection layer for secrets.
- Not a runtime JSON registry.
- Not a collection of emoji alphabets or complex grapheme clusters.

## Install

```sh
npm install @splicemood/alphabet
pip install splicemood-alphabet
go get github.com/splicemood/alphabet
```

## JavaScript

```ts
import alphabet from "@splicemood/alphabet/ru";

console.log(alphabet);
```

```ts
import { ru } from "@splicemood/alphabet";

console.log(ru);
```

### Nano ID

```ts
import { customAlphabet } from "nanoid";
import alphabet from "@splicemood/alphabet/ru-digits";

const createId = customAlphabet(alphabet, 21);
console.log(createId());
```

### Base-X Encoder Input

```ts
import alphabet from "@splicemood/alphabet/en-digits";

const base = Array.from(alphabet).length;
```

## Python

```py
from splicemood_alphabet.ru import alphabet
from splicemood_alphabet.ru_digits import alphabet as ru_digits

print(alphabet)
print(ru_digits)
```

## Go

```go
package main

import (
	"fmt"

	"github.com/splicemood/alphabet/ru"
	"github.com/splicemood/alphabet/rudigits"
)

func main() {
	fmt.Println(ru.Alphabet)
	fmt.Println(rudigits.Base)
}
```

## Alphabets

<!-- ALPHABETS_TABLE_START -->
| id | description | base | characters preview | JS import | Python module | Go import |
| --- | --- | ---: | --- | --- | --- | --- |
| `ru` | Russian letters | 66 | `АБВГДЕЁЖЗИЙКЛМ…шщъыьэюя` | `@splicemood/alphabet/ru` | `splicemood_alphabet.ru` | `github.com/splicemood/alphabet/ru` |
| `ru-digits` | Russian letters + digits | 76 | `АБВГДЕЁЖЗИЙКЛМ…23456789` | `@splicemood/alphabet/ru-digits` | `splicemood_alphabet.ru_digits` | `github.com/splicemood/alphabet/rudigits` |
| `en` | English letters | 52 | `ABCDEFGHIJKLMN…stuvwxyz` | `@splicemood/alphabet/en` | `splicemood_alphabet.en` | `github.com/splicemood/alphabet/en` |
| `en-digits` | English letters + digits | 62 | `ABCDEFGHIJKLMN…23456789` | `@splicemood/alphabet/en-digits` | `splicemood_alphabet.en_digits` | `github.com/splicemood/alphabet/endigits` |
| `tr` | Turkish letters | 58 | `ABCÇDEFGĞHIİJK…sştuüvyz` | `@splicemood/alphabet/tr` | `splicemood_alphabet.tr` | `github.com/splicemood/alphabet/tr` |
| `tr-digits` | Turkish letters + digits | 68 | `ABCÇDEFGĞHIİJK…23456789` | `@splicemood/alphabet/tr-digits` | `splicemood_alphabet.tr_digits` | `github.com/splicemood/alphabet/trdigits` |
| `es` | Spanish letters | 54 | `ABCDEFGHIJKLMN…stuvwxyz` | `@splicemood/alphabet/es` | `splicemood_alphabet.es` | `github.com/splicemood/alphabet/es` |
| `es-digits` | Spanish letters + digits | 64 | `ABCDEFGHIJKLMN…23456789` | `@splicemood/alphabet/es-digits` | `splicemood_alphabet.es_digits` | `github.com/splicemood/alphabet/esdigits` |
| `latin` | Basic Latin letters | 52 | `ABCDEFGHIJKLMN…stuvwxyz` | `@splicemood/alphabet/latin` | `splicemood_alphabet.latin` | `github.com/splicemood/alphabet/latin` |
| `latin-digits` | Basic Latin letters + digits | 62 | `ABCDEFGHIJKLMN…23456789` | `@splicemood/alphabet/latin-digits` | `splicemood_alphabet.latin_digits` | `github.com/splicemood/alphabet/latindigits` |
| `id` | Indonesian letters | 52 | `ABCDEFGHIJKLMN…stuvwxyz` | `@splicemood/alphabet/id` | `splicemood_alphabet.id` | `github.com/splicemood/alphabet/id` |
| `id-digits` | Indonesian letters + digits | 62 | `ABCDEFGHIJKLMN…23456789` | `@splicemood/alphabet/id-digits` | `splicemood_alphabet.id_digits` | `github.com/splicemood/alphabet/iddigits` |
| `ms` | Malay letters | 52 | `ABCDEFGHIJKLMN…stuvwxyz` | `@splicemood/alphabet/ms` | `splicemood_alphabet.ms` | `github.com/splicemood/alphabet/ms` |
| `ms-digits` | Malay letters + digits | 62 | `ABCDEFGHIJKLMN…23456789` | `@splicemood/alphabet/ms-digits` | `splicemood_alphabet.ms_digits` | `github.com/splicemood/alphabet/msdigits` |
| `sw` | Swahili letters | 52 | `ABCDEFGHIJKLMN…stuvwxyz` | `@splicemood/alphabet/sw` | `splicemood_alphabet.sw` | `github.com/splicemood/alphabet/sw` |
| `sw-digits` | Swahili letters + digits | 62 | `ABCDEFGHIJKLMN…23456789` | `@splicemood/alphabet/sw-digits` | `splicemood_alphabet.sw_digits` | `github.com/splicemood/alphabet/swdigits` |
| `nl` | Dutch letters | 52 | `ABCDEFGHIJKLMN…stuvwxyz` | `@splicemood/alphabet/nl` | `splicemood_alphabet.nl` | `github.com/splicemood/alphabet/nl` |
| `nl-digits` | Dutch letters + digits | 62 | `ABCDEFGHIJKLMN…23456789` | `@splicemood/alphabet/nl-digits` | `splicemood_alphabet.nl_digits` | `github.com/splicemood/alphabet/nldigits` |
| `de` | German letters | 60 | `ABCDEFGHIJKLMN…wxyzäöüß` | `@splicemood/alphabet/de` | `splicemood_alphabet.de` | `github.com/splicemood/alphabet/de` |
| `de-digits` | German letters + digits | 70 | `ABCDEFGHIJKLMN…23456789` | `@splicemood/alphabet/de-digits` | `splicemood_alphabet.de_digits` | `github.com/splicemood/alphabet/dedigits` |
| `fr` | French letters with common diacritics | 84 | `ABCDEFGHIJKLMN…îïôœùûüÿ` | `@splicemood/alphabet/fr` | `splicemood_alphabet.fr` | `github.com/splicemood/alphabet/fr` |
| `fr-digits` | French letters with common diacritics + digits | 94 | `ABCDEFGHIJKLMN…23456789` | `@splicemood/alphabet/fr-digits` | `splicemood_alphabet.fr_digits` | `github.com/splicemood/alphabet/frdigits` |
| `pt` | Portuguese letters with common diacritics | 78 | `ABCDEFGHIJKLMN…éêíóôõúü` | `@splicemood/alphabet/pt` | `splicemood_alphabet.pt` | `github.com/splicemood/alphabet/pt` |
| `pt-digits` | Portuguese letters with common diacritics + digits | 88 | `ABCDEFGHIJKLMN…23456789` | `@splicemood/alphabet/pt-digits` | `splicemood_alphabet.pt_digits` | `github.com/splicemood/alphabet/ptdigits` |
| `it` | Italian native letters | 42 | `ABCDEFGHILMNOP…pqrstuvz` | `@splicemood/alphabet/it` | `splicemood_alphabet.it` | `github.com/splicemood/alphabet/it` |
| `it-digits` | Italian native letters + digits | 52 | `ABCDEFGHILMNOP…23456789` | `@splicemood/alphabet/it-digits` | `splicemood_alphabet.it_digits` | `github.com/splicemood/alphabet/itdigits` |
| `pl` | Polish letters | 64 | `AĄBCĆDEĘFGHIJK…śtuwyzźż` | `@splicemood/alphabet/pl` | `splicemood_alphabet.pl` | `github.com/splicemood/alphabet/pl` |
| `pl-digits` | Polish letters + digits | 74 | `AĄBCĆDEĘFGHIJK…23456789` | `@splicemood/alphabet/pl-digits` | `splicemood_alphabet.pl_digits` | `github.com/splicemood/alphabet/pldigits` |
| `cs` | Czech single-code-point letters | 82 | `AÁBCČDĎEÉĚFGHI…ůvwxyýzž` | `@splicemood/alphabet/cs` | `splicemood_alphabet.cs` | `github.com/splicemood/alphabet/cs` |
| `cs-digits` | Czech single-code-point letters + digits | 92 | `AÁBCČDĎEÉĚFGHI…23456789` | `@splicemood/alphabet/cs-digits` | `splicemood_alphabet.cs_digits` | `github.com/splicemood/alphabet/csdigits` |
| `sk` | Slovak single-code-point letters | 82 | `AÁÄBCČDĎEÉFGHI…úvwxyýzž` | `@splicemood/alphabet/sk` | `splicemood_alphabet.sk` | `github.com/splicemood/alphabet/sk` |
| `sk-digits` | Slovak single-code-point letters + digits | 92 | `AÁÄBCČDĎEÉFGHI…23456789` | `@splicemood/alphabet/sk-digits` | `splicemood_alphabet.sk_digits` | `github.com/splicemood/alphabet/skdigits` |
| `sl` | Slovene letters | 50 | `ABCČDEFGHIJKLM…rsštuvzž` | `@splicemood/alphabet/sl` | `splicemood_alphabet.sl` | `github.com/splicemood/alphabet/sl` |
| `sl-digits` | Slovene letters + digits | 60 | `ABCČDEFGHIJKLM…23456789` | `@splicemood/alphabet/sl-digits` | `splicemood_alphabet.sl_digits` | `github.com/splicemood/alphabet/sldigits` |
| `hr` | Croatian single-code-point letters | 54 | `ABCČĆDĐEFGHIJK…rsštuvzž` | `@splicemood/alphabet/hr` | `splicemood_alphabet.hr` | `github.com/splicemood/alphabet/hr` |
| `hr-digits` | Croatian single-code-point letters + digits | 64 | `ABCČĆDĐEFGHIJK…23456789` | `@splicemood/alphabet/hr-digits` | `splicemood_alphabet.hr_digits` | `github.com/splicemood/alphabet/hrdigits` |
| `bs` | Bosnian single-code-point letters | 54 | `ABCČĆDĐEFGHIJK…rsštuvzž` | `@splicemood/alphabet/bs` | `splicemood_alphabet.bs` | `github.com/splicemood/alphabet/bs` |
| `bs-digits` | Bosnian single-code-point letters + digits | 64 | `ABCČĆDĐEFGHIJK…23456789` | `@splicemood/alphabet/bs-digits` | `splicemood_alphabet.bs_digits` | `github.com/splicemood/alphabet/bsdigits` |
| `sr-latin` | Serbian Latin single-code-point letters | 54 | `ABCČĆDĐEFGHIJK…rsštuvzž` | `@splicemood/alphabet/sr-latin` | `splicemood_alphabet.sr_latin` | `github.com/splicemood/alphabet/srlatin` |
| `sr-latin-digits` | Serbian Latin single-code-point letters + digits | 64 | `ABCČĆDĐEFGHIJK…23456789` | `@splicemood/alphabet/sr-latin-digits` | `splicemood_alphabet.sr_latin_digits` | `github.com/splicemood/alphabet/srlatindigits` |
| `hu` | Hungarian single-code-point letters | 70 | `AÁBCDEÉFGHIÍJK…úüűvwxyz` | `@splicemood/alphabet/hu` | `splicemood_alphabet.hu` | `github.com/splicemood/alphabet/hu` |
| `hu-digits` | Hungarian single-code-point letters + digits | 80 | `AÁBCDEÉFGHIÍJK…23456789` | `@splicemood/alphabet/hu-digits` | `splicemood_alphabet.hu_digits` | `github.com/splicemood/alphabet/hudigits` |
| `fi` | Finnish letters | 58 | `ABCDEFGHIJKLMN…vwxyzåäö` | `@splicemood/alphabet/fi` | `splicemood_alphabet.fi` | `github.com/splicemood/alphabet/fi` |
| `fi-digits` | Finnish letters + digits | 68 | `ABCDEFGHIJKLMN…23456789` | `@splicemood/alphabet/fi-digits` | `splicemood_alphabet.fi_digits` | `github.com/splicemood/alphabet/fidigits` |
| `sv` | Swedish letters | 58 | `ABCDEFGHIJKLMN…vwxyzåäö` | `@splicemood/alphabet/sv` | `splicemood_alphabet.sv` | `github.com/splicemood/alphabet/sv` |
| `sv-digits` | Swedish letters + digits | 68 | `ABCDEFGHIJKLMN…23456789` | `@splicemood/alphabet/sv-digits` | `splicemood_alphabet.sv_digits` | `github.com/splicemood/alphabet/svdigits` |
| `no` | Norwegian letters | 58 | `ABCDEFGHIJKLMN…vwxyzæøå` | `@splicemood/alphabet/no` | `splicemood_alphabet.no` | `github.com/splicemood/alphabet/no` |
| `no-digits` | Norwegian letters + digits | 68 | `ABCDEFGHIJKLMN…23456789` | `@splicemood/alphabet/no-digits` | `splicemood_alphabet.no_digits` | `github.com/splicemood/alphabet/nodigits` |
| `da` | Danish letters | 58 | `ABCDEFGHIJKLMN…vwxyzæøå` | `@splicemood/alphabet/da` | `splicemood_alphabet.da` | `github.com/splicemood/alphabet/da` |
| `da-digits` | Danish letters + digits | 68 | `ABCDEFGHIJKLMN…23456789` | `@splicemood/alphabet/da-digits` | `splicemood_alphabet.da_digits` | `github.com/splicemood/alphabet/dadigits` |
| `is` | Icelandic letters | 64 | `AÁBDÐEÉFGHIÍJK…úvxyýþæö` | `@splicemood/alphabet/is` | `splicemood_alphabet.is` | `github.com/splicemood/alphabet/is` |
| `is-digits` | Icelandic letters + digits | 74 | `AÁBDÐEÉFGHIÍJK…23456789` | `@splicemood/alphabet/is-digits` | `splicemood_alphabet.is_digits` | `github.com/splicemood/alphabet/isdigits` |
| `et` | Estonian letters | 54 | `ABDEFGHIJKLMNO…žtuvõäöü` | `@splicemood/alphabet/et` | `splicemood_alphabet.et` | `github.com/splicemood/alphabet/et` |
| `et-digits` | Estonian letters + digits | 64 | `ABDEFGHIJKLMNO…23456789` | `@splicemood/alphabet/et-digits` | `splicemood_alphabet.et_digits` | `github.com/splicemood/alphabet/etdigits` |
| `lv` | Latvian letters | 66 | `AĀBCČDEĒFGĢHIĪ…sštuūvzž` | `@splicemood/alphabet/lv` | `splicemood_alphabet.lv` | `github.com/splicemood/alphabet/lv` |
| `lv-digits` | Latvian letters + digits | 76 | `AĀBCČDEĒFGĢHIĪ…23456789` | `@splicemood/alphabet/lv-digits` | `splicemood_alphabet.lv_digits` | `github.com/splicemood/alphabet/lvdigits` |
| `lt` | Lithuanian letters | 64 | `AĄBCČDEĘĖFGHIĮ…štuųūvzž` | `@splicemood/alphabet/lt` | `splicemood_alphabet.lt` | `github.com/splicemood/alphabet/lt` |
| `lt-digits` | Lithuanian letters + digits | 74 | `AĄBCČDEĘĖFGHIĮ…23456789` | `@splicemood/alphabet/lt-digits` | `splicemood_alphabet.lt_digits` | `github.com/splicemood/alphabet/ltdigits` |
| `ro` | Romanian letters | 62 | `AĂÂBCDEFGHIÎJK…tțuvwxyz` | `@splicemood/alphabet/ro` | `splicemood_alphabet.ro` | `github.com/splicemood/alphabet/ro` |
| `ro-digits` | Romanian letters + digits | 72 | `AĂÂBCDEFGHIÎJK…23456789` | `@splicemood/alphabet/ro-digits` | `splicemood_alphabet.ro_digits` | `github.com/splicemood/alphabet/rodigits` |
| `vi` | Vietnamese base letters | 58 | `AĂÂBCDĐEÊGHIKL…rstuưvxy` | `@splicemood/alphabet/vi` | `splicemood_alphabet.vi` | `github.com/splicemood/alphabet/vi` |
| `vi-digits` | Vietnamese base letters + digits | 68 | `AĂÂBCDĐEÊGHIKL…23456789` | `@splicemood/alphabet/vi-digits` | `splicemood_alphabet.vi_digits` | `github.com/splicemood/alphabet/vidigits` |
| `sq` | Albanian single-code-point letters | 54 | `ABCÇDEËFGHIJKL…stuvwxyz` | `@splicemood/alphabet/sq` | `splicemood_alphabet.sq` | `github.com/splicemood/alphabet/sq` |
| `sq-digits` | Albanian single-code-point letters + digits | 64 | `ABCÇDEËFGHIJKL…23456789` | `@splicemood/alphabet/sq-digits` | `splicemood_alphabet.sq_digits` | `github.com/splicemood/alphabet/sqdigits` |
| `az` | Azerbaijani Latin letters | 64 | `ABCÇDEƏFGĞHXIİ…sştuüvyz` | `@splicemood/alphabet/az` | `splicemood_alphabet.az` | `github.com/splicemood/alphabet/az` |
| `az-digits` | Azerbaijani Latin letters + digits | 74 | `ABCÇDEƏFGĞHXIİ…23456789` | `@splicemood/alphabet/az-digits` | `splicemood_alphabet.az_digits` | `github.com/splicemood/alphabet/azdigits` |
| `ca` | Catalan letters with common diacritics | 72 | `ABCDEFGHIJKLMN…èíïóòúüç` | `@splicemood/alphabet/ca` | `splicemood_alphabet.ca` | `github.com/splicemood/alphabet/ca` |
| `ca-digits` | Catalan letters with common diacritics + digits | 82 | `ABCDEFGHIJKLMN…23456789` | `@splicemood/alphabet/ca-digits` | `splicemood_alphabet.ca_digits` | `github.com/splicemood/alphabet/cadigits` |
| `eo` | Esperanto letters | 56 | `ABCĈDEFGĜHĤIJĴ…rsŝtuŭvz` | `@splicemood/alphabet/eo` | `splicemood_alphabet.eo` | `github.com/splicemood/alphabet/eo` |
| `eo-digits` | Esperanto letters + digits | 66 | `ABCĈDEFGĜHĤIJĴ…23456789` | `@splicemood/alphabet/eo-digits` | `splicemood_alphabet.eo_digits` | `github.com/splicemood/alphabet/eodigits` |
| `mt` | Maltese single-code-point letters | 60 | `ABCĊDEFGĠHĦIJK…tuvwxyzż` | `@splicemood/alphabet/mt` | `splicemood_alphabet.mt` | `github.com/splicemood/alphabet/mt` |
| `mt-digits` | Maltese single-code-point letters + digits | 70 | `ABCĊDEFGĠHĦIJK…23456789` | `@splicemood/alphabet/mt-digits` | `splicemood_alphabet.mt_digits` | `github.com/splicemood/alphabet/mtdigits` |
| `uk` | Ukrainian letters | 66 | `АБВГҐДЕЄЖЗИІЇЙ…хцчшщьюя` | `@splicemood/alphabet/uk` | `splicemood_alphabet.uk` | `github.com/splicemood/alphabet/uk` |
| `uk-digits` | Ukrainian letters + digits | 76 | `АБВГҐДЕЄЖЗИІЇЙ…23456789` | `@splicemood/alphabet/uk-digits` | `splicemood_alphabet.uk_digits` | `github.com/splicemood/alphabet/ukdigits` |
| `be` | Belarusian letters | 64 | `АБВГДЕЁЖЗІЙКЛМ…цчшыьэюя` | `@splicemood/alphabet/be` | `splicemood_alphabet.be` | `github.com/splicemood/alphabet/be` |
| `be-digits` | Belarusian letters + digits | 74 | `АБВГДЕЁЖЗІЙКЛМ…23456789` | `@splicemood/alphabet/be-digits` | `splicemood_alphabet.be_digits` | `github.com/splicemood/alphabet/bedigits` |
| `bg` | Bulgarian letters | 60 | `АБВГДЕЖЗИЙКЛМН…цчшщъьюя` | `@splicemood/alphabet/bg` | `splicemood_alphabet.bg` | `github.com/splicemood/alphabet/bg` |
| `bg-digits` | Bulgarian letters + digits | 70 | `АБВГДЕЖЗИЙКЛМН…23456789` | `@splicemood/alphabet/bg-digits` | `splicemood_alphabet.bg_digits` | `github.com/splicemood/alphabet/bgdigits` |
| `sr-cyrillic` | Serbian Cyrillic letters | 60 | `АБВГДЂЕЖЗИЈКЛЉ…ћуфхцчџш` | `@splicemood/alphabet/sr-cyrillic` | `splicemood_alphabet.sr_cyrillic` | `github.com/splicemood/alphabet/srcyrillic` |
| `sr-cyrillic-digits` | Serbian Cyrillic letters + digits | 70 | `АБВГДЂЕЖЗИЈКЛЉ…23456789` | `@splicemood/alphabet/sr-cyrillic-digits` | `splicemood_alphabet.sr_cyrillic_digits` | `github.com/splicemood/alphabet/srcyrillicdigits` |
| `mk` | Macedonian letters | 62 | `АБВГДЃЕЖЗЅИЈКЛ…ќуфхцчџш` | `@splicemood/alphabet/mk` | `splicemood_alphabet.mk` | `github.com/splicemood/alphabet/mk` |
| `mk-digits` | Macedonian letters + digits | 72 | `АБВГДЃЕЖЗЅИЈКЛ…23456789` | `@splicemood/alphabet/mk-digits` | `splicemood_alphabet.mk_digits` | `github.com/splicemood/alphabet/mkdigits` |
| `kk-cyrillic` | Kazakh Cyrillic letters | 84 | `АӘБВГҒДЕЁЖЗИЙК…щъыіьэюя` | `@splicemood/alphabet/kk-cyrillic` | `splicemood_alphabet.kk_cyrillic` | `github.com/splicemood/alphabet/kkcyrillic` |
| `kk-cyrillic-digits` | Kazakh Cyrillic letters + digits | 94 | `АӘБВГҒДЕЁЖЗИЙК…23456789` | `@splicemood/alphabet/kk-cyrillic-digits` | `splicemood_alphabet.kk_cyrillic_digits` | `github.com/splicemood/alphabet/kkcyrillicdigits` |
| `ky-cyrillic` | Kyrgyz Cyrillic letters | 72 | `АБВГДЕЁЖЗИЙКЛМ…шщъыьэюя` | `@splicemood/alphabet/ky-cyrillic` | `splicemood_alphabet.ky_cyrillic` | `github.com/splicemood/alphabet/kycyrillic` |
| `ky-cyrillic-digits` | Kyrgyz Cyrillic letters + digits | 82 | `АБВГДЕЁЖЗИЙКЛМ…23456789` | `@splicemood/alphabet/ky-cyrillic-digits` | `splicemood_alphabet.ky_cyrillic_digits` | `github.com/splicemood/alphabet/kycyrillicdigits` |
| `uz-cyrillic` | Uzbek Cyrillic letters | 70 | `АБВГДЕЁЖЗИЙКЛМ…ьэюяўқғҳ` | `@splicemood/alphabet/uz-cyrillic` | `splicemood_alphabet.uz_cyrillic` | `github.com/splicemood/alphabet/uzcyrillic` |
| `uz-cyrillic-digits` | Uzbek Cyrillic letters + digits | 80 | `АБВГДЕЁЖЗИЙКЛМ…23456789` | `@splicemood/alphabet/uz-cyrillic-digits` | `splicemood_alphabet.uz_cyrillic_digits` | `github.com/splicemood/alphabet/uzcyrillicdigits` |
| `mn-cyrillic` | Mongolian Cyrillic letters | 70 | `АБВГДЕЁЖЗИЙКЛМ…шщъыьэюя` | `@splicemood/alphabet/mn-cyrillic` | `splicemood_alphabet.mn_cyrillic` | `github.com/splicemood/alphabet/mncyrillic` |
| `mn-cyrillic-digits` | Mongolian Cyrillic letters + digits | 80 | `АБВГДЕЁЖЗИЙКЛМ…23456789` | `@splicemood/alphabet/mn-cyrillic-digits` | `splicemood_alphabet.mn_cyrillic_digits` | `github.com/splicemood/alphabet/mncyrillicdigits` |
| `el` | Greek letters | 49 | `ΑΒΓΔΕΖΗΘΙΚΛΜΝΞ…στυφχψως` | `@splicemood/alphabet/el` | `splicemood_alphabet.el` | `github.com/splicemood/alphabet/el` |
| `el-digits` | Greek letters + digits | 59 | `ΑΒΓΔΕΖΗΘΙΚΛΜΝΞ…23456789` | `@splicemood/alphabet/el-digits` | `splicemood_alphabet.el_digits` | `github.com/splicemood/alphabet/eldigits` |
| `he` | Hebrew letters with final forms | 27 | `אבגדהוזחטיכךלמ…פףצץקרשת` | `@splicemood/alphabet/he` | `splicemood_alphabet.he` | `github.com/splicemood/alphabet/he` |
| `he-digits` | Hebrew letters with final forms + digits | 37 | `אבגדהוזחטיכךלמ…23456789` | `@splicemood/alphabet/he-digits` | `splicemood_alphabet.he_digits` | `github.com/splicemood/alphabet/hedigits` |
| `ar` | Arabic letters | 28 | `ابتثجحخدذرزسشص…قكلمنهوي` | `@splicemood/alphabet/ar` | `splicemood_alphabet.ar` | `github.com/splicemood/alphabet/ar` |
| `ar-digits` | Arabic letters + digits | 38 | `ابتثجحخدذرزسشص…23456789` | `@splicemood/alphabet/ar-digits` | `splicemood_alphabet.ar_digits` | `github.com/splicemood/alphabet/ardigits` |
| `fa` | Persian letters | 33 | `آابپتثجچحخدذرز…کگلمنوهی` | `@splicemood/alphabet/fa` | `splicemood_alphabet.fa` | `github.com/splicemood/alphabet/fa` |
| `fa-digits` | Persian letters + digits | 43 | `آابپتثجچحخدذرز…23456789` | `@splicemood/alphabet/fa-digits` | `splicemood_alphabet.fa_digits` | `github.com/splicemood/alphabet/fadigits` |
| `ur` | Urdu letters | 40 | `آابپتٹثجچحخدڈذ…نںوہھءیے` | `@splicemood/alphabet/ur` | `splicemood_alphabet.ur` | `github.com/splicemood/alphabet/ur` |
| `ur-digits` | Urdu letters + digits | 50 | `آابپتٹثجچحخدڈذ…23456789` | `@splicemood/alphabet/ur-digits` | `splicemood_alphabet.ur_digits` | `github.com/splicemood/alphabet/urdigits` |
| `hi` | Hindi Devanagari independent letters | 44 | `अआइईउऊऋएऐओऔकखग…यरलवशषसह` | `@splicemood/alphabet/hi` | `splicemood_alphabet.hi` | `github.com/splicemood/alphabet/hi` |
| `hi-digits` | Hindi Devanagari independent letters + digits | 54 | `अआइईउऊऋएऐओऔकखग…23456789` | `@splicemood/alphabet/hi-digits` | `splicemood_alphabet.hi_digits` | `github.com/splicemood/alphabet/hidigits` |
| `bn` | Bengali independent letters | 44 | `অআইঈউঊঋএঐওঔকখগ…যরলশষসহৎ` | `@splicemood/alphabet/bn` | `splicemood_alphabet.bn` | `github.com/splicemood/alphabet/bn` |
| `bn-digits` | Bengali independent letters + digits | 54 | `অআইঈউঊঋএঐওঔকখগ…23456789` | `@splicemood/alphabet/bn-digits` | `splicemood_alphabet.bn_digits` | `github.com/splicemood/alphabet/bndigits` |
| `pa-gurmukhi` | Punjabi Gurmukhi independent letters | 42 | `ਅਆਇਈਉਊਏਐਓਔਕਖਗਘ…ਮਯਰਲਵਸਹੜ` | `@splicemood/alphabet/pa-gurmukhi` | `splicemood_alphabet.pa_gurmukhi` | `github.com/splicemood/alphabet/pagurmukhi` |
| `pa-gurmukhi-digits` | Punjabi Gurmukhi independent letters + digits | 52 | `ਅਆਇਈਉਊਏਐਓਔਕਖਗਘ…23456789` | `@splicemood/alphabet/pa-gurmukhi-digits` | `splicemood_alphabet.pa_gurmukhi_digits` | `github.com/splicemood/alphabet/pagurmukhidigits` |
| `gu` | Gujarati independent letters | 45 | `અઆઇઈઉઊઋએઐઓઔકખગ…રલવશષસહળ` | `@splicemood/alphabet/gu` | `splicemood_alphabet.gu` | `github.com/splicemood/alphabet/gu` |
| `gu-digits` | Gujarati independent letters + digits | 55 | `અઆઇઈઉઊઋએઐઓઔકખગ…23456789` | `@splicemood/alphabet/gu-digits` | `splicemood_alphabet.gu_digits` | `github.com/splicemood/alphabet/gudigits` |
| `ta` | Tamil independent letters | 35 | `அஆஇஈஉஊஎஏஐஒஓஔஃக…ழளறனஜஷஸஹ` | `@splicemood/alphabet/ta` | `splicemood_alphabet.ta` | `github.com/splicemood/alphabet/ta` |
| `ta-digits` | Tamil independent letters + digits | 45 | `அஆஇஈஉஊஎஏஐஒஓஔஃக…23456789` | `@splicemood/alphabet/ta-digits` | `splicemood_alphabet.ta_digits` | `github.com/splicemood/alphabet/tadigits` |
| `te` | Telugu independent letters | 49 | `అఆఇఈఉఊఋౠఎఏఐఒఓఔ…లవశషసహళఱ` | `@splicemood/alphabet/te` | `splicemood_alphabet.te` | `github.com/splicemood/alphabet/te` |
| `te-digits` | Telugu independent letters + digits | 59 | `అఆఇఈఉఊఋౠఎఏఐఒఓఔ…23456789` | `@splicemood/alphabet/te-digits` | `splicemood_alphabet.te_digits` | `github.com/splicemood/alphabet/tedigits` |
| `kn` | Kannada independent letters | 48 | `ಅಆಇಈಉಊಋೠಎಏಐಒಓಔ…ರಲವಶಷಸಹಳ` | `@splicemood/alphabet/kn` | `splicemood_alphabet.kn` | `github.com/splicemood/alphabet/kn` |
| `kn-digits` | Kannada independent letters + digits | 58 | `ಅಆಇಈಉಊಋೠಎಏಐಒಓಔ…23456789` | `@splicemood/alphabet/kn-digits` | `splicemood_alphabet.kn_digits` | `github.com/splicemood/alphabet/kndigits` |
| `ml` | Malayalam independent letters | 50 | `അആഇഈഉഊഋൠഎഏഐഒഓഔ…വശഷസഹളഴറ` | `@splicemood/alphabet/ml` | `splicemood_alphabet.ml` | `github.com/splicemood/alphabet/ml` |
| `ml-digits` | Malayalam independent letters + digits | 60 | `അആഇഈഉഊഋൠഎഏഐഒഓഔ…23456789` | `@splicemood/alphabet/ml-digits` | `splicemood_alphabet.ml_digits` | `github.com/splicemood/alphabet/mldigits` |
| `th` | Thai consonant letters | 44 | `กขฃคฅฆงจฉชซฌญฎ…วศษสหฬอฮ` | `@splicemood/alphabet/th` | `splicemood_alphabet.th` | `github.com/splicemood/alphabet/th` |
| `th-digits` | Thai consonant letters + digits | 54 | `กขฃคฅฆงจฉชซฌญฎ…23456789` | `@splicemood/alphabet/th-digits` | `splicemood_alphabet.th_digits` | `github.com/splicemood/alphabet/thdigits` |
| `km` | Khmer consonant letters | 35 | `កខគឃងចឆជឈញដឋឌឍ…លវឝឞសហឡអ` | `@splicemood/alphabet/km` | `splicemood_alphabet.km` | `github.com/splicemood/alphabet/km` |
| `km-digits` | Khmer consonant letters + digits | 45 | `កខគឃងចឆជឈញដឋឌឍ…23456789` | `@splicemood/alphabet/km-digits` | `splicemood_alphabet.km_digits` | `github.com/splicemood/alphabet/kmdigits` |
| `ka` | Georgian Mkhedruli letters | 33 | `აბგდევზთიკლმნო…ჩცძწჭხჯჰ` | `@splicemood/alphabet/ka` | `splicemood_alphabet.ka` | `github.com/splicemood/alphabet/ka` |
| `ka-digits` | Georgian Mkhedruli letters + digits | 43 | `აბგდევზთიკლმნო…23456789` | `@splicemood/alphabet/ka-digits` | `splicemood_alphabet.ka_digits` | `github.com/splicemood/alphabet/kadigits` |
| `hy` | Armenian letters | 76 | `ԱԲԳԴԵԶԷԸԹԺԻԼԽԾ…տրցւփքօֆ` | `@splicemood/alphabet/hy` | `splicemood_alphabet.hy` | `github.com/splicemood/alphabet/hy` |
| `hy-digits` | Armenian letters + digits | 86 | `ԱԲԳԴԵԶԷԸԹԺԻԼԽԾ…23456789` | `@splicemood/alphabet/hy-digits` | `splicemood_alphabet.hy_digits` | `github.com/splicemood/alphabet/hydigits` |
| `ja-hiragana` | Japanese Hiragana characters | 86 | `ぁあぃいぅうぇえぉおかがきぎ…わゐゑをんゔゕゖ` | `@splicemood/alphabet/ja-hiragana` | `splicemood_alphabet.ja_hiragana` | `github.com/splicemood/alphabet/jahiragana` |
| `ja-hiragana-digits` | Japanese Hiragana characters + digits | 96 | `ぁあぃいぅうぇえぉおかがきぎ…23456789` | `@splicemood/alphabet/ja-hiragana-digits` | `splicemood_alphabet.ja_hiragana_digits` | `github.com/splicemood/alphabet/jahiraganadigits` |
| `ja-katakana` | Japanese Katakana characters | 86 | `ァアィイゥウェエォオカガキギ…ワヰヱヲンヴヵヶ` | `@splicemood/alphabet/ja-katakana` | `splicemood_alphabet.ja_katakana` | `github.com/splicemood/alphabet/jakatakana` |
| `ja-katakana-digits` | Japanese Katakana characters + digits | 96 | `ァアィイゥウェエォオカガキギ…23456789` | `@splicemood/alphabet/ja-katakana-digits` | `splicemood_alphabet.ja_katakana_digits` | `github.com/splicemood/alphabet/jakatakanadigits` |
| `ja-kana` | Japanese Hiragana + Katakana characters | 172 | `ぁあぃいぅうぇえぉおかがきぎ…ワヰヱヲンヴヵヶ` | `@splicemood/alphabet/ja-kana` | `splicemood_alphabet.ja_kana` | `github.com/splicemood/alphabet/jakana` |
| `ja-kana-digits` | Japanese Hiragana + Katakana characters + digits | 182 | `ぁあぃいぅうぇえぉおかがきぎ…23456789` | `@splicemood/alphabet/ja-kana-digits` | `splicemood_alphabet.ja_kana_digits` | `github.com/splicemood/alphabet/jakanadigits` |
| `ko-jamo` | Korean Hangul compatibility Jamo | 51 | `ㄱㄲㄳㄴㄵㄶㄷㄸㄹㄺㄻㄼㄽㄾ…ㅜㅝㅞㅟㅠㅡㅢㅣ` | `@splicemood/alphabet/ko-jamo` | `splicemood_alphabet.ko_jamo` | `github.com/splicemood/alphabet/kojamo` |
| `ko-jamo-digits` | Korean Hangul compatibility Jamo + digits | 61 | `ㄱㄲㄳㄴㄵㄶㄷㄸㄹㄺㄻㄼㄽㄾ…23456789` | `@splicemood/alphabet/ko-jamo-digits` | `splicemood_alphabet.ko_jamo_digits` | `github.com/splicemood/alphabet/kojamodigits` |
| `ko-hangul` | Korean precomposed Hangul syllables | 11172 | `가각갂갃간갅갆갇갈갉갊갋갌갍…힜힝힞힟힠힡힢힣` | `@splicemood/alphabet/ko-hangul` | `splicemood_alphabet.ko_hangul` | `github.com/splicemood/alphabet/kohangul` |
| `ko-hangul-digits` | Korean precomposed Hangul syllables + digits | 11182 | `가각갂갃간갅갆갇갈갉갊갋갌갍…23456789` | `@splicemood/alphabet/ko-hangul-digits` | `splicemood_alphabet.ko_hangul_digits` | `github.com/splicemood/alphabet/kohanguldigits` |
| `zh-common` | CJK Unified Ideographs for Chinese-style tokens | 20992 | `一丁丂七丄丅丆万丈三上下丌不…鿸鿹鿺鿻鿼鿽鿾鿿` | `@splicemood/alphabet/zh-common` | `splicemood_alphabet.zh_common` | `github.com/splicemood/alphabet/zhcommon` |
| `zh-common-digits` | CJK Unified Ideographs for Chinese-style tokens + digits | 21002 | `一丁丂七丄丅丆万丈三上下丌不…23456789` | `@splicemood/alphabet/zh-common-digits` | `splicemood_alphabet.zh_common_digits` | `github.com/splicemood/alphabet/zhcommondigits` |
<!-- ALPHABETS_TABLE_END -->

## Source Of Truth

Edit only `data/alphabets.json` when adding or changing alphabets. Generated JS, Python and Go files are marked with `AUTO-GENERATED FILE. DO NOT EDIT.`, ignored by git, and created during build/release.

```sh
npm run generate
npm run check:generated
```

## Validation Rules

- No duplicate characters.
- No whitespace.
- No control or invisible characters.
- NFC-normalized strings only.
- No combining marks in the MVP.
- No emoji-like symbols in the MVP.
- Base equals the Unicode code point count in JS, Python and Go.

## Release

The initial version is `0.1.0` for npm, PyPI and the Go module.

Do not push release tags manually. The GitHub Actions release workflow takes a version, generates package sources, validates the repo, publishes npm and PyPI packages, creates a release-only commit with generated Go sources, tags it as `v0.1.0`, and creates a GitHub Release.

Required repository setup:

- GitHub Actions workflow permissions: read and write.
- GitHub Pages source: GitHub Actions.
- GitHub secret `NPM_TOKEN` with publish access to `@splicemood/alphabet`.
- PyPI Trusted Publishing configured for `splicemood-alphabet` and `.github/workflows/release.yml`.

Release `0.1.0` from GitHub Actions → Release → Run workflow → `version = 0.1.0`.

Local preflight:

```sh
npm run release
```

## License

MIT
