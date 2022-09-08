import {Player} from "./Player.js";
import {Board, positionObstacleOnBoard, positionObstacleCenter} from "./Board.js";
import {Computer} from "./Computer.js";


export let board = new Board();
export let player1 = new Player("player1", "black",8,4);
export let player2 = new Player("player2", "white",0,4);
export let computer = new Computer("player2", "white",0,4);

let _nowTurn = null;
let _nextTurn = null;
function setNowTurn(player){ _nowTurn=player;}
function getNowTurn(){ return _nowTurn;}

function setNextTurn(player) { _nextTurn=player;}
function getNextTurn() { return _nextTurn;}

export function gameStart(gameMode){ //2인용
  console.log(gameMode);

  document.querySelector('.modal').classList.add('hidden'); //모달창 종료
  board.setPlayerBoardArr(player1.getPos(),player1.getPos(),player1); //playerBoard에 올려줌
  board.setPlayerBoardArr(player2.getPos(),player2.getPos(),player2); //playerBoard에 올려줌
  player1.initElem('black'); //elem을 토큰이미지요소로
  player2.initElem('white');

  document.querySelector(player1.getTableId()).append(player1.getElem());
  document.querySelector(player2.getTableId()).append(player2.getElem());
  
  initPlayerEvents(gameMode);
  initObstacleEvents();

  setNowTurn(player2);
  setNextTurn(player1);

  changeTurn(getNowTurn(),getNextTurn());
  //changeTurn(player2,player1);
}
export function gameStartComputer(){ //1인용플레이
  player2=computer; //플레이어2 컴퓨터로 설정
  document.querySelector('#player2info').innerHTML='<img src=./images/white.png alt="white"></img>Computer'; //위에 문구 바꿈

  document.querySelector('.modal').classList.add('hidden'); //모달창 종료
  board.setPlayerBoardArr(player1.getPos(),player1.getPos(),player1); //playerBoard에 올려줌
  board.setPlayerBoardArr(player2.getPos(),player2.getPos(),player2); //playerBoard에 올려줌
  player1.initElem('black'); //elem을 토큰이미지요소로
  player2.initElem('white');

  document.querySelector(player1.getTableId()).append(player1.getElem());
  document.querySelector(player2.getTableId()).append(player2.getElem());
  
  initPlayerEvents('vsComputer');
  initObstacleEvents('vsComputer');

  setNowTurn(player2);
  setNextTurn(player1);

  changeTurn(getNowTurn(),getNextTurn());
  //changeTurn(player2,player1);
}
export function changeTurn(before,after){
  setNowTurn(after);
  setNextTurn(before);
  //console.log(getNowTurn());
  //console.log(getNextTurn());

  document.getElementById(before.getName()+'info').style.backgroundColor='';
  document.getElementById(after.getName()+'info').style.backgroundColor='red'; //현재턴표시
  console.log('---'+getNowTurn().getId()+' 턴 시작---');

  let beforeObstacles=document.querySelectorAll('.'+before.getName()+'Obstacle');
  setDisabled(before.getElem());  //이전 플레이어의 토큰 이미지 이벤트 비활성화
  for(let elem of beforeObstacles){
    setDisabled(elem); //이전플레이어 장애물 비활성화
  }

  if(getNowTurn().getId()=='computer'){
    console.log('컴퓨터 차례!!');
    player2.moveComputer();
    changeTurn(getNowTurn(),getNextTurn());
    return;
  }
  

  let afterObstacles=document.querySelectorAll('.'+after.getName()+'Obstacle');
  for(let elem of afterObstacles){
    if(elem.dataset.isPositioned=='true') { continue; } // 이미 놓인 장애물은 건들지마
    setAbled(elem); //현재 플레이어 장애물 활성화
  }
  setAbled(after.getElem());      //현재 플레이어의 토큰 이미지 이벤트 비활성화


  //board.printPlayerBoardArr();
  //board.printObstacleBoardArr();

  //console.log(player1);
  //console.log(player2);
  
}

function setDisabled(elem){
  elem.style.pointerEvents = 'none';
}
function setAbled(elem){
  elem.style.cursor ='pointer';
  elem.style.pointerEvents = 'auto';
}





function initPlayerEvents(gameMode){
  player1.getElem().addEventListener('dragstart',dragstartPlayer); //분리?
  player1.getElem().addEventListener('dragend',dragendPlayer); //분리?
  if(gameMode=='vsPlayer'){
    //console.log('이벤트리스너들어가');
    player2.getElem().addEventListener('dragstart',dragstartPlayer); //분리?
    player2.getElem().addEventListener('dragend',dragendPlayer); //분리?
  }
  
}
function initObstacleEvents(gameMode){
  let obstacleUnits = document.querySelectorAll('.obstacleUnit'); //컴푸터일때 선택못하게 하던지, 아니면 커서 막든지
  //console.log(obstacleUnits);
  for(let elem of obstacleUnits){
    elem.addEventListener('mousedown',mousedownObstacle); //분리?
    elem.addEventListener('mouseup',mouseupObstacle); //분리?
    elem.addEventListener('dragstart',dragstartObstacle); //분리?
    elem.addEventListener('dragend',dragendObstacle); //분리?
    elem.addEventListener('click',clickObstacle); //분리?

  }
}
function moveTo(before, after, who){
  who.setPos(after.row,after.col);
  board.setPlayerBoardArr(before,after,who);
  //board.printPlayerBoardArr();
}

export function dragenterPlayer(event){
  this.style.backgroundColor ='yellow';
}
export function dragleavePlayer(event){
  this.style.backgroundColor ='';
}
export function dragstartPlayer(event){ //플레이어를 드래그하면 이벤트를 생기게?? //여기에 이벤트4개 넣어랴?

  //console.log(this.id + ' dragstart!')
  event.dataTransfer.setData('imgId',event.target.id);
  event.dataTransfer.setData('beforeRow',getNowTurn().getPos().row);
  event.dataTransfer.setData('beforeCol',getNowTurn().getPos().col);
  let playerBoardUnits = document.querySelectorAll('.playerBoardUnit');
  for(let elem of playerBoardUnits){
    elem.addEventListener('dragenter',dragenterPlayer);
    elem.addEventListener('dragleave',dragleavePlayer);
    elem.addEventListener('dragover',dragoverPlayer);
    elem.addEventListener('drop',dropPlayer);
  }
}
export function dragendPlayer(event){ //플레이어를 드래그끝내면
  //console.log(this.id + ' dragend!')
  let playerBoardUnits = document.querySelectorAll('.playerBoardUnit');
  for(let elem of playerBoardUnits){
    elem.removeEventListener('dragenter',dragenterPlayer);
    elem.removeEventListener('dragleave',dragleavePlayer);
    elem.removeEventListener('dragover',dragoverPlayer);
    elem.removeEventListener('drop',dropPlayer);
  }
}
export function dragoverPlayer(event){
  event.preventDefault(); 
}
export function dropPlayer(event){
  event.preventDefault();
  let data=event.dataTransfer.getData('imgId'); //옮길 이미지요소의 id
  let beforeRow=event.dataTransfer.getData('beforeRow');
  let beforeCol=event.dataTransfer.getData('beforeCol');
  let beforePos = { //플레이어의 드롭 전 위치
    row : beforeRow,
    col : beforeCol,
  }
  let afterPos = {  //플레이어의 드롭 후 위치
    row : this.dataset.row,
    col : this.dataset.col,
  }
  let imgElem=document.getElementById(data);  //옮길 이미지 요소
  this.style.backgroundColor ='';
  if(!board.isPossibleMove(beforePos,afterPos,0)){
    //console.log('playermovenoooooooooooooooo');
    return;
  }

  event.target.append(imgElem);  //목적지에 추가
  moveTo(beforePos, afterPos, getNowTurn());
  board.checkWin(getNowTurn());
  console.log('---'+getNowTurn().getName()+' 턴 종료---');
  changeTurn(getNowTurn(),getNextTurn());
 
}
///////////////////////////////////////////////////////////
export function mousedownObstacle(event){
  console.log(this);
  //positionObstacleCenter(this,event.pageX,event.pageY);
}
export function mouseupObstacle(event){
  console.log('mu');
  //positionObstacleCenter(this,event.pageX,event.pageY);
}
export function dragenterObstacle(event){
  this.style.backgroundColor ='yellow';
}
export function dragleaveObstacle(event){
  this.style.backgroundColor ='';
}
export function dragstartObstacle(event){
  //console.log(this.id + ' dragstart!')
  event.dataTransfer.setData('imgId',event.target.id);
  let obstacleBoardUnits = document.querySelectorAll('.obstacleBoardUnit');
  for(let elem of obstacleBoardUnits){
    if(elem.dataset.dir!='none'){ //장애물이 존재하는 셀에는 이벤트추가안함.
      continue;
    }
    elem.addEventListener('dragenter',dragenterObstacle);
    elem.addEventListener('dragleave',dragleaveObstacle);
    elem.addEventListener('dragover',dragoverObstacle);
    elem.addEventListener('drop',dropObstacle);
  }
}
export function dragendObstacle(event){ //플레이어를 드래그끝내면
  //console.log(this.id + ' dragend!')
  let obstacleBoardUnits = document.querySelectorAll('.obstacleBoardUnit');
  for(let elem of obstacleBoardUnits){
    elem.removeEventListener('dragenter',dragenterObstacle);
    elem.removeEventListener('dragleave',dragleaveObstacle);
    elem.removeEventListener('dragover',dragoverObstacle);
    elem.removeEventListener('drop',dropObstacle);
  }
}
export function dragoverObstacle(event){
  event.preventDefault(); 
}
export function dropObstacle(event){ 
  event.preventDefault();
  //console.log(this.id + ' drop!');
  let data=event.dataTransfer.getData('imgId');
  let imgElem=document.getElementById(data);
  let row = event.target.dataset.row;
  let col = event.target.dataset.col;
  this.style.backgroundColor ='';
  if(!board.isPossibleObstacle(row,col,imgElem.dataset.dir,player1,player2)){ //위아래좌우 있어서 못놓음
    return;
  }
  event.target.append(imgElem);
  event.target.dataset.dir=imgElem.dataset.dir;
  positionObstacleOnBoard(imgElem,row, col); //img요소, row, col //보드에 맞는 css 표시
  imgElem.dataset.isPositioned='true';
  setDisabled(imgElem); //놓은곳은 이벤트 제거
  
  board.setObstacleBoardArr(row,col,imgElem.dataset.dir); //obstacle 보드에 장애물 정보 추가
  
  console.log('---'+getNowTurn().getName()+' 턴 종료---');
  changeTurn(getNowTurn(),getNextTurn());
}
export function clickObstacle(event){
  console.log('clikck!!');
  //console.log(event.target.src);
  if(event.target.dataset.dir=='vertical'){
    event.target.src="./images/obstacleHorizontal.png";
    event.target.dataset.dir='horizontal';
  }
  else {
    event.target.src="./images/obstacleVertical.png";
    event.target.dataset.dir='vertical';
  }

}