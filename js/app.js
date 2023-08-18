const { GameBoard } = require("./game-board");

const gameOne = new GameBoard();
gameOne.filterCharacters("hairColor", "brown");
gameOne.filterCharacters("hasGlasses", true);
