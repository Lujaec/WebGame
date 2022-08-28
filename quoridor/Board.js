class Board{
    constructor(){

    }
    initBoard() {
			initPlayerBoard();
			initObstacleBoard();
		}
		
}
function initPlayerBoard(){
	let board=document.createElement('table');
	board.id="playerBoard";
	console.log("getPlayerBoard");
	initTable(board,9,'boardUnitPlayer');	
	//initBoardEvents('#playerBoard');
}
function initObstacleBoard(){
	let board=document.createElement('table');
	board.id="obstacleBoard";
	console.log("getObstacleBoard");
	initTable(board,8,'boardUnitObstacle');
	//initBoardEvents('#obstacleBoard');
}

function initTable(board,size,className){
	for(let i=0;i<size;i++){
		let boardRow = document.createElement('tr');
		for(let j=0;j<size;j++){
			let boardUnit = initBoardUnit(i,j,className);
			boardRow.append(boardUnit);
		}
		board.append(boardRow);
	}
	document.body.append(board);
}
function initBoardUnit(row, col, className) {
	let elem=document.createElement('td');
	/*elem.id="bd"+i+j;*/
	elem.setAttribute("data-row",row); //어차피문자열변환
	elem.setAttribute("data-col",col); //어차피문자열변환
	if(className == 'boardUnitPlayer'){ elem.innerHTML="("+row+", "+col+")"; }
	elem.className=className;
	return elem;
}
function initBoardEvents(id){
	let tds = document.querySelectorAll('id td');
		for(elem of tds){
			elem.onclick = function(event){
				let target = event.target;
				console.log(target.getBoundingClientRect(), target.id,target.className);
			}
		}
}