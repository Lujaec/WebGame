
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
  moveComputer(board,player1,player2){
    console.log('컴퓨터 움직이자');
    let bestChoice=null;
    bruteforceObstacle(board,player1,player2);



    function bruteforceObstacle(board,player1,player2){ //모든 위치에 장애물을 놓아서 컴퓨터 vs 플레이어의 이동거리 증가 비교
      let obsBoard = board.getObstacleBoardArr();
      console.log(player1,player2);
      for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
          if(obsBoard[i][j]!=-1){ //보드에 이미 장애물이 있는 경우
            continue;
          }
          let dirArr=['vertical', 'horizontal'];
          for(let k=0;k<2;k++){
            let obsInfo = board.isPossibleObstacle(i,j,dirArr[k],player1,player2,0); 
            console.log(`(${i},${j})에 설치해봄`);
            console.log(obsInfo);
          }
          
          
          
          
        }
      }
    }
  }
  
}

