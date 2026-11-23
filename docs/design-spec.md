# Specyfikacja designu

Źródło: plik `FIGMA` (adres w [variables.md](variables.md)), ramka `Landingp page`, `node-id=1-505`, szerokość 1920 px. Odnośnik do ramki to adres `FIGMA` z podanym `node-id`. Oznaczenia `N-…` i `K-…` prowadzą do [figma-comments.md](figma-comments.md).

Wartości oznaczone **(propozycja)** nie występują w Figmie. Wartości oznaczone **≈** odczytano z obrazu.

## 1. Kolory

| Token | Wartość | Użycie |
| --- | --- | --- |
| `--color-white` | `#ffffff` | Tła sekcji, tekst na ciemnym tle, nagłówek na hover (N-02.2) |
| `--color-ink` | `#101011` | Nagłówki, czarne przyciski, „czarny” z komentarzy **(propozycja)** |
| `--color-text` | `#1e1e1e` | Tekst, linki stopki, tekst na żółtym przycisku |
| `--color-accent` | `#f2bf25` | Przycisk główny, aktywny pasek postępu |
| `--color-button-hover` | `#4a4a4a` | Czarny przycisk na hover kafelka (N-05.5) |
| `--color-border` | `#e7e7e7` | Obramowania, linie w stopce, wyszukiwarka |
| `--color-tile-blue` | `#72a3f3` | Kafelek Konfigurator |
| `--color-tile-cream` | `#fdf8eb` | Kafelek Katalog |
| `--color-tile-sand` | `#e8e4df` | Kafelek SOLLUX SMART |
| `--color-overlay-20` | `rgb(16 16 17 / .2)` | Strzałki slidera |
| `--color-overlay-40` | `rgb(16 16 17 / .4)` | Plakietka oceny |
| `--color-track` | `rgb(231 231 231 / .5)` | Nieaktywny pasek postępu |
| `--color-shader-base` | ≈ `#111111` | Tło sekcji shader i jej wersja zapasowa |

## 2. Typografia

Font strony: **Red Hat Display**, grubości 500 i 700. Inter występuje tylko w ramkach z instrukcjami i nie trafia na stronę.

| Rola | Rozmiar / wysokość linii | Grubość |
| --- | --- | --- |
| Tytuł hero | 56 / 56 px | 700 |
| Tytuł sekcji shader | ≈ 56 / 56 px | 700 |
| Tytuł kafelka | 32 / 35,2 px | 700 |
| Nadtytuł kafelka, wartość, ocena | 21 / 23,1 px | 700 |
| Przycisk | 16 / 19,2 px | 700 |
| Nadtytuł hero | 16 / 19,2 px | 500 |
| Tekst pod przyciskiem shader | ≈ 16 / 19,2 px | 500 |
| Menu, wyszukiwarka | 14 / 16,8 px | 700 |
| Opis wartości | 14 / 16,8 px | 500 |
| Nagłówek stopki, „Stwórz swoją lampę” | 13 / 14,3 px | 700 |
| Link stopki, opis oceny | 13 / 14,3 px | 500 |
| Dane firmy, informacja o VAT | 12 / 13,2 px | 500 |

## 3. Odstępy

Skala: `4, 8, 12, 16, 24, 32, 48, 64, 96 px`.

Wartości lokalne z projektu: `2` (flagi, ikony społecznościowe), `14` (linki stopki), `38` (hero), `86` (pion sekcji wartości).

## 4. Zaokrąglenia

| Token | Wartość | Użycie |
| --- | --- | --- |
| `--radius-xs` | 2 px | Plakietka IdoSell |
| `--radius-sm` | 4 px | Logotypy płatności |
| `--radius-lg` | 24 px | Kafelki |
| `--radius-pill` | 100 px | Przyciski, wyszukiwarka, plakietka oceny, flagi |

## 5. Cienie

W projekcie nie ma żadnych efektów cienia.

## 6. Breakpointy i kontener

Figma zawiera tylko widok 1920 px, więc breakpointy są **(propozycją)**.

| Nazwa | Od szerokości | Układ |
| --- | --- | --- |
| Telefon | 320 px | Baza mobile-first, jedna kolumna |
| Tablet | 768 px | Wartości i kafelki w 2 kolumnach |
| Desktop | 1200 px | Pełne menu, kafelki 2 × 2 w proporcjach z Figmy |
| Szeroki | 1632 px | Pełny kontener i pełna wyszukiwarka |

Kontener: `max-width: 1600px`, margines boczny 16 px.

## 7. Ruch

| Token | Wartość | Źródło |
| --- | --- | --- |
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | N-01.2 |
| `--ease-out` | `ease-out` | N-01.2 |
| `--duration-hover` | 250 ms | N-01.1, N-02.2 |
| `--duration-button` | 200 ms | N-05.5 |
| `--duration-fade` | 600 ms | N-04.2 |
| `--duration-zoom` | 800 ms | N-04.3 |
| `--duration-tile` | 500 ms | N-05.4 |
| `--slide-delay` | 3 s | N-04.1, N-04.2 |

Animujemy tylko `transform` i `opacity` (N-01.3). Zmiany tła robimy przez nakładkę z `opacity`. Jedyny wyjątek to `color` w nagłówku, bo N-02.3 wymaga płynnej zmiany tekstu i ikon z białego na czarny.

## 8. Sekcje strony

### 8.1 Nagłówek (`node-id=1-533`)

- **Układ:** pasek 84 px nad hero, przezroczysty, w kontenerze. Logo, 6 linków, wyszukiwarka 370 × 52 px, „Stwórz swoją lampę”, konto, koszyk. Odstęp grup 64 px, linków 32 px.
- **Elementy:** Lampy, Kolory i Pomieszczenia ze strzałką, oraz Nowości, Bestsellery i Promocje. Pole „Czego szukasz?”.
- **Stany:** na hover tło przezroczyste → białe, a tekst, ikony i logo białe → czarne, 250 ms, ease-in-out, także przy powrocie (N-02.1 do N-02.4).
- **Telefon (propozycja):** logo, koszyk i przycisk menu. Linki i wyszukiwarka w panelu. Poniżej 1200 px menu jest zwinięte.

### 8.2 Hero ze sliderem i lampami (`node-id=1-506`)

- **Układ:** 1920 × 1080 px. Tekst po lewej, wyśrodkowany w pionie. Strzałki 48 px przy krawędziach, pasek postępu 2 × 64 px na dole, plakietka oceny w prawym dolnym rogu.
- **Elementy:** „Bestsellery SOLLUX”, „Kolor i forma w nowym świetle”, przycisk „Sprawdź bestsellery”, ocena „4.8”, „Uwielbiany przez klientów”.
- **Slajdy:** `hero-slide-1.webp` (lampy, `1-506`) i `hero-slide-2.webp` (wnętrze, `1-1005`).
- **Lampy:** osobne wycięcia `hero-lamp-1`, `-2`, `-3` (`1-1004`, `1-1003`, `1-1002`). Animacja jest dowolna, np. włączanie kliknięciem i ruch za kursorem (N-03.1, N-03.2).
- **Tło:** `hero-slide-1.webp` to fotografia z Figmy z usuniętymi lampami i ich cieniem, dzięki czemu wycięcia mogą się swobodnie poruszać.
- **Stany slidera:** autoplay co 3 s, crossfade 600 ms, obraz 1.05 → 1.0 przez 800 ms, żółty pasek wypełnia się liniowo przez 3 s i resetuje po zmianie slajdu (N-04.1 do N-04.4).
- **Telefon (propozycja):** wysokość ok. 100svh, tytuł 36 px, strzałki ukryte, przesuwanie palcem. Lampy reagują na dotknięcie.

### 8.3 Wartości (`node-id=1-595`)

- **Układ:** 5 kolumn, odstęp 32 px, padding 16 px, ikona 32 px, odstęp ikona–tekst 24 px. Sekcja ma 86 px paddingu w pionie.
- **Elementy:** Zwroty nawet do 100 dni / szybkie i proste, 5 lat gwarancji / na wszystkie produkty, Darmowa dostawa / już za 299 zł, Polskie produkty / sprawdzona jakość, Oficjalny sklep producenta / gwarancja satysfakcji.
- **Stany:** brak.
- **Telefon (propozycja):** 1 kolumna z ikoną po lewej, od 768 px 2 kolumny, od 1200 px 5 kolumn.

### 8.4 Kafelki (`node-id=1-631`)

- **Układ:** 2 rzędy po 518 px, odstęp 16 px, promień 24 px, tekst w lewym dolnym rogu z paddingiem 48 px. Rząd 1: 648 + 936 px. Rząd 2: 936 + 648 px.
- **Elementy:**

| Kafelek | Ramka | Nadtytuł | Tytuł | Przycisk | Obraz |
| --- | --- | --- | --- | --- | --- |
| THORO | `1-633` | Marka THORO | Poznaj lampy premium | Odwiedź sklep THORO | `tile-thoro` |
| Konfigurator | `1-640` | Konfigurator 3D | Wybierz projekt i dostosuj go do swojego wnętrza | Stwórz swój projekt | `tile-configurator` |
| Katalog | `1-670` | Katalog | Odkryj najnowszy katalog | Sprawdź katalog | `tile-catalog` |
| SOLLUX SMART | `1-680` | SOLLUX SMART | Przymierz lampę w aplikacji | Pobierz aplikacje na telefon | `tile-smart-phone-1`, `-2` |

- **Stany:** na hover pojedynczego kafelka obraz 1 → 1.1, 500 ms, ease-out, z `overflow: hidden`. Przycisk czarny → `#4A4A4A`, 200 ms, ease-in-out (N-05.1 do N-05.5).
- **Telefon (propozycja):** 1 kolumna, wysokość ok. 440 px, padding 24 px, tytuł 24 px. Na urządzeniach dotykowych bez efektu hover.

### 8.5 Sekcja shader (`node-id=1-707`)

- **Układ:** pełna szerokość, 1920 × 835 px, treść wyśrodkowana.
- **Elementy:** „Twoje wnętrze zasługuje na wyjątkowe światło”, przycisk „Kup teraz”, „Od 119 zł na oficjalnej stronie producenta SOLLUX”. W Figmie ten tekst jest częścią obrazu, więc rozmiary są przybliżone.
- **Animacja:** WebGL w czasie rzeczywistym, nieskończona pętla bez cięć, cykl 20–30 s, ruch falujący, czerń i żółć. Tekst i przycisk są statyczne, nad animacją (N-06.1 do N-06.6).
- **Światło z drzwi:** osobna warstwa `src/js/door-light.js` nad shaderem. Smuga rozszerza się i zwęża powoli, w nieregularnym tempie, z miękkim półcieniem. Przy ograniczeniu ruchu pokazuje statyczny kadr z lekko uchylonymi drzwiami.
- **Cienie ludzi:** `src/js/door-people.js` dodaje rozmyte sylwetki, które zasłaniają część smugi. Mają różne tempo i nieregularne odstępy, czasem idą we dwoje i krótko przystają. Przy ograniczeniu ruchu są wyłączone.
- **Stany:** przycisk na hover **(propozycja)**: rozjaśnienie przez nakładkę, 200 ms.
- **Telefon (propozycja):** wysokość ok. 560 px, tytuł 32 px, niższa rozdzielczość renderowania.
- **Wersja zapasowa (propozycja):** statyczny gradient, gdy nie ma WebGL lub włączono ograniczenie ruchu.

### 8.6 Stopka (`node-id=1-708`)

- **Układ:** trzy części. Góra: logo, 4 ikony społecznościowe i 5 kolumn linków. Środek: płatności, nagrody, sklepy w 3 kolumnach po 512 px z liniami. Dół: informacja o VAT, plakietki, dane firmy.
- **Kolumny:**
  - Moje zamówienia: Status zamówienia, Śledzenie przesyłki, Chcę zareklamować produkt, Informacje o wymianie, Kontakt.
  - Moje konto: Zarejestruj się, Koszyk, Listy zakupowe, Lista zakupionych produktów, Historia transakcji, Moje rabaty.
  - Regulaminy: Sposoby wysyłki, Sposoby płatności, Regulamin sklepu, Polityka prywatności, Polityka bezpieczeństwa, Zmień ustawienia ciasteczek.
  - Informacje: O nas, FAQ, Kurs światła, Inspiracje, Marka premium, Gwarancja, Konfigurator 3D.
  - Współpraca: Dla Architekta, Modele 3D, Dystrybucja.
- **Dół:** „W sklepie prezentujemy ceny brutto (z VAT). Stawki VAT dla konsumentów z kraju: Polska.” oraz dane firmy z ramki `1-990`.
- **Stany (propozycja):** podkreślenie linku na hover i focus.
- **Telefon (propozycja):** kolumny jako rozwijane `details`, części środkowe jedna pod drugą.

## 9. Zasoby w `src/assets`

| Folder | Liczba | Zawartość |
| --- | --- | --- |
| `icons/` | 17 | Ikony SVG |
| `logos/` | 4 | Logo jasne i ciemne, plakietki stopki, SVG |
| `flags/` | 8 | PL, DE, ES, RO, FR, GB, NL, SE, SVG |
| `images/` | 10 | Slajdy, lampy, obrazy kafelków, WebP |
| `payments/` | 10 | Płatności i dostawcy, WebP |
| `awards/` | 6 | Nagrody, WebP |
| `fonts/` | 4 | Red Hat Display 500 i 700, WOFF2 |

## 10. Decyzje odbiegające od Figmy

- Tekst na niebieskim kafelku jest czarny, bo biały miał kontrast 2,55:1.
- Hero i kafelek THORO mają przyciemnienie pod tekstem, aby spełnić wymagania kontrastu.
- Drugi slajd używa tego samego tekstu i przycisku co pierwszy.
- Cykl slidera trwa 3 s razem z przejściem.
- Poprawiono literówki „Wpsółpraca” i „Pobierz aplikacje”.
- Slider ma dodatkowy przycisk pauzy, wymagany przez dostępność.
- Linki są nieaktywne, strona ma `noindex`, a stopka informuje, że to projekt rekrutacyjny.
