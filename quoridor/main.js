import * as creating from "./createBoard.js";
import {initBoardEvents} from "./Board.js";
import { GameManager } from "./GameManager.js";


creating.createObstacleInfo('player2');
creating.createBoard();
creating.createObstacleInfo('player1');
initBoardEvents();

let game = new GameManager();
game.gameStart();