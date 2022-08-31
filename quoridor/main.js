import * as creating from "./createBoard.js";
import {initPlayerBoardEvents} from "./PlayerBoard.js";
import {initObstacleBoardEvents} from "./ObstacleBoard.js";		
import { GameManager } from "./GameManager.js";

creating.createBoard('playerBoard',9);
initPlayerBoardEvents();

creating.createBoard('obstacleBoard',8);
initObstacleBoardEvents();

let game = new GameManager();
game.gameStart();