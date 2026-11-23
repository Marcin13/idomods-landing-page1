# Lista zadań

Kolejność jest kolejnością realizacji. Źródła: `N-…` i `K-…` z [figma-comments.md](figma-comments.md), `§` z [design-spec.md](design-spec.md), `AGENTS` z [AGENTS.md](../AGENTS.md).

## Fundamenty

- [x] **T-01** Szkielet `src/index.html` z landmarkami i `lang="pl"`. Sekcja: strona. Źródło: AGENTS.
- [x] **T-02** Tokeny kolorów, typografii, odstępów, promieni i ruchu w `src/css/tokens.css`. Sekcja: strona. Źródło: §1–§7, N-01.1, N-01.2.
- [x] **T-03** Lokalne fonty Red Hat Display 500 i 700 z polskimi znakami. Sekcja: strona. Źródło: §2, AGENTS.
- [x] **T-04** Reset i style bazowe. Sekcja: strona. Źródło: AGENTS.
- [x] **T-05** Układ strony: kontener 1600 px, marginesy, breakpointy. Sekcja: strona. Źródło: §6.
- [x] **T-06** Wspólne przyciski i linki z animacją tylko `transform` i `opacity`. Sekcja: strona. Źródło: N-01.1, N-01.2, N-01.3.
- [x] **T-07** Workflow GitHub Actions publikujący `src/` na GitHub Pages pod `STRONA`. Sekcja: projekt. Źródło: AGENTS, `docs/review.md`.
- [x] **T-08** `README.md` z instrukcją uruchomienia. Sekcja: projekt. Źródło: AGENTS.

## Nagłówek

- [x] **T-09** Struktura i style: logo, menu, wyszukiwarka, akcje. Sekcja: nagłówek. Źródło: §8.1.
- [x] **T-10** Hover: tło przezroczyste → białe, 250 ms, ease-in-out. Sekcja: nagłówek. Źródło: N-02.1, N-02.2.
- [x] **T-11** Hover: tekst, ikony i logo białe → czarne, jednocześnie z tłem. Sekcja: nagłówek. Źródło: N-02.1, N-02.3.
- [x] **T-12** Powrót po zjechaniu kursorem, 250 ms. Sekcja: nagłówek. Źródło: N-02.4.

## Hero

- [x] **T-13** Układ hero: tekst, przycisk, strzałki, pasek postępu, ocena. Sekcja: hero. Źródło: §8.2.
- [x] **T-14** Slider: autoplay co 3 s i crossfade 600 ms. Sekcja: hero. Źródło: N-04.1, N-04.2.
- [x] **T-15** Skala obrazu 1.05 → 1.0, 800 ms, ease-out. Sekcja: hero. Źródło: N-04.3.
- [x] **T-16** Żółty pasek postępu: liniowo 3 s, reset po zmianie slajdu. Sekcja: hero. Źródło: N-04.4.
- [x] **T-17** Obsługa strzałek z resetem odliczania. Sekcja: hero. Źródło: §8.2.
- [x] **T-18** Przygotowanie tła slajdu 1 pod ruchome lampy (zależy od pytania 1). Sekcja: hero. Źródło: N-03.1, §8.2.
- [x] **T-19** Lampy: włączanie kliknięciem. Sekcja: hero. Źródło: N-03.1, N-03.2.
- [x] **T-20** Lampy: ruch za kursorem. Sekcja: hero. Źródło: N-03.1, N-03.2.

## Wartości

- [x] **T-21** Pięć wartości z ikonami. Sekcja: wartości. Źródło: §8.3.

## Kafelki

- [x] **T-22** Siatka czterech kafelków z treścią i obrazami. Sekcja: kafelki. Źródło: §8.4.
- [x] **T-23** Hover: obraz 1 → 1.1, 500 ms, ease-out, `overflow: hidden`. Sekcja: kafelki. Źródło: N-05.1, N-05.2, N-05.4.
- [x] **T-24** Hover: przycisk czarny → `#4A4A4A`, 200 ms, ease-in-out. Sekcja: kafelki. Źródło: N-05.1, N-05.3, N-05.5.

## Sekcja shader

- [x] **T-25** Statyczna treść HTML nad animacją. Sekcja: shader. Źródło: N-06.6, §8.5.
- [x] **T-26** Shader WebGL bez bibliotek, oparty na szumie. Sekcja: shader. Źródło: N-06.1, N-06.5.
- [x] **T-27** Płynna, nieskończona pętla, cykl 20–30 s. Sekcja: shader. Źródło: N-06.2, N-06.3, N-06.4.
- [x] **T-28** Wersja zapasowa i pauza poza ekranem. Sekcja: shader. Źródło: §8.5.

## Stopka

- [x] **T-29** Logo, ikony społecznościowe i kolumny linków. Sekcja: stopka. Źródło: §8.6.
- [x] **T-30** Płatności, nagrody i sklepy. Sekcja: stopka. Źródło: §8.6, §9.
- [x] **T-31** Informacja o VAT, plakietki i dane firmy. Sekcja: stopka. Źródło: §8.6.

## Dostępność

- [x] **T-32** Pełna obsługa klawiatury i widoczny focus, także dla stanu menu. Sekcja: strona. Źródło: AGENTS, N-02.1.
- [x] **T-33** Przycisk pauzy slidera i pauza przy focusie. Sekcja: hero. Źródło: AGENTS, N-04.2.
- [x] **T-34** Lampy jako przyciski z `aria-pressed` i opisem. Sekcja: hero. Źródło: AGENTS, N-03.2.
- [x] **T-35** Obsługa `prefers-reduced-motion` we wszystkich animacjach. Sekcja: strona. Źródło: AGENTS, N-01.1.
- [x] **T-36** Teksty `alt` i etykiety ikon. Sekcja: strona. Źródło: AGENTS.
- [x] **T-37** Kontrast tekstu na hero i kafelkach (zależy od pytania 3). Sekcja: hero, kafelki. Źródło: AGENTS, §1.

## Wersja mobilna

- [x] **T-38** Menu mobilne z panelem. Sekcja: nagłówek. Źródło: §8.1.
- [x] **T-39** Hero na telefonie: przesuwanie palcem, lampy na dotyk. Sekcja: hero. Źródło: §8.2, N-03.2.
- [x] **T-40** Wartości i kafelki w układzie mobilnym i tabletowym. Sekcja: wartości, kafelki. Źródło: §8.3, §8.4.
- [x] **T-41** Lżejszy shader na telefonie. Sekcja: shader. Źródło: §8.5.
- [x] **T-42** Stopka z rozwijanymi kolumnami. Sekcja: stopka. Źródło: §8.6.
- [x] **T-43** Kontrola braku poziomego scrolla od 320 px. Sekcja: strona. Źródło: AGENTS.
