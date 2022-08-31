import {Player, clickPlayer} from "./Player.js";
import {Board} from "./Board.js";


export let board = new Board();
export let player1 = new Player("박진우", "black",8,4);
export let player2 = new Player("이유재", "white",0,4);



export class GameManager {
  constructor(){
    this._nowTurn = null;
  }
  setNowTurn(player){ this._nowTurn=player;}
  getNowTurn(){ return this._nowTurn;}

  gameStart(){
    moveTo(player1.getPos(),player1.getPos(),player1); //playerBoard에 올려줌
    moveTo(player2.getPos(),player2.getPos(),player2); //playerBoard에 올려줌
    player1.setElem(player1.getPos());
    player2.setElem(player2.getPos());
    player1.getElem().innerHTML = '<img src="./images/black.png" alt="black"></img>';
    player2.getElem().innerHTML = '<img src="./images/white.png" alt="white"></img>';
    player1.getElem().addEventListener('click',clickPlayer);
    player2.getElem().addEventListener('click',clickPlayer);
    console.log(player1.getElem());
    
    //this.setNowTurn(player1);



  }
  changeTurn(from,to){
    
  }
}


function moveTo(from, to, who){
  who.setPos(to.row,to.col);
  board.setPlayerBoardArr(from,to,who);
  board.printPlayerBoardArr();
}
