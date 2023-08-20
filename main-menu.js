const readline = require("node:readline");
const { Character } = require("./js/character");
const { question } = require("readline-sync");
const { eyeColors, hairColors, names, beard, glasses, GameBoard } = require("./js/game-board");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Menu {
  gameBoard;

  displayInitialMenu() {
    console.log("#####################");
    console.log("Welcome to Guess Who Game!");
    console.log("0. Player vs Computer");
    console.log("1. Player vs Player");
    console.log("2. Exit");
    console.log("#####################\n");

    rl.question("Choose an option: ", (option) => {
      switch (option) {
        case "0":
          this.gameBoard = new GameBoard();
          this.displayGameMenu();
          break;
        case "1":
          this.startPlayerVsPlayer();
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
      } else {
        console.log(
          `Wrong guess, the character was ${this.gameBoard.chosenCharacter.name}.`
        );
      }

      this.exitGame();
    });
  }

  startPlayerVsPlayer(){
    console.log('Player vs Player mode selected.\n');

    const getPlayerNames = (element) => {
      rl.question("Player 1, enter your name: ", (player1Name) => {
        rl.question("Player 2, enter your name: ", (player2Name) => {
          element(player1Name.toLowerCase(), player2Name.toLowerCase(), '\n');
        });
      });
    };
    
    getPlayerNames((player1Name, player2Name) => {
      console.log(`Player 1: ${player1Name}`);
      console.log(`Player 2: ${player2Name}`);
    

    this.gameBoard = new GameBoard();

    const currentPlayer = 1;
    const switchPlayer = () => (currentPlayer === 1 ? 2 : 1);
      
      const displayMenu = () => {
        console.log(`Player ${currentPlayer}, it's your turn.`);
        console.log("0. Ask a yes/no question");
        console.log("1. Make a guess");
        console.log("2. Return to Main Menu");
        console.log("3. Exit game");
      
        rl.question("Choose an option: ", (option) => {
          switch (option) {
            case "0":
              this.askQuestion(currentPlayer, switchPlayer);
              break;
            case "1":
              this.makeGuess(currentPlayer, player1Name, player2Name);
              break;
            case "2":
              this.displayInitialMenu();
              break;
            case "3":
              console.log("Thanks for playing. See you soon.");
              this.exitGame();
              break;
            default:
              console.log("Invalid option, please try again.");
              displayMenu();
              break;
          }
        });
      };
      displayMenu();
    });
  }

  askQuestion(currentPlayer, switchPlayer){
    console.log(`Player ${currentPlayer} ask a yes/no question about the opponent character: `);
    
    const randomQuestion = generateRandomQuestion();
    console.log('Random Question: ' + randomQuestion);

    rl.question(`Your question ${currentPlayer} ` , (question) => {
      const playerQuestion = question.toLowerCase();
      const correctAnswer = randomQuestion.toLowerCase();
    
      if (playerQuestion === correctAnswer) {
         console.log(`Player ${currentPlayer}, you guessed correctly!`);
      } else {
        console.log(`Player ${currentPlayer}, your question was incorrect.`);
      }

      const nextPlayer = switchPlayer(currentPlayer);

      //this.displayMenu(nextPlayer);
    });
  }


exitGame() {
    rl.close();
    process.exit();
  }
}

function generateRandomQuestion() {
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomHairColor = hairColors[Math.floor(Math.random() * hairColors.length)];
  const randomEyeColor = eyeColors[Math.floor(Math.random() * eyeColors.length)];
  const randomHasBeard = beard[Math.floor(Math.random() * beard.length)];
  const randomHasGlasses = glasses[Math.floor(Math.random() * glasses.length)];

  const questions = [
    `Is the character's name ${randomName}?`,
    `Does the character have ${randomHairColor} hair?`,
    `Does the character have ${randomEyeColor} eyes?`,
    `Does the character have a beard?`,
    `Does the character wear glasses?`,
  ];

  // Randomly select a question from the array
  const randomIndex = Math.floor(Math.random() * questions.length);
  const randomQuestion = questions[randomIndex];

  return randomQuestion;
}

const menu = new Menu();
menu.displayInitialMenu();
