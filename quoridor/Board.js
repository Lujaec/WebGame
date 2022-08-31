import { Player } from "./Player.js";
export class Board{
    constructor(){
			this._playerBoardArr = Array.from(Array(9), () => Array(9).fill(0));
			this._obstacleBoardArr = Array.from(Array(8), () => Array(8).fill(-1));
			this._player1=null;
			this._player2=null;
    }
		getplayerBoardArr(){ //set없어도?
			return this._boardArr;
		}
		getObstacleBoardArr(){ //set없어도?
			return this._obstacleBoardArr;
		}
		setPlayerBoardArr(from, to, who){
			this._playerBoardArr[from.row][from.col]=0;
			this._playerBoardArr[to.row][to.col]=who;
			
			this.testF();
			this._nowTurn='player1';
		}
		setObstacleBoardArr(){

		}
		printPlayerBoardArr(){
			console.table(this._playerBoardArr);
		}
		printObstacleBoardArr(){
			console.table(this._obstacleBoardArr);
		}
		testF(){
			console.log('가능?');
		}
		initPlayerBoardUI(player1,player2){
			console.log(player1);
			let elem1=document.querySelector(`#p${player1.getPos().row}${player1.getPos().col}`); //이거 p84??
			let elem2=document.querySelector(`#p${player2.getPos().row}${player2.getPos().col}`); //이거 p84??
			
			console.log(elem1);
			elem1.innerHTML = '<img src="./images/black1.png" alt="black"></img>';
			elem2.innerHTML = '<img src="./images/white1.png" alt="white"></img>';
		}
}

export function initBoardEvents(){
	let tds = document.querySelectorAll('td');
	for(let elem of tds){
		elem.onclick = function(event){
			let target = event.target;
			//console.log(target.getBoundingClientRect(), target.dataset.row,target.className);	
			console.log(`${target.dataset.row}, ${target.dataset.col} ${target.className} ${target.id}`);
		}
	}
}
