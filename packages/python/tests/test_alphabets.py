import importlib
import json
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[3]
PACKAGE_SRC = REPO_ROOT / "packages" / "python" / "src"
sys.path.insert(0, str(PACKAGE_SRC))


def load_alphabets():
    return json.loads((REPO_ROOT / "data" / "alphabets.json").read_text(encoding="utf-8"))


def test_python_modules_expose_alphabet_and_base():
    for definition in load_alphabets().values():
        module = importlib.import_module(f"splicemood_alphabet.{definition['pythonModule']}")
        chars = list(definition["alphabet"])

        assert module.alphabet == definition["alphabet"]
        assert module.base == len(chars)
        assert len(set(chars)) == len(chars)
