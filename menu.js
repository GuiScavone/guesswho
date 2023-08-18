const readline = require('readline');
const { GameBoard } = require('./game-board');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Menu {
    constructor(){
        this.game = new GameBoard(); //inicializando a class game board
    }

    startGame() {
        console.log('#####################')
        console.log('\nWelcome to Guess Who Game!');
        console.log('1. Set Players Name');
        console.log('2. Player vs Player');
        console.log('3. Player vs Computer');
        console.log('4. Exit');
        console.log('\n#####################');
      
        rl.question('Choose an option: ', (option) => {
          switch (option) {
            case '1':
              //this.setPlayersNames(); exemplo de nome de função para definir os nomes dos jogadores 
              break;
            case '2':
                //this.setPlayerVsPlayer(); exemplo de nome de função para definir jogador vs jogador
               break;
            case '3':
                //this.setPlayersVsComputer(); exemplo de nome de função para definir jogador vs computador
               break;
            case '4':
              console.log('Thanks for playing. See you soon.');
              rl.close();
              process.exit();
              break;
            default:
              console.log('Not a valid option, please try again.');
              console.log("\n");
              this.startGame();
              break;
          }
        });
      }
}

const menu = new Menu();
menu.startGame();
