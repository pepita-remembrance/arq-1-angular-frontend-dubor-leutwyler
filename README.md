# Inscription-poll - Frontend
This is the front end for the public api:
[Inscription-poll](https://murmuring-beyond-94607.herokuapp.com/v1/careers)

## Frontend Url

[Front-end](https://ins-poll-front-arqsoft-2017s2.herokuapp.com/)

### How to use

First of all we are using in the backend an architecture that separates the database logic with the model. So in order to test the look and feel faster than with a normal implementation we are using as a proof of concept an ___in memory database___ that initially is empty. By pressing the button seed the database will allow us to use the following data:

The valid users are **Marco Gomez**, and **Joaquin Sanchez** as normal students, and **Gabriela Arevalo** and **Pablo Suarez** as admins.

# Run it locally

First of all you'll need to run `npm install && npm run postinstall` to generate the dist directory.

Run `npm run ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Or also you can do `npm start` and then navigate to `http://localhost:8080/`.

##### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

##### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

# Developers
* Emanuel Dubor
* Nicolas Leutwyler
