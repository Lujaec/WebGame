import * as creating from "./createBoard.js";
import { gameStart } from "./GameManager.js";

creating.createPlayerInfo('player2');
creating.createObstacleInfo('player2');
creating.createBoard();
creating.createObstacleInfo('player1');
creating.createPlayerInfo('player1');
//initBoardEvents();

//let game = new GameManager();
//game.gameStart();
gameStart();