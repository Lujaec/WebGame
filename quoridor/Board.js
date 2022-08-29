 class Board{
    constructor(){
			this._boardArr = new Array(9);
			for(let i=0;i<9;i++){
				this._boardArr[i]=new Array(9);
			} 
			this._player1=null;
			this._player2=null;
    }
		getBoardArr(){ //set없어도?
			return this._boardArr;
		}
		moveTo(from,to){

		}
		printBoardArr(){
			for(let i=0;i<9;i++){
				for(let j=0;j<9;j++){
					console.log( this._boardArr[i][j]);
				}
			}
		}
    createBoard() {
			createPlayerBoard();
			createObstacleBoard();
		}
		initBoard(){
			initPlayerBoardEvents();
			initObstacleBoardEvents();
			initBoardArr(this._boardArr);
		}
}
function createPlayerBoard(){
	let board=document.createElement('table');
	board.id="playerBoard";
	console.log("getPlayerBoard");
	createTable(board,9,'boardUnitPlayer');	
}
function createObstacleBoard(){
	let board=document.createElement('table');
	board.id="obstacleBoard";
	console.log("getObstacleBoard");
	createTable(board,8,'boardUnitObstacle');
}
function createTable(board,size,className){
	for(let i=0;i<size;i++){
		let boardRow = document.createElement('tr');
		for(let j=0;j<size;j++){
			let boardUnit = createBoardUnit(i,j,className);
			boardRow.append(boardUnit);
		}
		board.append(boardRow);
	}
	document.body.append(board);
}
function createBoardUnit(row, col, className) {
	let elem=document.createElement('td');
	/*elem.id="bd"+i+j;*/
	elem.setAttribute("data-row",row); //어차피문자열변환
	elem.setAttribute("data-col",col); //어차피문자열변환
	if(className == 'boardUnitPlayer'){ elem.innerHTML="("+row+", "+col+")"; }
	elem.className=className;
	return elem;
}
function initPlayerBoardEvents(){
	let players = document.querySelectorAll('#playerBoard td');
		for(elem of players){
			elem.onclick = function(event){
				let target = event.target;
				console.log(target.getBoundingClientRect(), target.id,target.className);
			}
		}
}
function initObstacleBoardEvents(){
	let obstacles = document.querySelectorAll('#obstacleBoard td');
		for(elem of obstacles){
			elem.onclick = function(event){
				let target = event.target;
				console.log(target.getBoundingClientRect(), target.id,target.className);
			}
		}
}
function initBoardArr(arr){
	console.log('initBoardArr');
	console.log(arr);
	for(let i=0;i<9;i++){
		for(let j=0;j<9;j++){
			arr[i][j]=0;
		}
	}
}