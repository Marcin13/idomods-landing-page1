# Landing page: zadanie rekrutacyjne

Landing page zbudowany w czystym HTML, CSS i JavaScript dla firmy `FIRMA`. Adresy projektu są w [docs/variables.md](docs/variables.md): repozytorium to `REPO_URL`, opublikowana strona to `STRONA`, a projekt graficzny to `FIGMA`.

To projekt rekrutacyjny, a nie prawdziwy sklep. Linki i wyszukiwarka są nieaktywne.

## Uruchomienie

1. Pobierz repozytorium.
2. Otwórz plik `src/index.html` w przeglądarce.

Nie trzeba niczego instalować. Projekt nie używa serwera, procesu budowania, frameworków ani modułów ES.

## Struktura

| Ścieżka | Zawartość |
| --- | --- |
| `src/index.html` | Strona |
| `src/css/tokens.css` | Kolory, fonty, odstępy i parametry ruchu |
| `src/css/sections/` | Osobny plik CSS dla każdej sekcji |
| `src/js/` | Menu, slider, lampy, shader WebGL i stopka |
| `src/assets/` | Fonty, ikony SVG i obrazy WebP |
| `docs/` | Specyfikacja, komentarze z projektu, zadania i raporty |
| `.github/workflows/deploy.yml` | Publikacja na GitHub Pages |

## Interakcje

- Kliknij lampę w hero, aby ją włączyć. Lampy reagują też na ruch kursora.
- Slider zmienia slajdy co 3 sekundy i można go zatrzymać przyciskiem pauzy.
- Tło sekcji z hasłem to shader WebGL działający w płynnej, nieskończonej pętli.
- Strona respektuje systemowe ustawienie ograniczenia ruchu.

## Publikacja

Każdy push na gałąź `main` publikuje folder `src` przez GitHub Actions. W ustawieniach repozytorium trzeba raz wybrać **Settings → Pages → Source: GitHub Actions**.
