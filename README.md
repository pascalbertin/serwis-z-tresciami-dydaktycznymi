
<div align="center">
  <a href="https://serwis-z-tresciami.herokuapp.com/">
    <img src="client\public\TutorsAlphaLogo.png" alt="Logo">
  </a>

  <h3 align="center">Projekt inżynierski</h3>

  <p align="center">
    Serwis z treściami - Tutors Alpha.
    <br />Promotor: dr Rafał Witkowski
    <br />
    <br />
    <br />
    <a href="https://github.com/pascalbertin">Pascal Bertin</a>
    ·
    <a href="https://github.com/JakubStyszynski">Jakub Styszyński</a>
    ·
    <a href="https://github.com/Seuch">Sebastian Smołuch</a>
    ·
    <a href="https://github.com/The-Same-One">Łukasz Traskowski</a>
  </p>
  <br />
</div>

<details>
  <summary>Spis treści</summary>
  <ol>
    <li>
      <a href="#Trochę-informacji-o-projekcie">O projekcie</a>
      <ul>
        <li><a href="#Stack-technologiczny">Wykorzystane technologie</a></li>
      </ul>
    </li>
    <li>
      <a href="#Uruchomienie-aplikacji-lokalnie">Uruchomienie lokalnie</a>
      <ul>
        <li><a href="#Wymagania">Wymagania</a></li>
        <li><a href="#Instalacja">Instalacja</a></li>
      </ul>
    </li>
  </ol>
</details>


## Trochę informacji o projekcie
<div align="center">
  <a href="https://serwis-z-tresciami.herokuapp.com/">
    <img src="client\public\homePageScreenshot.png" alt="Home Page">
  </a>
</div>

Projekt ma na celu stworzenie aplikacji webowej, umożliwiającej użytkownikom zakup, oraz publikację kursów do nauki zdalnej w postaci plików wideo. Projekt jest realizowany na zlecenia dr. Rafała Witkowskiego.

Głównym produktem projektu będzie aplikacja webowa. Decyzja ta została podjęta ze względu na zalety po stronie użytkownika takie jak łatwość i komfort obsługi przy dłuższym użytkowaniu a także możliwości po stronie produkcji.


Tworzona przez nas aplikacja ma za zadanie odpowiadać na następujące problemy:
* Konieczność podawania zbyt wielu danych osobowych przy zakupie kursu
* Mała różnorodność kursów dla młodszych uczniów
* Większość kursów online dotyczy matematyki oraz informatyki

W odpowiedzi na te problemy, nasza aplikacja będzie umożliwiała użytkownikom zakup kursu bez konieczności zakładania konta. Na podany przy zakupie adres email wysyłany będzie kod pozwalający na 3- krotny dostęp do wybranego kursu. W ofercie sklepu dostępne będą kursy dla uczniów klas 1-8 szkoły podstawowej oraz 1-5 technikum/ liceum. Będą one podzielone na kategorie odpowiadające poziomowi edukacji oraz przedmiotowi.

### Stack technologiczny

Cała aplikacja została napisana w oparciu o stack technologiczny MERN, co odpowiada kolejno:

* [![MongoDB][MongoDB]][MongoDB]
* [![Express][Express.js]][Express.js]
* [![React][React.js]][React-url]
* [![NodeJS][NodeJS]][NodeJS]

## Uruchomienie aplikacji lokalnie

Poniżej opisane są kroki, które należy wykonać aby uruchomić aplikację lokalnie na swoim komputerze.

### Wymagania

Do instalacji rozszerzeń będzie nam potrzebny npm
* npm
  ```sh
  npm install npm@latest -g
  ```

### Instalacja

_Poniżej znajduje się lista króków_

1. Pobierz repozytorium
   ```sh
   git clone https://github.com/pascalbertin/serwis-z-tresciami-dydaktycznymi.git
   ```
2. W głównym folderze uruchom konsolę i zainstaluj backendowe rozszerzenia komendą poniżej
   ```sh
   npm install
   ```
3. Przejdź do folderu "client" i powtórz krok numer 2
   ```sh
   npm install
   ```
4. Następnie uruchom serwer poprzez komendę
   ```sh
   nodemon ./server.js
   ```
5. Przejdź ponownie do folderu "client" i w drugim terminalu uruchom komendę
   ```sh
   npm run start
   ```
6. Gratulacje, możesz teraz korzystać z aplikacji


[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[MongoDB]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[Express.js]:https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[NodeJS]:https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
