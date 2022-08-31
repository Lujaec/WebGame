import {Player, mousedownPlayer} from "./Player.js";
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
    board.setPlayerBoardArr(player1.getPos(),player1.getPos(),player1); //playerBoard에 올려줌
    board.setPlayerBoardArr(player2.getPos(),player2.getPos(),player2); //playerBoard에 올려줌
    player1.initElem('black'); //elem을 토큰이미지요소로
    player2.initElem('white');
    //console.log(player1.getId());
    document.querySelector(player1.getId()).append(player1.getElem());
    document.querySelector(player2.getId()).append(player2.getElem());
    console.log(player1.getElem());
    
    
    this.changeTurn(player1,player1);
  }
  changeTurn(from,to){
    this.setNowTurn(to);
    //from.getElem().removeEventListener('click',clickPlayer); //리무브말고 비활성화

    to.getElem().addEventListener('mousedown',mousedownPlayer);
  }
}


function moveTo(from, to, who){
  who.setPos(to.row,to.col);
  board.setPlayerBoardArr(from,to,who);
  board.printPlayerBoardArr();
}
