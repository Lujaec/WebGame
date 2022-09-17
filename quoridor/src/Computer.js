import { Queue } from "./Board.js";
export class Computer {
  constructor(name, color, row, col){
      this._name = name;
      this._color = color;
      this._leftObstacles = 10;
      this._isMyTurn = false; //네명 모두 초기값 false
      this._pos = {
          row : row,
          col : col,
      }
      this._elem=null;
      this._id='computer';
  }   
  getName() { return this._name; }
  setName() {} //굳이 필요없는대ㅔ?

  getLeftObstacles() { return this._leftObstacles ;}
  setLeftObstacles(value_Number){ this._leftObstacles = value_Number;}

  getIsMyTurn() { return this._isMyTurn ;}
  setIsMyTurn(value_Bool){ this._isMyTurn = value_Bool;}

  getPos() { return this._pos; }
  setPos(r,c) { this._pos.row = r, this._pos.col = c; }  //rc말고객체

  getElem() { return this._elem; }
  setElem(elem) { this._elem=elem; }

  initElem(color){ //crateboard로
      let imgElem=document.createElement('img');
      imgElem.src="./images/"+color+".png";
      imgElem.id='img'+color;
      imgElem.className='imgPlayer';
      this.setElem(imgElem);
  }
  getTableId(){ return '#p'+this._pos.row + this._pos.col;}
  getId(){
    return this._id;
  }
  getComputerMove(board,player1,player2){
    console.log('컴퓨터 움직이자');
    let bestChoice=null;
    let resultBruteforce = bruteforceObstacle(board,player1,player2);
    console.log(resultBruteforce);
    if(resultBruteforce.awayFarthest==0){ //플레이어가 더 멀어지지않음 -> 움직이기
      //bfs 백트래킹하기
      let move = getMoveBFS(board,player2);
      console.log('computer move to' + move.row + move.col);
      return move;
    }


    function bruteforceObstacle(board,player1,player2){ //모든 위치에 장애물을 놓아서 컴퓨터 vs 플레이어의 이동거리 증가 비교
      let obsBoard = board.getObstacleBoardArr();
      //console.log(player1,player2);
      let originDistance = {
        player : board.isPlayerReachableBFS(player1,board,0),
        computer : board.isPlayerReachableBFS(player2,board,8),
      };
      let bestChoice = { 
        awayFarthest : 0, //플레이어가 최고 멀어지는 거리
        distancePlayerObstacle : 987654321, //플레이어와 장애물 사이거리 최소로
        row : null,
        col : null,
        dir : null,
      };
      console.log('player1 원래 도달거리 '+ originDistance.player);
      console.log('computer 원래 도달거리 '+ originDistance.computer);

      for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
          if(obsBoard[i][j]!=-1){ //보드에 이미 장애물이 있는 경우
            continue;
          }
          let dirArr=['vertical', 'horizontal'];
          for(let k=0;k<2;k++){
            let obsInfo = board.isPossibleObstacle(i,j,dirArr[k],player1,player2,0); 
            if(obsInfo.isPossible ==false){ //겹침으로 설치 불가능
              continue;
            }
            let increasePlayerDistance = obsInfo.minDepth1 - originDistance.player;
            let increaseComputerDistance = obsInfo.minDepth2 - originDistance.computer;
            let playerFurtherAway = increasePlayerDistance - increaseComputerDistance;
            //플레이어와 장애물 거리//17*17 table에서 계산
            let distacePO = Math.abs(player1.getPos().row*2 - (i*2 +1)) 
                              + Math.abs(player1.getPos().col*2 - (j*2 +1)) ;
            //console.log('y거리 : ' + Math.abs(player1.getPos().row*2 - (i*2 +1)));
            //console.log('x거리 : ' + Math.abs(player1.getPos().col*2 - (j*2 +1)));

            //console.log(`(${i},${j})에 ${dirArr[k]} 설치해봄`);
            //console.log(`플레이어 ${increasePlayerDistance}칸, 컴퓨터 ${increaseComputerDistance}칸 늘어남`);
            //console.log('플레이어가 손해본 칸수 : ' +playerFurtherAway + '  거리 : '+ distacePO);
            

            if(playerFurtherAway > bestChoice.awayFarthest){ //플레이어를 가장 멀어지게 하는 경우
              bestChoice.awayFarthest = playerFurtherAway;
              bestChoice.distancePlayerObstacle = distacePO;
              bestChoice.row = i;
              bestChoice.col = j;
              bestChoice.dir = dirArr[k];
            }
            else if(playerFurtherAway == bestChoice.awayFarthest  //멀어지는게 같으면 가까운곳으로
                    && distacePO < bestChoice.distancePlayerObstacle){
              bestChoice.awayFarthest = playerFurtherAway;
              bestChoice.distancePlayerObstacle = distacePO;
              bestChoice.row = i;
              bestChoice.col = j;
              bestChoice.dir = dirArr[k];
            }
          }
          
          
          
          
        }
      }
      return bestChoice;
    }
    function getMoveBFS(board,player2){ //컴퓨터가 처음 이동할 위치 찾기
      const dy = [1,0,-1,0]; //아래,좌,위,우
      const dx = [0,-1,0,1];
      
      let visitedArr = Array.from(Array(9), () => Array(9).fill(0));
      let depth=0;
      let queue= new Queue();
      let initPos = {
        row : player2.getPos().row,
        col : player2.getPos().col,
        firstDir : -1, //맨 처음 움직인 방향
      }
      queue.enqueue(initPos);
      while(!queue.empty()){
        let qs=queue.size();
        for(let i=0;i<qs;i++){
          let deq = queue.dequeue();
          if(deq.row==8){
           
						//return deq.firstDir;
            return {
              row : player2.getPos().row + dy[deq.firstDir],
              col : player2.getPos().col + dx[deq.firstDir],
            }
					}
          for(let j=0;j<4;j++){
						let newPos={
							row : +deq.row+ +dy[j],
							col : +deq.col+ +dx[j],
              //dir이 첫 움직임이면 설정
              firstDir : (deq.firstDir == -1 ? j : deq.firstDir),
						}
						if(!board.isValidIndex(9,newPos.row,newPos.col)){
							continue;
						}
						if(visitedArr[newPos.row][newPos.col]==0 && board.isPossibleMove(deq,newPos,true)){ //  미방문이면
							
							queue.enqueue(newPos);
							visitedArr[newPos.row][newPos.col]=1;
						}
					}
        }
        depth++;
      }
      return false; //이런경우는 없음 이동못하는 경우가없으므로
    }
  }
  
}

