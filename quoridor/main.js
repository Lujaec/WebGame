import * as creating from "./createBoard.js";
import { gameStart } from "./GameManager.js";

creating.createContainer();
creating.createPlayerInfo('player2','white');
creating.createObstacleInfo('player2');
creating.createBoard();
creating.createObstacleInfo('player1');
creating.createPlayerInfo('player1','black');
//initBoardEvents();

//let game = new GameManager();
//game.gameStart();
gameStart();