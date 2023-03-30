import {Player} from "./Player.js";
import {Board, positionObstacleOnBoard, positionObstacleCenter} from "./Board.js";
import {Computer} from "./Computer.js";


export let board = new Board();
export let player1 = new Player("player1", "black",8,4);
export let player2 = new Player("player2", "white",0,4);
export let computer = new Computer("player2", "white",0,4);

const OBS_COLOR = '#c9a85c';
let _nowTurn = null;
let _nextTurn = null;
let dragedDir = null;
let obstacleBoardAdjId = []; // 장애물이 놓일 인접 칸의 id


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
function setObstacleTo(pos, imgId){ //장애물을 옮기는 함수
  
  let obstacleBoardId='o'+pos.row+pos.col;
  // let obstacleBoardAdjId = []; // 장애물이 놓일 인접 칸
  let boardElem = document.getElementById(obstacleBoardId);
  
  //document.getElementById(imgId).remove(); //이미지 없애고 칸을색칠하자

  if(pos.dir=='vertical'){
    obstacleBoardAdjId[0] = 'e'+(+pos.row*2) +'e' + (+pos.col*2+1);
    obstacleBoardAdjId[1] = 'e'+(+pos.row*2+2) +'e' + (+pos.col*2+1);
    boardElem.style.borderTopColor=OBS_COLOR;
    boardElem.style.borderBottomColor=OBS_COLOR;
  }
  else {
    obstacleBoardAdjId[0] = 'e'+(+pos.row*2+1) +'e' + (+pos.col*2);
    obstacleBoardAdjId[1] = 'e'+(+pos.row*2+1) +'e' + (+pos.col*2+2);
    boardElem.style.borderLeftColor=OBS_COLOR;
    boardElem.style.borderRightColor=OBS_COLOR;
  }
  console.log(obstacleBoardAdjId[0]);
  console.log(obstacleBoardAdjId[1]);

  boardElem.style.backgroundColor=OBS_COLOR; //색 설정
  document.getElementById(obstacleBoardAdjId[0]).style.backgroundColor=OBS_COLOR; //색 설정
  document.getElementById(obstacleBoardAdjId[1]).style.backgroundColor=OBS_COLOR; //색 설정
  
  boardElem.dataset.dir=pos.dir;
  
  board.setObstacleBoardArr(pos.row,pos.col,pos.dir); //obstacle

  setDisabled(boardElem); //?없ㅇ도 266행때문에 상관업슴. dir=none이아니먄!!
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
    //elem.addEventListener('mousedown',mousedownObstacle); //분리? 미사영
    //elem.addEventListener('mouseup',mouseupObstacle); //분리? 미사용
    //elem.addEventListener('dragstart',dragstartObstacle); //분리?
    //elem.addEventListener('dragend',dragendObstacle); //분리?
    //elem.addEventListener('click',clickObstacle); //분리?

    elem.onmousedown=mousedownObstacle;
  }
}
export function dragenterPlayer(event){
  this.style.backgroundColor ='yellow';
}
export function dragleavePlayer(event){
  this.style.backgroundColor ='';
}
export function dragstartPlayer(event){  //플레이어를 드래그 시작하면, 플레이어 칸에 이벤트 추가
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
  event.preventDefault(); //없으면 드롭안됨
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
let currentDroppable = null;
export function mousedownObstacle(event){ //미사용
   event.target.ondragstart= () => false;
  event.target.style.position = 'absolute'; //기본값 ""
  event.target.style.zIndex = 1000;
  
  function moveAt(pageX, pageY) {
    event.target.style.left = pageX - event.target.offsetWidth / 2 + 'px';
    event.target.style.top = pageY - event.target.offsetHeight / 2 + 'px';
  }
  moveAt(event.pageX, event.pageY);

  document.addEventListener('mousemove', onMouseMove);

  event.target.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    event.target.onmouseup = null;
  };

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
   
    event.target.hidden=true;
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    event.target.hidden=false;

    if (!elemBelow) return;
    let droppableBelow = elemBelow.closest('.obstacleBoardUnit'); //가장가까운 장애물보드
    //console.log(droppableBelow);
    if (currentDroppable != droppableBelow) {

      if (currentDroppable) {
        // '날아가는 것'을 처리하는 로직(강조 제거)
        //console.log(currentDroppable);
        currentDroppable.style.backgroundColor ='';

        document.getElementById(obstacleBoardAdjId[0]).style.backgroundColor=''; //색 설정
        document.getElementById(obstacleBoardAdjId[1]).style.backgroundColor=''; //색 설정
      }
      currentDroppable = droppableBelow;
      if (currentDroppable) {
        // '들어오는 것'을 처리하는 로직
        console.log(droppableBelow);
   
        droppableBelow.style.backgroundColor ='red';
        event.target.style.left = 22 + 'px';
        event.target.style.top = 32 + 'px';
        colorAdj(currentDroppable)
         //dropFunc(currentDroppable);
      }
    }
  }
  function colorAdj(elem){
    if(dragedDir=='vertical'){ //장애물 방향에 맞게 인접한 boardUnit의 아이디 설정
      obstacleBoardAdjId[0] = 'e'+(+elem.dataset.row*2) +'e' + (+elem.dataset.col*2+1);
      obstacleBoardAdjId[1] = 'e'+(+elem.dataset.row*2+2) +'e' + (+elem.dataset.col*2+1);
    }
    else {
      obstacleBoardAdjId[0] = 'e'+(+elem.dataset.row*2+1) +'e' + (+elem.dataset.col*2);
      obstacleBoardAdjId[1] = 'e'+(+elem.dataset.row*2+1) +'e' + (+elem.dataset.col*2+2);
    }
    elem.style.backgroundColor ='red';
    document.getElementById(obstacleBoardAdjId[0]).style.backgroundColor='red'; //색 설정
    document.getElementById(obstacleBoardAdjId[1]).style.backgroundColor='red'; //색 설정

  }
  function dropFunc(elem) {
    let dropObstacleInfo= {
      row : elem.dataset.row,
      col : elem.dataset.col,
      dir : dragedDir,
    }
    console.log(dropObstacleInfo);
    let possibleInfo = board.isPossibleObstacle(dropObstacleInfo,player1,player2,1);
    console.log(possibleInfo);
    if(possibleInfo.isPossible==false){ //위아래좌우 있어서 못놓음
      return;
    }
    //가능
    setObstacleTo(dropObstacleInfo,"imgId");
  }
}
export function mouseupObstacle(event){ //미사용
  document.removeEventListener('mousemove', onMouseMove);
  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
   
    event.target.hidden=true;
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    event.target.hidden=false;

    if (!elemBelow) return;
    let droppableBelow = elemBelow.closest('.obstacleBoardUnit'); //가장가까운 장애물보드
    //console.log(droppableBelow);
    if (currentDroppable != droppableBelow) {

      if (currentDroppable) {
        // '날아가는 것'을 처리하는 로직(강조 제거)
        console.log(currentDroppable);
        currentDroppable.style.backgroundColor ='';
      }
      currentDroppable = droppableBelow;
      if (currentDroppable) {
        // '들어오는 것'을 처리하는 로직
        console.log(droppableBelow);
   
        droppableBelow.style.backgroundColor ='red';
         //dropFunc(currentDroppable);
      }
    }
  }
  event.target.style.position = ''; //기본값 ""
  // event.target.style.left = 22 + 'px';
  // event.target.style.top = 32 + 'px';
 
  //ball.onmouseup = null;
  //console.log('mu');
  //positionObstacleCenter(this,event.pageX,event.pageY);
}
export function dragenterObstacle(event){
  event.preventDefault();
  console.log("enter");
  let pos={
    row : this.dataset.row,
    col : this.dataset.col,
  };

  if(dragedDir=='vertical'){ //장애물 방향에 맞게 인접한 boardUnit의 아이디 설정
    obstacleBoardAdjId[0] = 'e'+(+pos.row*2) +'e' + (+pos.col*2+1);
    obstacleBoardAdjId[1] = 'e'+(+pos.row*2+2) +'e' + (+pos.col*2+1);
  }
  else {
    obstacleBoardAdjId[0] = 'e'+(+pos.row*2+1) +'e' + (+pos.col*2);
    obstacleBoardAdjId[1] = 'e'+(+pos.row*2+1) +'e' + (+pos.col*2+2);
  }
  this.style.backgroundColor ='red';
  document.getElementById(obstacleBoardAdjId[0]).style.backgroundColor='red'; //색 설정
  document.getElementById(obstacleBoardAdjId[1]).style.backgroundColor='red'; //색 설정
}
export function dragleaveObstacle(event){
  this.style.backgroundColor ='';
  document.getElementById(obstacleBoardAdjId[0]).style.backgroundColor=''; //색 설정
  document.getElementById(obstacleBoardAdjId[1]).style.backgroundColor=''; //색 설정
}
export function dragstartObstacle(event){
  event.preventDefault(); //드래그기본모션 삭제
  console.log(event.target);
  event.dataTransfer.setData('imgId',event.target.id);
  dragedDir=event.target.dataset.dir; //현재 드래그객체 방향
  
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
  console.log(this.id + ' dragend!')
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
  console.log("@");
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
  //document.getElementById("o"+dropObstacleInfo.row+dropObstacleInfo.col).style.backgroundColor=OBS_COLOR;
 
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
