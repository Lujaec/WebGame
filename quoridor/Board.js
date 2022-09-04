
export class Board{
    constructor(){
			this._playerBoardArr = Array.from(Array(9), () => Array(9).fill(0));
			this._obstacleBoardArr = Array.from(Array(8), () => Array(8).fill(-1));
			//table ->보드 참ㄴ조
			let playerBoardUnits = document.querySelectorAll('.playerBoardUnit');
			let obstacleBoardUnits = document.querySelectorAll('.obstacleBoardUnit');
			/* for(let elem of playerBoardUnits){
				elem.dataset.value=
			} */
    }
		getplayerBoardArr(){ //set없어도?
			return this._boardArr;
		}
		getObstacleBoardArr(){ //set없어도?
			return this._obstacleBoardArr;
		}
		setPlayerBoardArr(before, after, who){ //비포애프터로해
			this._playerBoardArr[before.row][before.col]=0;
			this._playerBoardArr[after.row][after.col]=who;

		}
		setObstacleBoardArr(row,col,dir){
			this._obstacleBoardArr[row][col]=dir;
		}
		printPlayerBoardArr(){
			console.table(this._playerBoardArr);
		}
		printObstacleBoardArr(){
			console.table(this._obstacleBoardArr);
		}
	
		isPossibleObstacle(row, col, dir){ // 놓는곳의 좌우/위아래 같은장애물 조사
			//console.log(dir);
			let direction = {
				'vertical' : [[1,0], [-1,0]],
				'horizontal' : [[0,1], [0,-1]],
			}
			console.log(`(${row}, ${col})에 dir 장애물 설치`);
			for(let i=0;i<2;i++){
				let newRow=+row+direction[dir][i][0];
				let newCol=+col+direction[dir][i][1];
				//console.log(newRow,newCol);
				//console.log(this._obstacleBoardArr[newRow][newCol]);
				if(!this.isValidIndex(8,newRow,newCol)){ //범위 밖은 조사안함
					continue;
				}
				if(this._obstacleBoardArr[newRow][newCol]==dir){
					console.log('겹쳐서 설치할수 없습니다');
					return false;
				} 
			}
			return true;
		}
		isPossibleMove(before,after,ignorePlayer){ //점프 코드를 돌리기 위해 플레이어 무시하고 장애물만 검사

			console.log(`(${before.row}, ${before.col})에서 (${after.row}, ${after.col}) `);
			let distance2=(after.row - before.row)**2 + (after.col - before.col)**2;
			if( distance2!= 1) { //한칸떨어진게 아니면 false
				if(distance2==2 && isPossibleJumpL.call(this,before,after)){
					console.log('플레이어를 "L"자로 뛰어넘습니다');
					return true;
				}
				else if(distance2==4 && isPossibleJumpI.call(this,before,after)){
					console.log('플레이어를 "I"자로 뛰어넘습니다');
					return true;
				}
				console.log('한칸만 움직이세요');
				return false;
			}

			function isPossibleJumpL(before,after){ 
				let mid={};
				let progress={};
				if(this._playerBoardArr[after.row][before.col]!=0){ //before에서 세로-가로로 꺾인 모양
					mid.row=after.row;
					mid.col=before.col;
					progress.row= +before.row + +2*(after.row-before.row);
					progress.col=before.col;
				}
				else if(this._playerBoardArr[before.row][after.col]!=0){ //before에서 가로-세로로 꺾인 모양
					mid.row=before.row;
					mid.col=after.col;
					progress.row=before.row;
					progress.col= +before.col + +2*(after.col-before.col);
				}
				else {
					console.log('플레이어도없는데 왜 L점프하세요?');
					return false;
				}
				console.log(mid);
				console.log(progress);
				console.log(this.isPossibleMove(before,mid,true));
				console.log(this.isPossibleMove(mid,after,true));
				if( !this.isValidIndex(9,progress.row,progress.col) || this.isPossibleMove(mid,progress) ){// 진행방향 너머가 인덱스오버가 아니면서 막혀있을떄
					console.log('플레이어 너머가 맵 밖이거나, I자 점프가 가능하네요');
					return false;
				}
				return ( this.isPossibleMove(before,mid,true) && this.isPossibleMove(mid,after,true));  //두개가 가능한 움직임이고,
				
			} 
			function isPossibleJumpI(before,after){ 
				//console.table(this._playerBoardArr);
				let mid={};
				if(before.col==after.col){ //위아래점프
					mid.row = (+before.row+ +after.row)/2;
					mid.col = +after.col;
				}
				else if(before.row==after.row){ //좌우로점프
					mid.row = +after.row;
					mid.col = (+before.col+ +after.col)/2;
				}
				if(this._playerBoardArr[mid.row][mid.col]==0){
					console.log('플레이어도없는데 왜 I 점프하세요?');
					return false;
				}
				//console.log(mid.row,mid.col);
				return (this.isPossibleMove(before,mid,true) && this.isPossibleMove(mid,after,true));
				//얘는 ㅜ조건 이거아니면 저거 중에 하나네
			}



			if(this._playerBoardArr[after.row][after.col]!=0 && ignorePlayer==false){
				console.log('플레이어가 존재합니다');
				return false;
			}
			let obsLT=this.isValidIndex(8,before.row-1,before.col-1) ? this._obstacleBoardArr[before.row-1][before.col-1] : 'out';
			let obsRT=this.isValidIndex(8,before.row-1,before.col) ? this._obstacleBoardArr[before.row-1][before.col] : 'out';
			let obsLB=this.isValidIndex(8,before.row,before.col-1) ? this._obstacleBoardArr[before.row][before.col-1] : 'out';
			let obsRB=this.isValidIndex(8,before.row,before.col) ? this._obstacleBoardArr[before.row][before.col] : 'out';
			//console.log(obsLT, obsRT, obsLB, obsRB);

			if(after.row < before.row){ //위로
				//console.log( (obsLT!='horizontal' && obsRT!= 'horizontal') + '위');
				return (obsLT!='horizontal' && obsRT!= 'horizontal');
			}
			else if(after.row > before.row){ //아래로
				//console.log((obsLB!='horizontal' && obsRB!= 'horizontal') + '아래');
				return (obsLB!='horizontal' && obsRB!= 'horizontal');
			}
			else if(after.col < before.col){ //좌로
				//console.log((obsLT!='vertical' && obsLB!= 'vertical') + '좌');
				return (obsLT!='vertical' && obsLB!= 'vertical');
			}
			else if(after.col > before.col){ //우로
				//console.log((obsRT!='vertical' && obsRB!= 'vertical')+'우');
				return (obsRT!='vertical' && obsRB!= 'vertical');
			}
			else {  
				console.log('이런경우는없다'); 
			}

			return true;
			
		}
		isValidIndex(size,row,col){
			return !(row<0 || row>=size || col<0 || col>=size);
		}
		checkWin(player){
			//console.log(player);
			if(player.getName()=='player1'){
				if(player.getPos().row==0){
					alert('player1 win!');
				}
			}
			else if(player.getName()=='player2'){
				if(player.getPos().row==8){
					alert('player2 win!');
				}
			}
			else {
				console.log('이거아니다나오면안돼ㅐㅔ');
			}
		}
}

export function initBoardEvents(){
	let tds = document.querySelectorAll('td');
	for(let elem of tds){
		elem.onclick = function(event){
			let target = event.target;
			console.log(`${target.dataset.row}, ${target.dataset.col} ${target.className} ${target.id}`);
		}
	}
}

export function positionObstacleOnBoard(elem, row, col){
	//console.log(elem);
	if(elem.dataset.dir=='vertical'){
  	elem.style.top=row * 70 + 'px';
		elem.style.left=col * 70 + 50 + 'px';
	}
	else {
		elem.style.top=row * 70 + 50 + 'px';
		elem.style.left=col * 70 + 'px';
	}
}
