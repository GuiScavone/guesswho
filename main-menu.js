const readline = require("node:readline");
const { eyeColors, hairColors, GameBoard } = require("./js/game-board");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Menu {
  gameBoard;
  numberOfWins = 0;
  numberOfDefeats = 0;

  displayInitialMenu() {
    console.log("#####################");
    console.log("Welcome to Guess Who Game!");
    console.log("0. Player vs Computer");
    console.log("1. Player vs Player");
    console.log("2. Exit");
    console.log("#####################");

    rl.question("Choose an option: ", (option) => {
      switch (option) {
        case "0":
          this.gameBoard = new GameBoard();
          this.displayGameMenu();
          break;
        case "1":
          console.log("this game mode is not yet implemented!");
          this.displayInitialMenu();
          break;
        case "2":
          console.log("Thanks for playing. See you soon.");
          this.exitGame();
          break;
        default:
          console.log("Not a valid option, please try again.");
          this.displayInitialMenu();
          break;
      }
    });
  }

  displayGameMenu() {
    if (this.gameBoard.numberOfPlays !== 0) {
      console.log(
        `You have ${this.gameBoard.numberOfPlays} plays left and these are the characters:\n`
      );

      this.gameBoard.remainingCharacters.forEach((character) => {
        console.log(`${character.toString()}\n`);
      });

      console.log("You can filter them the following features:");
      console.log("0. Hair Color");
      console.log("1. Eye Color");
      console.log("2. Beard");
      console.log("3. Glasses");
      console.log("4. Guess who!");

      rl.question("Choose an option: ", (option) => {
        switch (option) {
          case "0":
            this.displayHairColorMenu();
            break;
          case "1":
            this.displayEyeColorMenu();
            break;
          case "2":
            this.displayBeardMenu();
            break;
          case "3":
            this.displayGlassesMenu();
            break;
          case "4":
            this.guessWho();
            break;
          default:
            console.log("You chose an invalid option, please try again.");
            this.displayGameMenu();
        }
      });
    } else {
      console.log("You don't have any plays left and need to guess who!");
      this.guessWho();
    }
  }

  displayHairColorMenu() {
    console.log("These are the possible hair colors:");

    hairColors.forEach((hairColor, hairColorIndex) => {
      console.log(`${hairColorIndex} - ${hairColor}`);
    });

    rl.question("Choose an option: ", (chosenOption) => {
      const parsedChosenOption = parseInt(chosenOption);
      if (
        isNaN(parsedChosenOption) ||
        parsedChosenOption < 0 ||
        parsedChosenOption >= hairColors.length
      ) {
        console.log("You chose an invalid option, please try again.");
        this.displayHairColorMenu();
        return;
      }

      this.gameBoard.filterCharacters(
        "hairColor",
        hairColors[parsedChosenOption]
      );
      this.displayGameMenu();
    });
  }

  displayEyeColorMenu() {
    console.log("These are the possible eye colors:");

    eyeColors.forEach((eyeColor, eyeColorIndex) => {
      console.log(`${eyeColorIndex} - ${eyeColor}`);
    });

    rl.question("Choose an option: ", (chosenOption) => {
      const parsedChosenOption = parseInt(chosenOption);
      if (
        isNaN(parsedChosenOption) ||
        parsedChosenOption < 0 ||
        parsedChosenOption >= eyeColors.length
      ) {
        console.log("You chose an invalid option, please try again.");
        this.displayEyeColorMenu();
        return;
      }

      this.gameBoard.filterCharacters(
        "eyeColor",
        eyeColors[parsedChosenOption]
      );
      this.displayGameMenu();
    });
  }

  displayBeardMenu() {
    console.log("This character may or may not have beard:");
    console.log("1. Has beard");
    console.log("2. Doesn't have beard");

    rl.question("Choose an option: ", (chosenOption) => {
      if (chosenOption !== "1" && chosenOption !== "2") {
        console.log("You chose an invalid option, please try again.");
        this.displayBeardMenu();
        return;
      }

      this.gameBoard.filterCharacters("hasBeard", chosenOption === "1");
      this.displayGameMenu();
    });
  }

  displayGlassesMenu() {
    console.log("This character may or may not have glasses:");
    console.log("1. Has glasses");
    console.log("2. Doesn't have glasses");

    rl.question("Choose an option: ", (chosenOption) => {
      if (chosenOption !== "1" && chosenOption !== "2") {
        console.log("You chose an invalid option, please try again.");
        this.displayGlassesMenu();
        return;
      }

      this.gameBoard.filterCharacters("hasGlasses", chosenOption === "1");
      this.displayGameMenu();
    });
  }

  guessWho() {
    console.log("These are the remaining characters:\n");
    this.gameBoard.remainingCharacters.forEach((character) => {
      console.log(`${character.toString()}\n`);
    });

    rl.question("Write the characters name: ", (chosenName) => {
      if (
        this.gameBoard.chosenCharacter.name.toLowerCase() ===
        chosenName.toLowerCase()
      ) {
        console.log("You have guessed correctly!");
        this.numberOfWins++;
      } else {
        console.log(
          `Wrong guess, the character was ${this.gameBoard.chosenCharacter.name}.`
        );
        this.numberOfDefeats++;
      }

      this.displayAfterGameMenu();
    });
  }

  displayAfterGameMenu() {
    console.log("0. Play again");
    console.log("1. Scoreboard");
    console.log("2. Exit Game");

    rl.question("Chosen option: ", (chosenOption) => {
      switch (chosenOption) {
        case "0":
          this.displayInitialMenu();
          break;
        case "1":
          console.log(
            `Number of victories: ${this.numberOfWins}; Number of defeats: ${this.numberOfDefeats}`
          );
          this.displayAfterGameMenu();
          break;
        case "2":
          this.exitGame();
          break;
        default:
          console.log("You chose an invalid option, please try again.");
          this.displayAfterGameMenu();
      }
    });
  }

  exitGame() {
    rl.close();
    process.exit();
  }
}

const menu = new Menu();
menu.displayInitialMenu();
