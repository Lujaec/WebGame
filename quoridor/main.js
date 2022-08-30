
import {Player} from "./Player.js";
import * as creating from "./createBoard.js";
import {PlayerBoard, initPlayerBoardEvents} from "./PlayerBoard.js";
import {ObstacleBoard, initObstacleBoardEvents} from "./ObstacleBoard.js";		

export let player1 = new Player("박진우", "black",8,4);
export let player2 = new Player("이유재","white",0,4);
export let playerBoard = new PlayerBoard();
export let obstacleBoard = new ObstacleBoard();

creating.createBoard('playerBoard',9);
initPlayerBoardEvents();

creating.createBoard('obstacleBoard',8);
initObstacleBoardEvents();

playerBoard.printPlayerBoardArr();

		
let tmp=player1.getPos();
player1.setPos(tmp,1,1);
console.log("p1 :"+tmp.row+tmp.col);

	