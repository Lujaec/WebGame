class Board{
    constructor(){

    }
    getBoardElement(){
        let board=document.createElement('table');
				board.id="boardPlayer";
				console.log("getBoarElement");
				for(let i=0;i<9;i++){
					let boardRow = document.createElement('tr');
					for(let j=0;j<9;j++){
						let boardUnit=document.createElement('td');
						boardUnit.id="bd"+i+j;
						boardUnit.setAttribute("data-row",i); //어차피문자열변환
						boardUnit.setAttribute("data-col",j); //어차피문자열변환
						boardUnit.innerHTML="("+i+", "+j+")";
						boardUnit.className="boardUnitPlayer";
						boardRow.append(boardUnit);
					}
					board.append(boardRow);
				}
				document.body.append(board);
    }
		getCanvas(){
			let board=document.createElement('table');
				board.id="boardObstacle";
				console.log("getInnerBoardElement");
				for(let i=0;i<8;i++){
					let boardRow = document.createElement('tr');
					for(let j=0;j<8;j++){
						let boardUnit=document.createElement('td');
						boardUnit.id="bd"+i+j;
						boardUnit.setAttribute("data-row",i); //어차피문자열변환
						boardUnit.setAttribute("data-col",j); //어차피문자열변환
						boardUnit.innerHTML="("+i+", "+j+")";
						boardUnit.className="boardUnitObstacle";
						boardRow.append(boardUnit);
					}
					board.append(boardRow);
				}
				document.body.append(board);
		}
}