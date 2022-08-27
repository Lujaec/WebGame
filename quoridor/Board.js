class Board{
    constructor(){

    }
    getBoardElement(){
        let board=document.createElement('div');
				board.id="board";
				console.log("getBoarElement");
				for(let i=0;i<8;i++){
					for(let j=0;j<9;j++){
						let boardPlayerOn=document.createElement('div');
						boardPlayerOn.className="bdPlayer";
						boardPlayerOn.id="bd"+i+j;
						boardPlayerOn.setAttribute("data-row",i); //어차피문자열변환
						boardPlayerOn.setAttribute("data-col",j); //어차피문자열변환
					}
				}
				document.body.append(board);
    }
		test(){
			console.log("TEST");
		}
}