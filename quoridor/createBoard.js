export function createBoard(id,size){
	let board=document.createElement('table');
	board.id=id;
	console.log(id+"making");
	createTable(board,size,id+'Unit');	
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
	document.querySelector('#container').append(board);
}
function createBoardUnit(row, col, className) {
	let elem=document.createElement('td');
	elem.id="pbu"+row+col;
	elem.setAttribute("data-row",row); //어차피문자열변환
	elem.setAttribute("data-col",col); //어차피문자열변환
	if(className == 'playerBoardUnit'){ elem.innerHTML="("+row+", "+col+")"; }
	elem.className=className;
	return elem;
}

export function createObstacleInfo(id){
	let elem=document.createElement('div');
	elem.id=id;
	elem.className='info';
	document.querySelector('#container').append(elem);
}
