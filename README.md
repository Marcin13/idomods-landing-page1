# Landing page: zadanie rekrutacyjne

Responsywny landing page sklepu z oświetleniem, zbudowany dla firmy IdoMods w czystym HTML, CSS i JavaScript, bez frameworków i bibliotek.

**Zobacz stronę:** <https://marcin13.github.io/idomods-landing-page1/>

## Dane projektu

Wartości pochodzą z [docs/variables.md](docs/variables.md).

| Zmienna | Wartość | Opis |
| --- | --- | --- |
| `REPO` | `Marcin13/idomods-landing-page1` | Repozytorium w formacie właściciel/nazwa |
| `REPO_URL` | <https://github.com/Marcin13/idomods-landing-page1> | Adres repozytorium na GitHubie |
| `STRONA` | <https://marcin13.github.io/idomods-landing-page1/> | Opublikowana strona na GitHub Pages |
| `FIGMA` | [IdoMods rekrutacja frontend AI](https://www.figma.com/design/0IEndSXVS1EK98fLXYNnYN/IdoMods-rekrutacja-frontend-AI?node-id=0-1) | Projekt designu |
| `FOLDER` | `idomods` | Lokalny folder projektu |
| `FIRMA` | `IdoMods` | Firma prowadząca rekrutację |

> To projekt rekrutacyjny, a nie prawdziwy sklep. Linki i wyszukiwarka są nieaktywne, a strona ma ustawiony `noindex`.

## Uruchomienie

Nie trzeba niczego instalować.

1. Pobierz repozytorium:

   ```bash
   git clone https://github.com/Marcin13/idomods-landing-page1 idomods
   ```

   Możesz też pobrać repozytorium jako ZIP.

2. Otwórz plik `idomods/src/index.html` w przeglądarce.

Strona działa bezpośrednio z pliku, bez serwera i procesu budowania. Dlatego kod nie używa modułów ES ani `fetch`, a fonty i wszystkie grafiki są w repozytorium.

## Funkcje

### Nagłówek

- Po najechaniu kursorem lub przejściu klawiaturą tło zmienia się z przezroczystego na białe.
- Tekst, ikony i logo jednocześnie zmieniają kolor z białego na czarny. Przejście trwa 250 ms w obie strony.
- Poniżej 1200 px menu zwija się do panelu, który otwiera przycisk i zamyka klawisz `Esc`.

### Hero: slider

- Dwa slajdy zmieniają się automatycznie co 3 sekundy.
- Przejście to crossfade 600 ms z delikatnym skalowaniem obrazu z 1.05 do 1.0 przez 800 ms.
- Żółty pasek postępu wypełnia się liniowo i resetuje po zmianie slajdu.
- Slajdy można zmieniać strzałkami (od 1200 px) albo przesunięciem palca.
- Przycisk pauzy zatrzymuje autoplay. Slider czeka też, gdy kursor jest na lampie, fokus klawiatury jest w sekcji albo karta przeglądarki jest ukryta.

### Hero: interaktywne lampy

- Każdą z trzech lamp można włączyć i wyłączyć kliknięciem, dotknięciem lub klawiaturą.
- Światło ma kształt dopasowany do powierzchni konkretnej lampy, a włączone lampy ocieplają całą scenę.
- Lampy delikatnie unoszą się w powietrzu i reagują na ruch kursora, każda z inną głębią.

### Wartości i kafelki

- Pięć korzyści sklepu z ikonami: 5 kolumn na desktopie, 2 na tablecie i 1 na telefonie.
- Cztery kafelki: THORO, Konfigurator 3D, Katalog i SOLLUX SMART.
- Po najechaniu na kafelek obraz powiększa się o 10% w 500 ms, a czarny przycisk zmienia kolor na szary w 200 ms.

### Sekcja światła

Tło sekcji składa się z trzech niezależnych efektów, a tekst i przycisk pozostają nieruchome nad nimi.

| Warstwa | Działanie |
| --- | --- |
| Shader WebGL | Falujące złote światło liczone w czasie rzeczywistym, w płynnej pętli 24 s bez widocznego początku i końca. |
| Światło z drzwi | Miękka smuga światła rozszerza się i zwęża, jak przy powoli uchylanych drzwiach, w nieregularnym tempie. Reszta sceny zostaje w półmroku. |
| Cienie ludzi | Rozmyte sylwetki przechodzą przed drzwiami i zasłaniają część światła. Idą w obie strony z różną prędkością, w nieregularnych odstępach, zwykle pojedynczo, czasem we dwoje, i niekiedy krótko przystają. |

Gdy przeglądarka nie obsługuje WebGL, sekcja pokazuje statyczny gradient.

### Stopka

- Logo, media społecznościowe i pięć kolumn linków.
- Płatności i dostawy, nagrody, sklepy zagraniczne, informacja o VAT i dane firmy.
- Na telefonie kolumny linków są rozwijane.

## Responsywność

Układ jest budowany w podejściu mobile-first.

| Szerokość | Układ |
| --- | --- |
| od 320 px | Telefon: jedna kolumna, menu w panelu, przesuwanie slidera palcem |
| od 768 px | Tablet: dwie kolumny wartości i kafelków |
| od 1200 px | Desktop: pełne menu, strzałki slidera, układ kafelków z projektu |
| od 1440 px | Pełny opis przycisku konfiguratora |
| od 1632 px | Pełny kontener 1600 px, zgodny z projektem 1920 px |

## Dostępność

- Semantyczny HTML, landmarki, link „Przejdź do treści” i teksty alternatywne.
- Pełna obsługa klawiatury z widocznym fokusem. Lampy są przyciskami z informacją o stanie.
- Kontrast tekstu sprawdzony na faktycznych obrazach tła.
- Przy systemowym ograniczeniu ruchu:
  - slider nie startuje automatycznie,
  - lampy nie unoszą się ani nie śledzą kursora,
  - shader i światło z drzwi pokazują statyczny kadr z lekko uchylonymi drzwiami,
  - cienie ludzi są wyłączone.

## Wydajność

- Brak zewnętrznych bibliotek, fontów i żądań do innych serwisów.
- Zdjęcia w WebP, ikony w SVG i leniwe ładowanie obrazów poniżej pierwszego ekranu.
- Animacje CSS używają `transform` i `opacity`. Jedyny wyjątek to płynna zmiana koloru tekstu w nagłówku, wymagana przez projekt.
- Maska światła jest liczona w bardzo małej rozdzielczości, do 30 razy na sekundę.
- Animacje zatrzymują się, gdy ich sekcja jest poza ekranem lub karta jest ukryta.

## Technologie

- HTML5, CSS3 z tokenami w zmiennych CSS i JavaScript bez modułów.
- WebGL i Canvas 2D do efektów światła.
- GitHub Actions i GitHub Pages do publikacji.

## Struktura projektu

```text
.
├── src/
│   ├── index.html            Strona
│   ├── css/
│   │   ├── tokens.css        Kolory, fonty, odstępy i parametry ruchu
│   │   ├── fonts.css         Lokalne fonty
│   │   ├── reset.css         Reset stylów
│   │   ├── layout.css        Układ strony
│   │   ├── components.css    Przyciski i elementy wspólne
│   │   └── sections/         Osobny plik CSS dla każdej sekcji
│   ├── js/
│   │   ├── main.js           Nieaktywne linki i formularz
│   │   ├── header.js         Menu mobilne
│   │   ├── slider.js         Slider
│   │   ├── lamps.js          Interaktywne lampy
│   │   ├── shader.js         Shader WebGL
│   │   ├── door-light.js     Światło z drzwi
│   │   ├── door-people.js    Cienie ludzi
│   │   └── footer.js         Rozwijana stopka
│   └── assets/               Fonty, ikony, logotypy, flagi i obrazy
├── docs/                     Specyfikacja, zadania, komentarze i raporty
├── .github/workflows/        Publikacja na GitHub Pages
├── AGENTS.md                 Wspólne zasady dla agentów AI
└── CLAUDE.md                 Instrukcje dla Claude'a
```

## Dokumentacja

| Plik | Zawartość |
| --- | --- |
| [docs/variables.md](docs/variables.md) | Stałe projektu |
| [docs/design-spec.md](docs/design-spec.md) | Specyfikacja designu i decyzje odbiegające od Figmy |
| [docs/figma-comments.md](docs/figma-comments.md) | Wytyczne z pliku Figma |
| [docs/tasks.md](docs/tasks.md) | Lista zadań |
| [docs/review.md](docs/review.md) | Raport z przeglądu kodu i testów |
| [docs/docs-review.md](docs/docs-review.md) | Raport z przeglądu dokumentacji |

## Publikacja

Każdy push na gałąź `main` publikuje folder `src` przez GitHub Actions pod adresem <https://marcin13.github.io/idomods-landing-page1/>.

Przy nowej kopii repozytorium trzeba raz wybrać **Settings → Pages → Source: GitHub Actions**.

## Stan testów

Stronę sprawdzono automatycznie w przeglądarce Chromium przy szerokościach od 320 do 1920 px: układ, brak poziomego scrolla, błędy konsoli, kontrast, dostępność (axe) i tryb ograniczenia ruchu. Testów w Firefoksie, Safari, na fizycznych telefonach ani audytu Lighthouse jeszcze nie wykonano.
