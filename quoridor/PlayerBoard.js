export class PlayerBoard{
    constructor(){
			this._playerBoardArr = Array.from(Array(9), () => Array(9).fill(0));
			this._player1=null;
			this._player2=null;
    }
		getBoardArr(){ //set없어도?
			return this._boardArr;
		}
		moveTo(from,to){

		}
		printPlayerBoardArr(){
			for(let i=0;i<9;i++){
				for(let j=0;j<9;j++){
					console.log( this._playerBoardArr[i][j]);
				}
			}
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

