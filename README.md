# Installation and Setup Instructions

* Clone down this repository. You will need `node` and `npm` installed globally on your machine. 
* Add your google map api in the `.env` file. See `.env.example` file to see example
* Update `SKIP` array  in `CityGetter` component to add all characters you want to be skipped while inputting
* Update `conversion` dictionary in util function `removeSpecialCharacters` inside the `csvToJson,js` file in utils folder to give your own conversions for each character as required

### `Installation`:

`npm install` 

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches tests

