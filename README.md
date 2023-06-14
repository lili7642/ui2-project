# HEMNETDLE IN REACT
## Documentation
### Files and folders

In the *\src* folder, App.js is the file that makes the "base" for the project. The App.js-file utilizes components from the *\components* director, where Game.js and Image.js creates the main components for the game, more documentation on these are inside the files. The *\hus* directory contains the house-database as well as functionality to randomly pick a house for each game. *\assets* contains files for the sound effects and the animated logo. 

## Run the program
To run the program in development mode, npm, node and react-confetti has to be installed. React confetti can be installed by simply writing "npm install react-confetti" in console (as long as npm is installed). To start the program, cd into the project folder (e.g. "..\ui2-project") and then type "npm run start", which will run the program in localhost:3000.
Currently, the page has to be refreshed in order to start a new game once the game has been won or lost. 

## Remaining problems
Most of the remaing fixes that would need to be done before a "release" is related to game logics and extended functionality, rather than bugfixes etc. Main things that would need fixing is:
- Currently you can keep guessing even after a correct guess has been made, which would need to be prohibited and instead give the option to start a new game.
- The only way to start a new game after winning/losing is currently to reload the page, which should be changed so that a button can start a new game.
- Further population of the house database.
- The player should get a clue after each wrong guess, like which county/city the property is located in, the number of square meters etc.

## Work distribution

### Linus:
Game logics, language change, saving/displaying past game stats

### Markus:
Tutorial, documentation, animations
### Samuel:
Confetti animation, styling


