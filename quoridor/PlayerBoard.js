
export class PlayerBoard{
    constructor(){
			this._playerBoardArr = Array.from(Array(9), () => Array(9).fill(0));
			this._player1=null;
			this._player2=null;
    }
		getplayerBoardArr(){ //set없어도?
			return this._boardArr;
		}
		setPlayerBoardArr(from, to, who){
			this._playerBoardArr[from.row][from.col]=0;
			this._playerBoardArr[to.row][to.col]=who;
			//this.updatePlayerBoard(from,to,who); this잇어도대니?
			this.testF();
			this._nowTurn='player1';
			
		}
		printPlayerBoardArr(){
			console.table(this._playerBoardArr);
		}
		testF(){
			console.log('가능?');
		}
}

export function initPlayerBoardEvents(){
	let players = document.querySelectorAll('#playerBoard td');
	for(let elem of players){
		elem.onclick = function(event){
			let target = event.target;
			console.log(target.getBoundingClientRect(), target.id,target.className);
		}
	}
}
export function initPlayerBoardUI(player1,player2){
	let id_p1='#pbu'+player1.getPos().row+player1.getPos().col;
	let id_p2='#pbu'+player2.getPos().row+player2.getPos().col;
	let elem1 = document.querySelector(id_p1);
	let elem2 = document.querySelector(id_p2);
	elem1.innerHTML = '<img src="./images/black1.png" alt="black"></img>';
	elem2.innerHTML = '<img src="./images/white1.png" alt="white"></img>';
}

