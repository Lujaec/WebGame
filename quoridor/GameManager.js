import {Player} from "./Player.js";
import {PlayerBoard, initPlayerBoardUI} from "./PlayerBoard.js";
import {ObstacleBoard} from "./ObstacleBoard.js";		

export let player1 = new Player("박진우", "black",8,4);
export let player2 = new Player("이유재", "white",0,4);
export let playerBoard = new PlayerBoard();
export let obstacleBoard = new ObstacleBoard();

export class GameManager {
  constructor(){
    this._nowTurn = null;
    //console.log(player1);
  }
  gameStart(){
    //console.log(player1.getPos());
    moveTo(player1.getPos(),player1.getPos(),player1); //playerBoard에 올려줌
    moveTo(player2.getPos(),player2.getPos(),player2); //playerBoard에 올려줌

    initPlayerBoardUI(player1,player2);

    
  }
}
function moveTo(from, to, who){
  who.setPos(to.row,to.col);
  playerBoard.setPlayerBoardArr(from,to,who);
  playerBoard.printPlayerBoardArr();
  
}
