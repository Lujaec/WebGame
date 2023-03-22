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

  document.getElementById(before.getName()+'info').style.backgroundColor='';
  document.getElementById(after.getName()+'info').style.backgroundColor='red'; //현재턴표시
  console.log('----------'+getNowTurn().getId()+' 턴 시작----------');

  let beforeObstacles=document.querySelectorAll('.'+before.getName()+'Obstacle');
  setDisabled(before.getElem());  //이전 플레이어의 토큰 이미지 이벤트 비활성화
  for(let elem of beforeObstacles){
    setDisabled(elem); //이전플레이어 장애물 비활성화
  }

  if(getNowTurn().getId()=='computer'){ //컴퓨터 차례
    let computerChoice = player2.getComputerChoice(board,player1,player2);
    //sleep(1000);
    if(computerChoice.select == 'move'){ //움직임 존재
      moveTo(getNowTurn().getPos(), computerChoice, getNowTurn()); 
    }
    else if(computerChoice.select == 'obs') { //장애물 설치
      console.log('장애물설치');
      //제일 앞에서 아무 장애물 이미지요소 가져옴
      let imgId=document.querySelector('.player2Obstacle').id;
     
      setObstacleTo(computerChoice,imgId);
    }
    changeTurn(getNowTurn(),getNextTurn()); //재귀스택?
    return;
  }
  

  let afterObstacles=document.querySelectorAll('.'+after.getName()+'Obstacle');
  for(let elem of afterObstacles){
    if(elem.dataset.isPositioned=='true') { continue; } // 이미 놓인 장애물은 건들지마
    setAbled(elem); //현재 플레이어 장애물 활성화
  }
  setAbled(after.getElem());      //현재 플레이어의 토큰 이미지 이벤트 비활성화

  
}
function moveTo(before, after, who){
  console.log(who.getColor()+' move '+before.row+before.col+' to ' + after.row+after.col);
  board.setPlayerBoardArr(before,after,who);
  who.setPos(after.row,after.col); //순서?
  let imgElem=document.getElementById('img'+who.getColor());  //옮길 이미지 요소

  let playerBoardId='p'+after.row+after.col;
  document.getElementById(playerBoardId).append(imgElem);
  //board.printPlayerBoardArr();
}
function setObstacleTo(pos, imgId){
  console.log(imgId);
  let imgElem=document.getElementById(imgId);  //옮길 이미지 요소
 
  //아무거나 가져왓으니가 방향설정
  if(pos.dir=='vertical'){
    imgElem.src="./images/obstacleVertical.png";
    imgElem.dataset.dir='vertical';
  }
  else {
    imgElem.src="./images/obstacleHorizontal.png";
    imgElem.dataset.dir='horizontal';
  }

  let obstacleBoardId='o'+pos.row+pos.col;
  document.getElementById(obstacleBoardId).append(imgElem);
  document.getElementById(obstacleBoardId).dataset.dir=pos.dir;
  console.log(document.getElementById(obstacleBoardId));
 
  positionObstacleOnBoard(imgElem,pos.row,pos.col); //img요소, row, col //보드에 맞는 css 표시
  imgElem.dataset.isPositioned='true';
  setDisabled(imgElem); //놓은곳은 이벤트 제거
  
  board.setObstacleBoardArr(pos.row,pos.col,pos.dir); //obstacle
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
export function dragenterPlayer(event){
  this.style.backgroundColor ='yellow';
}
export function dragleavePlayer(event){
  this.style.backgroundColor ='';
}
export function dragstartPlayer(event){ 
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

  this.style.backgroundColor ='';
  if(!board.isPossibleMove(beforePos,afterPos,0)){
    return;
  }
  
  
  moveTo(beforePos, afterPos, getNowTurn());
  //board.printPlayerBoardArr();

  let leftDest1 = board.isPlayerReachableBFS(player1,board.getObstacleBoardArr(),0);
  let leftDest2 = board.isPlayerReachableBFS(player2,board.getObstacleBoardArr(),8);
  console.log(`player1은 ${leftDest1}번 만에 도착 가능합니다`);
  console.log(`player2은 ${leftDest2}번 만에 도착 가능합니다`);
  
  board.checkWin(getNowTurn());
  console.log('---'+getNowTurn().getName()+' 턴 종료---');
  changeTurn(getNowTurn(),getNextTurn());
 
}
///////////////////////////////////////////////////////////
export function mousedownObstacle(event){ //미사용
  //console.log(this);
  //positionObstacleCenter(this,event.pageX,event.pageY);
}
export function mouseupObstacle(event){ //미사용
  //console.log('mu');
  //positionObstacleCenter(this,event.pageX,event.pageY);
}
export function dragenterObstacle(event){
  this.style.backgroundColor ='red';
  let obsDir=event.dataTransfer.getData('obsDir');
  console.log(obsDir);
}
export function dragleaveObstacle(event){
  this.style.backgroundColor ='';
}
export function dragstartObstacle(event){
  
  event.dataTransfer.setData('imgId',event.target.id);
  event.dataTransfer.setData('obsDir',event.target.dataset.dir);
 
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
export function dropObstacle(event){ //이거동 imgelem아니고 좌표애서
  event.preventDefault();

  let imgId=event.dataTransfer.getData('imgId');
  

  let dropObstacleInfo= {
    row : event.target.dataset.row,
    col : event.target.dataset.col,
    dir : document.getElementById(imgId).dataset.dir
  }

  this.style.backgroundColor ='';
  let possibleInfo = board.isPossibleObstacle(dropObstacleInfo,player1,player2,1);
  console.log(possibleInfo);
  if(possibleInfo.isPossible==false){ //위아래좌우 있어서 못놓음
    return;
  }
  //가능
  setObstacleTo(dropObstacleInfo,imgId);
 
  console.log('---'+getNowTurn().getName()+' 턴 종료---');
  changeTurn(getNowTurn(),getNextTurn());
}
export function clickObstacle(event){
 // console.log('clikck!!');
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
