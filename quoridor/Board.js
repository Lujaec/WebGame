class Board{
    constructor(){

    }
    getPlayerBoard(){
        let board=document.createElement('table');
				board.id="playerBoard";
				console.log("getPlayerBoard");
				
				for(let i=0;i<9;i++){
					let boardRow = document.createElement('tr');
					for(let j=0;j<9;j++){
						let boardUnit = getBoardUnit(i,j,'boardUnitPlayer');
						boardRow.append(boardUnit);
					}
					board.append(boardRow);
				}
				document.body.append(board);
    }
		getObstacleBoard(){
			let board=document.createElement('table');
				board.id="obstacleBoard";
				console.log("getObstacleBoard");
				for(let i=0;i<8;i++){
					let boardRow = document.createElement('tr');
					for(let j=0;j<8;j++){
						let boardUnit=getBoardUnit(i,j,'boardUnitObstacle');
						boardRow.append(boardUnit);
					}
					board.append(boardRow);
				}
				document.body.append(board);
		}
	
}
function getBoardUnit(row, col, className) {
	let elem=document.createElement('td');
	/*elem.id="bd"+i+j;*/
	elem.setAttribute("data-row",row); //어차피문자열변환
	elem.setAttribute("data-col",col); //어차피문자열변환
	if(className == 'boardUnitPlayer'){ elem.innerHTML="("+row+", "+col+")"; }
	elem.className=className;
	return elem;
}