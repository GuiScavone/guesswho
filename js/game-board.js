const { Character } = require("./character");
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// List of possible features each character can have. We're assuming 6 characters per game, therefore 6 names.
const eyeColors = ["blue", "green", "brown", "hazel"];
const hairColors = ["blond", "brown", "black", "grey"];
const names = ["Tony", "Matt", "Florence", "Margot", "Stacy", "Peter"];
const beard = [true, false];
const glasses = [true, false];

class GameBoard {
  chosenCharacter = null;
  remainingCharacters = [];

  constructor() {
    for (let i = 0; i < 6; i++) {
      let isRepeatedCharacter = false;

      do {
        // Generate all the character's features based on the list of possibilities for each one.
        const name = names[i]; // To make sure that we only use each name once.
        const eyeColor =
          eyeColors[this.generateRandomInt(0, eyeColors.length - 1)];
        const hairColor =
          hairColors[this.generateRandomInt(0, hairColors.length - 1)];
        const hasBeard = beard[this.generateRandomInt(0, beard.length - 1)];
        const hasGlasses =
          glasses[this.generateRandomInt(0, glasses.length - 1)];

        // This checks if the new randomized character has a set of unique characteristics.
        // Using the .some() method, the isRepeatedCharacter variable will return true if two characters have the same exact characteristic.
        isRepeatedCharacter = this.remainingCharacters.some((character) => {
          return (
            character.eyeColor === eyeColor &&
            character.hairColor === hairColor &&
            character.hasBeard === hasBeard &&
            character.hasGlasses === hasGlasses
          );
        });
        // If the new character isn't a copy of another one, we save it as a new character.
        if (!isRepeatedCharacter) {
          this.remainingCharacters.push(
            new Character(name, eyeColor, hairColor, hasBeard, hasGlasses)
          );
        }
        // While we have characters with the same characteristics, we'll keep running the code.
      } while (isRepeatedCharacter);
    }

    // Choose a character amongst the 6 characters.
    this.chosenCharacter =
      this.remainingCharacters[
        this.generateRandomInt(0, this.remainingCharacters.length - 1)
      ];
  }
  // Generate a number between min and max inclusive.
  // We'll use this on the Gameboard constructor as the index to access the randomized characteristic from the given list in the beggining.
  generateRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Uses the matchesFeature() method in character.js to compare if it's equal to chosenCharacter's features.
  filterCharacters(featureName, featureValue) {
    const matchesChosenCharacter = this.chosenCharacter.matchesFeature(
      featureName,
      featureValue
    );

    //console.log("This is the chosen character", this.chosenCharacter);
    //console.log("Before filtering", this.remainingCharacters);

    // If user's question is === with the character's feature, we'll filter all remaining characters by those who have that feature.
    // If user's question is !== to the characters feature, we'll filter all remaining characters by those who don't have that feature.
    this.remainingCharacters = this.remainingCharacters.filter((character) =>
      matchesChosenCharacter
        ? character.matchesFeature(featureName, featureValue)
        : !character.matchesFeature(featureName, featureValue)
    );

    //console.log("After filtering", this.remainingCharacters);
    }
}


function askQuestion(question, callback) {
  rl.question(question, (answer) => {
    callback(answer.trim().toLowerCase());
  });
}

function playGame() {

  const gameBoard = new GameBoard();

  console.log(gameBoard.chosenCharacter);

  console.log('Welcome to Guess Who!');
  console.log('Try to guess the secret character.');

  askQuestion('Do you want to play player vs player (pvp) or player vs computer (pvc)? ', (mode) => {
    if (mode === 'pvp') {
      console.log("Sorry, player vs player mode is not implemented yet.");
      rl.close();
    } else if (mode === 'pvc') {
      console.log('Available attributes: ' + 'Hair Colour: ' + hairColors + ' Eye Colour: ' + eyeColors + ' Beard: ' + beard + ' Glasses: ' + glasses);
      playVsComputer(gameBoard.chosenCharacter);
    } else {
      console.log('Invalid mode. Please choose pvp or pvc.');
      playGame();
    }
  });
}

function playVsComputer(gameBoard) {
  function makeGuess() {
    askQuestion('Enter an attribute to guess: ', (attribute) => {
      if (eyeColors.includes(attribute) || hairColors.includes(attribute) || beard.includes(attribute) || glasses.includes(attribute)) {
        askQuestion('Enter the value for the attribute: ', (matchesChosenCharacter) => {
          if (gameBoard.chosenCharacter.matchesFeature(attribute, matchesChosenCharacter)) {
            console.log(`Congratulations! You guessed correctly. The secret character is ${gameBoard.chosenCharacter.name}.`);
            rl.close();
          } else {
            console.log('Incorrect guess. Try again.');
            makeGuess();
          }
        });
      } else {
        console.log('Invalid attribute.');
        makeGuess();
      }
    });
  }

  makeGuess();
}

playGame();


module.exports = { GameBoard };








/*const { Character } = require("./character");
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// List of possible features each character can have. We're assuming 6 characters per game, therefore 6 names.
const eyeColors = ["blue", "green", "brown", "hazel"];
const hairColors = ["blond", "brown", "black", "grey"];
const names = ["Tony", "Matt", "Florence", "Margot", "Stacy", "Peter"];
const beard = [true, false];
const glasses = [true, false];

class GameBoard {
  chosenCharacter = null;
  remainingCharacters = [];

  constructor() {
    this.initializeGame();
  }
  
  async initializeGame(){
    for (let i = 0; i < 6; i++) {
      let isRepeatedCharacter = false;

      do {
        // Generate all the character's features based on the list of possibilities for each one.
        const name = names[i]; // To make sure that we only use each name once.
        const eyeColor =
          eyeColors[this.generateRandomInt(0, eyeColors.length - 1)];
        const hairColor =
          hairColors[this.generateRandomInt(0, hairColors.length - 1)];
        const hasBeard = beard[this.generateRandomInt(0, beard.length - 1)];
        const hasGlasses =
          glasses[this.generateRandomInt(0, glasses.length - 1)];

        // This checks if the new randomized character has a set of unique characteristics.
        // Using the .some() method, the isRepeatedCharacter variable will return true if two characters have the same exact characteristic.
        isRepeatedCharacter = this.remainingCharacters.some((character) => {
          return (
            character.eyeColor === eyeColor &&
            character.hairColor === hairColor &&
            character.hasBeard === hasBeard &&
            character.hasGlasses === hasGlasses
          );
        });
        // If the new character isn't a copy of another one, we save it as a new character.
        if (!isRepeatedCharacter) {
          this.remainingCharacters.push(
            new Character(name, eyeColor, hairColor, hasBeard, hasGlasses)
          );
        }
        // While we have characters with the same characteristics, we'll keep running the code.
      } while (isRepeatedCharacter);

      // Choose a character amongst the 6 characters.
      this.chosenCharacter =
      this.remainingCharacters[
      this.generateRandomInt(0, this.remainingCharacters.length - 1)
      ];
    }
    
    this.playGame();
  }

  // Generate a number between min and max inclusive.
  // We'll use this on the Gameboard constructor as the index to access the randomized characteristic from the given list in the beggining.
  generateRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Uses the matchesFeature() method in character.js to compare if it's equal to chosenCharacter's features.
  filterCharacters(featureName, featureValue) {
    const matchesChosenCharacter = this.chosenCharacter.matchesFeature(
      featureName,
      featureValue
    );

    //console.log("This is the chosen character", this.chosenCharacter);
    //console.log("Before filtering", this.remainingCharacters);

    // If user's question is === with the character's feature, we'll filter all remaining characters by those who have that feature.
    // If user's question is !== to the characters feature, we'll filter all remaining characters by those who don't have that feature.
    this.remainingCharacters = this.remainingCharacters.filter((character) =>
      matchesChosenCharacter
        ? character.matchesFeature(featureName, featureValue)
        : !character.matchesFeature(featureName, featureValue)
    );

    //console.log("After filtering", this.remainingCharacters);
    }
}

function askQuestion(question, callback) {
  rl.question(question, (answer) => {
    callback(answer.trim().toLowerCase());
  });
}

function playGame() {
  const gameBoard = new GameBoard();
  console.log(gameBoard.chosenCharacter);

  console.log('Welcome to Guess Who!');
  console.log('Try to guess the secret character.');

  askQuestion('Do you want to play player vs player (pvp) or player vs computer (pvc)? ', (mode) => {
    if (mode === 'pvp') {
      console.log("Sorry, player vs player mode is not implemented yet.");
      rl.close();
    } else if (mode === 'pvc') {
      console.log('Available attributes: ' + 'Hair Colour: ' + hairColors + ' Eye Colour: ' + eyeColors + ' Beard: ' + beard + ' Glasses: ' + glasses);
      playVsComputer(gameBoard.chosenCharacter);
    } else {
      console.log('Invalid mode. Please choose pvp or pvc.');
      playGame();
    }
  });
}

function playVsComputer(gameBoard) {
  function makeGuess() {
    askQuestion('Enter an attribute to guess: ', (attribute) => {
      if (eyeColors.includes(attribute) || hairColors.includes(attribute) || beard.includes(attribute) || glasses.includes(attribute)) {
        askQuestion('Enter the value for the attribute: ', (matchesChosenCharacter) => {
          if (gameBoard.chosenCharacter.matchesFeature(attribute, matchesChosenCharacter)) {
            console.log(`Congratulations! You guessed correctly. The secret character is ${gameBoard.chosenCharacter.name}.`);
            rl.close();
          } else {
            console.log('Incorrect guess. Try again.');
            makeGuess();
          }
        });
      } else {
        console.log('Invalid attribute.');
        makeGuess();
      }
    });
  }

  makeGuess();
}

playGame();


module.exports = { GameBoard };
*/

