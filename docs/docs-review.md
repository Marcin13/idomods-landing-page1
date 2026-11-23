# Przegląd dokumentacji

Przegląd przeprowadzono 23.11.2026. Sprawdzono pliki markdown, odwołania do ścieżek i wymagane artefakty w repozytorium. `AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md`, `docs/variables.md`, `docs/tasks.md`, `docs/design-spec.md` i `docs/figma-comments.md` są zgodne co do ról, stałych i odwołań.

## P1 — blokujące

- [x] `README.md`
  - **Problem:** wymagany plik z instrukcją uruchomienia nie istnieje, mimo że `AGENTS.md` wyraźnie wskazuje `README.md` jako element oczekiwany przez rekruter.
  - **Polecenie dla Claude'a:** utwórz `README.md` z instrukcją uruchomienia strony przez otwarcie `src/index.html`, opisem czystego stosu HTML/CSS/JavaScript oraz informacją o braku serwera, modułów ES i procesu budowania.
  - **Zmiana:** Utworzyłem `README.md` z instrukcją uruchomienia, opisem stacku, strukturą projektu i zasadami publikacji.

## P2 — ważne

- [ ] `docs/review.md`
  - **Problem:** zdanie „W katalogu nie ma jeszcze kodu strony” jest zbyt ogólne, ponieważ repozytorium zawiera już zasoby w `src/assets/` i jedynie brakuje plików implementacji strony.
  - **Polecenie dla Claude'a:** doprecyzuj wstęp raportu, że istnieją zasoby `src/assets/`, natomiast brak `src/index.html`, plików CSS i JavaScript oraz workflow `.github/workflows/`; po implementacji uzupełnij wyniki testów zgodności z `FIGMA`, responsywności, dostępności, walidacji i Lighthouse.
  - **Nie wykonano:** Nie zmieniam wstępu ani wyników w `docs/review.md`, bo według `AGENTS.md` ten raport prowadzi Codex, więc to on powinien powtórzyć testy na gotowej stronie.

## P3 — kosmetyka

Brak dodatkowych rozbieżności dokumentacyjnych. Nazwy `REPO`, `REPO_URL`, `STRONA`, `FIGMA`, `FOLDER` i `FIRMA` są zdefiniowane jednoznacznie w `docs/variables.md`; dokumenty odwołują się do nich przez nazwy, bez sprzecznych wartości. Liczebności zasobów opisane w `docs/design-spec.md` zgadzają się z katalogiem `src/assets/`.
