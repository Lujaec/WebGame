import {Board} from "./Board.js";
import {Player} from "./Player.js";
		
		
export let player1 = new Player("박진우", "black",8,4);
export let player2 = new Player("이유재","white",0,4);
		
export let board = new Board();
board.createBoard();
board.initBoard();
board.printBoardArr();
		
//player1.setPos(this.getPos(),1,1);
let tmp=player1.getPos();
console.log("p1 :"+tmp.row+tmp.col);
player1.setPos(tmp,1,1);
console.log("p1 :"+tmp.row+tmp.col);
	