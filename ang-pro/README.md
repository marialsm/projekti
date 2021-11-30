## Yleisesittely
1. Sovelluksen idea
Yritin toteuttaa tämän sovelluksen ["Build Angular 12 CRUD Application with Node.js REST API" tutoriaalin pohjalta] (https://www.positronx.io/build-angular-crud-application-with-nodejs-and-express-rest-api/). Sovelluksen idea oli luoda MEAN REST API CRUD -sovellus, jolla pystyisi lisäämään kirjoja listaan, näkemään niitä, poistamaan, muokkaamaan ja hakemaan (minun oma ominaisuus).

2. Toiminnallisuus lyhyesti
Sovellukseen yhdistetty MongoDB-kirjasto, josta sovellus hakee kirjoja.
Sovelluksen backend toteutettu Nodejsllä ja Expressillä ja koostuu muutamasta eri funktiosta, joiden tarkoitus näyttää objekteja MongoDB-tietokannasta, lisätä uusia, muokata niitä, poistaa ja hakea.
Frontend on toteutettu Angularilla 12 käyttäen Bootstrapia, ja se mahdollistaa näiden kaikkien yhdistäminen routien kautta yhdessä paikassa.
Tiedot, jotka joka funktio ottaa vastaan, validoidaan REST APIlla.

Olen muokannut vähän tutoriaalin koodia ja lisäksi yrin lisätä omat ominaisuudet: hakukentän sekä filtterit
listaa varten, mutta valitettavasti vain hakukenttä onnistui monen yrityksen jälkeen.
Eli hakukenttään käyttäjä voi syöttää tekstia, ja hänelle näkyy vain nuo kirjat, joiden nimessä tai kirjailijan nimessä olisi tällainen sana tai kirjain/kirjaimet.


## Kuvaus teknologiosta
1. Lyhyehkö kuvaus eri teknologioiden käyttämisestä työssä:
Frontend: Angular 12, Bootsrap
Backend: Nodejs, Express
Tietokanta: MongoDB, hyödynsin tässä myös MongoDBCompassia
Versiohallinta: Git, github

2. Komennot, joilla kehitysversion saa Githubista omalle koneelle toimimaan
Repositoryn voi kopioida hyödyntäen [tätä ohjetta] (https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)

## Reflektio ja ajankäyttö
1. Miten työ onnistui? Mikä oli helppoa, mikä vaikeaa?
Mielestäni kaikki oli aika vaikeaa ja haastavaa, jopa tutoriaalin seuraaminen ja kaikki ei ihan heti onnnistunut.
Jouduin tietty paljon googlaamaan. Olisin toivonut, että minulla olisi enemmän aikaa tämän projektin toteuttamiseen. Ei ihan kaikki ominaisuudet onnistuneet niin kuin haluaisin, mutta olen silti ylpeä itsestäni.

2. Kuinka paljon käytit aikaa loppuharjoitustyön tekemiseen?
Noin 50 tuntia.

3. Mitä tietoja/taitoja sinun tulee vielä kehittää?
Nodejs ja Angularia, en edelleenkään ihan ymmärrä koko logiikkaa näiden takana.






