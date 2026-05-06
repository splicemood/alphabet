// AUTO-GENERATED FILE. DO NOT EDIT.

package kycyrillicdigits

import "testing"

func TestAlphabetBase(t *testing.T) {
	runes := []rune(Alphabet)
	if len(runes) != Base {
		t.Fatalf("len([]rune(Alphabet)) = %d, want %d", len(runes), Base)
	}
}

func TestAlphabetUnique(t *testing.T) {
	seen := make(map[rune]bool, Base)
	for _, value := range Alphabet {
		if seen[value] {
			t.Fatalf("duplicate rune %q", value)
		}
		seen[value] = true
	}
}
