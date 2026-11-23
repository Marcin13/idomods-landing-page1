# Przegląd projektu

Przegląd lokalnego katalogu: 23.11.2026. W katalogu nie ma jeszcze kodu strony. Nie można więc ocenić zgodności z `FIGMA` ani wykonać testów wyglądu na telefonie, tablecie i desktopie, dostępności, walidacji HTML i Lighthouse. Testy należy wykonać po wdrożeniu strony.

## P1 — blokujące

- [x] `src/index.html`
  - **Problem:** plik i cały katalog `src/` nie istnieją, więc strony nie można uruchomić ani ocenić.
  - **Polecenie dla Claude'a:** zaimplementuj stronę zgodnie z `FIGMA` w czystym HTML, CSS i JavaScript, tak aby działała po bezpośrednim otwarciu `src/index.html`; zachowaj zasady dotyczące dostępności, responsywności, tokenów i plików sekcji z `AGENTS.md`.
  - **Zmiana:** Zbudowałem całą stronę w `src/` z tokenami, osobnym CSS dla każdej sekcji i działaniem po otwarciu pliku bez serwera.

- [x] `.github/workflows/`
  - **Problem:** brak workflow GitHub Actions publikującego stronę na GitHub Pages, wymaganego przez `AGENTS.md`.
  - **Polecenie dla Claude'a:** dodaj workflow publikujący gotową zawartość `src/` na GitHub Pages pod adresem `STRONA` i sprawdź poprawność wdrożenia.
  - **Zmiana:** Dodałem `.github/workflows/deploy.yml`, a wdrożenie zakończyło się sukcesem i strona działa pod adresem `STRONA`.

## P2 — ważne

Brak dodatkowych ustaleń możliwych do zweryfikowania bez kodu strony.

## P3 — kosmetyka

Brak ustaleń.
