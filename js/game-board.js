const { Character } = require("./character");

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

module.exports = { GameBoard };
