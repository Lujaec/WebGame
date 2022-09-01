export function createBoard(){
	let board=document.createElement('table');
	board.id='board'
	console.log("makingBoard");
	createTable(board);	
}
function createTable(board){
	for(let i=0;i<17;i++){
		let boardRow = document.createElement('tr');
		for(let j=0;j<17;j++){
			let unit=null;
			if(isPlayerBoardUnit(i,j)){
				unit = createBoardUnit(i,j,'playerBoardUnit');
			}
			else if(isObstacleBoardUnit(i,j)){ //isObstacleUnit
				unit = createBoardUnit(i,j,'obstacleBoardUnit');
			}
			else {
				unit = createBoardUnit(i,j,'emptyBoardUnit');
			}
			boardRow.append(unit);
		}
		board.append(boardRow);
	}
	document.querySelector('#container').append(board);
}
function createBoardUnit(row, col, className) {
	row=Math.floor(row/2);
	col=Math.floor(col/2);
	let elem=document.createElement('td');
	elem.id=className[0]+row+col;
	if(className!='emptyBoardUnit'){
		elem.setAttribute("data-row",row); //어차피문자열변환
		elem.setAttribute("data-col",col); //어차피문자열변환
	}
	if(className == 'playerBoardUnit'){ elem.innerHTML="("+row+", "+col+")"; }
	elem.className=className;
	return elem;
}
function isPlayerBoardUnit(r,c){
	return (r%2==0 && c%2==0); //둘다 짝수이면 playerUnit
}
function isObstacleBoardUnit(r,c){
	return (r%2==1 && c%2==1); //둘다 홀수이면 obstacleUnit
}


export function createObstacleInfo(id){
	let elem=document.createElement('div');
	elem.id=id+'obstacleInfo';
	elem.className='obstacleInfo';
	document.querySelector('#container').append(elem);
	for(let i=0;i<10;i++){
		elem.append(createObstacleElem(i,id));
	}
}
function createObstacleElem(idx,id){
	let elem=document.createElement('img');
	elem.className='obstacleUnit';
	elem.className+=" "+id+'Obstacle';
	elem.id=id+'ObstacleUnit'+idx;
	elem.src="./images/obstacle.png";
	elem.alt='obs';
	return elem;
}
export function createPlayerInfo(id){
	let elem=document.createElement('div');
	elem.id=id+'info';
	elem.className='playerInfo';
	document.querySelector('#container').append(elem);
	//elem.innerHTML = '<img src="./images/white1.png" alt="white"></img>';
	elem.innerText=id;
}
