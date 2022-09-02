import {Player} from "./Player.js";
import {Board, initBoardEvents} from "./Board.js";
//* as events from "./dragEvents.js";


export let board = new Board();
export let player1 = new Player("player1", "black",8,4);
export let player2 = new Player("player2", "white",0,4);


let _nowTurn = null;
let _nextTurn = null;
function setNowTurn(player){ _nowTurn=player;}
function getNowTurn(){ return _nowTurn;}

function setNextTurn(player) { _nextTurn=player;}
function getNextTurn() { return _nextTurn;}

export function gameStart(){
  board.setPlayerBoardArr(player1.getPos(),player1.getPos(),player1); //playerBoard에 올려줌
  board.setPlayerBoardArr(player2.getPos(),player2.getPos(),player2); //playerBoard에 올려줌
  player1.initElem('black'); //elem을 토큰이미지요소로
  player2.initElem('white');
  
  document.querySelector(player1.getId()).append(player1.getElem());
  document.querySelector(player2.getId()).append(player2.getElem());
  
  initPlayerEvents();
  initObstacleEvents();

  setNowTurn(player2);
  setNextTurn(player1);

  changeTurn(getNowTurn(),getNextTurn());
  //changeTurn(player2,player1);
}
export function changeTurn(from,to){
  setNowTurn(to);
  setNextTurn(from);

  document.getElementById(from.getName()+'info').style.backgroundColor='';
  document.getElementById(to.getName()+'info').style.backgroundColor='red'; //현재턴표시
  console.log('nowTurn : '+getNowTurn().getName());

  setUndraggable(from.getElem());
  setdraggable(to.getElem());


  let fromObstacles=document.querySelectorAll('.'+from.getName()+'Obstacle');
  for(let elem of fromObstacles){
    setUndraggable(elem);
  }
  let toObstacles=document.querySelectorAll('.'+to.getName()+'Obstacle');
  for(let elem of toObstacles){
    setdraggable(elem);
  }
  function setUndraggable(elem){
    elem.style.WebkitUserDrag = 'none';
    elem.style.cursor ='default';
  }
  function setdraggable(elem){
    elem.style.WebkitUserDrag = 'auto';
    elem.style.cursor ='pointer';
  }
}







function initPlayerEvents(){
  player1.getElem().addEventListener('dragstart',dragstartPlayer); //분리?
  player1.getElem().addEventListener('dragend',dragendPlayer); //분리?
  player2.getElem().addEventListener('dragstart',dragstartPlayer); //분리?
  player2.getElem().addEventListener('dragend',dragendPlayer); //분리?
}
function initObstacleEvents(){
  let obstacleUnits = document.querySelectorAll('.obstacleUnit');
  console.log(obstacleUnits);
  for(let elem of obstacleUnits){
    elem.addEventListener('dragstart',dragstartObstacle); //분리?
    elem.addEventListener('dragend',dragendObstacle); //분리?
  }
}
function moveTo(from, to, who){
  who.setPos(to.row,to.col);
  board.setPlayerBoardArr(from,to,who);
  board.printPlayerBoardArr();
}

export function dragenterPlayer(event){
  this.style.backgroundColor ='yellow';
}
export function dragleavePlayer(event){
  this.style.backgroundColor ='';
}
export function dragstartPlayer(event){ //플레이어를 드래그하면 이벤트를 생기게??
  console.log(this);
  console.log(this.id + ' dragstart!')
  event.dataTransfer.setData('text',event.target.id);
  let playerBoardUnits = document.querySelectorAll('.playerBoardUnit');
  for(let elem of playerBoardUnits){
    elem.addEventListener('dragenter',dragenterPlayer);
    elem.addEventListener('dragleave',dragleavePlayer);
    //elem.addEventListener('dragstart',dragstartPlayer); //분리?
    elem.addEventListener('dragover',dragoverPlayer);
    elem.addEventListener('drop',dropPlayer);
  }
}
export function dragendPlayer(event){ //플레이어를 드래그끝내면
  console.log(this.id + ' dragend!')
  let playerBoardUnits = document.querySelectorAll('.playerBoardUnit');
  for(let elem of playerBoardUnits){
    elem.removeEventListener('dragenter',dragenterPlayer);
    elem.removeEventListener('dragleave',dragleavePlayer);
    //elem.addEventListener('dragstart',dragstartPlayer); //분리?
    elem.removeEventListener('dragover',dragoverPlayer);
    elem.removeEventListener('drop',dropPlayer);
  }
}
export function dragoverPlayer(event){
  event.preventDefault(); 
}
export function dropPlayer(event){
  event.preventDefault();
  console.log(this.id + ' drop!');
  let data=event.dataTransfer.getData('text');
  console.log('data: '+data);
  event.target.append(document.getElementById(data));

  changeTurn(getNowTurn(),getNextTurn());
}
///////////////////////////////////////////////////////////
export function dragenterObstacle(event){
  this.style.backgroundColor ='yellow';
}
export function dragleaveObstacle(event){
  this.style.backgroundColor ='';
}
export function dragstartObstacle(event){
  console.log(this);
  console.log(this.id + ' dragstart!')
  event.dataTransfer.setData('text',event.target.id);
  let obstacleBoardUnits = document.querySelectorAll('.obstacleBoardUnit');
  for(let elem of obstacleBoardUnits){
    elem.addEventListener('dragenter',dragenterObstacle);
    elem.addEventListener('dragleave',dragleaveObstacle);
    //elem.addEventListener('dragstart',dragstartPlayer); //분리?
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
    //elem.addEventListener('dragstart',dragstartPlayer); //분리?
    elem.removeEventListener('dragover',dragoverObstacle);
    elem.removeEventListener('drop',dropObstacle);
  }
}
export function dragoverObstacle(event){
  event.preventDefault(); 
}
export function dropObstacle(event){ //이 이벤트 발생하면 cahgeTurn 해야하느데................
  event.preventDefault();
  console.log(this.id + ' drop!');
  let data=event.dataTransfer.getData('text');
  console.log('data : '+data);
  event.target.append(document.getElementById(data));
  document.getElementById(data).style.left=event.target.dataset.col * 70 + 50 + 'px';
  document.getElementById(data).style.top=event.target.dataset.row * 70 + 'px';

  console.log(document.getElementById(data));
  

  changeTurn(getNowTurn(),getNextTurn());
}