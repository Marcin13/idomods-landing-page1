# Zasady dla agentów

> **Stałe projektu są w [docs/variables.md](docs/variables.md). Każdy agent czyta ten plik na starcie.**
> W pozostałych plikach używaj nazw zmiennych (np. `STRONA`) i nie przepisuj wartości.

## Kontekst

To zadanie rekrutacyjne dla firmy `FIRMA`. Rekruter oczekuje:

- prostego stacku,
- możliwości uruchomienia na każdym komputerze,
- instrukcji w `README.md`,
- pełnych logów rozmów z AI, bez sekretów.

## Stack i zasady

- Czysty HTML, CSS i JavaScript, bez frameworków.
- Kod jest w `src/` i działa po otwarciu `src/index.html`, bez serwera i budowania. Dlatego nie używamy modułów ES ani `fetch` do plików lokalnych.
- Mobile-first.
- Kolory i fonty pochodzą wyłącznie z `src/css/tokens.css`.
- Każda sekcja ma własny plik: `src/css/sections/<sekcja>.css`.
- Semantyczny HTML, dostępność i brak poziomego scrolla na telefonie.
- Deploy przez GitHub Actions na GitHub Pages pod adres `STRONA`.
- Commity w stylu Conventional Commits, osobno dla każdej sekcji, np. `feat(hero): add hero section`.
- Nigdy nie commitujemy sekretów.

## Role

| Agent | Zakres | Może zapisywać |
| --- | --- | --- |
| **Claude** | Jedyny agent, który zmienia kod i dokumentację. Wykonuje punkty z raportów. | Całe repozytorium |
| **Codex** | Sprawdza kod i robi testy: zgodność z `FIGMA`, wygląd na telefonie, tablecie i desktopie, dostępność, walidacja, Lighthouse. | Tylko `docs/review.md` |
| **Copilot** | Sprawdza, czy dokumentacja zgadza się z repozytorium: ścieżki, instrukcja uruchomienia, linki oraz wartości względem `docs/variables.md`. | Tylko `docs/docs-review.md` |

## Format raportów

`docs/review.md` i `docs/docs-review.md` mają ten sam układ:

- **P1**: blokujące,
- **P2**: ważne,
- **P3**: kosmetyka.

Każdy punkt ma checkbox, nazwę pliku, opis problemu i konkretne polecenie dla Claude'a.

Przykład:

```markdown
## P1 — blokujące

- [ ] `src/css/sections/hero.css`
  - **Problem:** przy szerokości 320 px obraz wychodzi poza ekran i powoduje poziomy scroll.
  - **Polecenie dla Claude'a:** dodaj `max-width: 100%` i `height: auto` do `.hero__image`.
```
