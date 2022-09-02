import {Player} from "./Player.js";
import {Board, positionObstacleOnBoard} from "./Board.js";
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

  setDisabled(from.getElem());
  setAbled(to.getElem());


  let fromObstacles=document.querySelectorAll('.'+from.getName()+'Obstacle');
  for(let elem of fromObstacles){
    setDisabled(elem);
  }
  let toObstacles=document.querySelectorAll('.'+to.getName()+'Obstacle');
  for(let elem of toObstacles){
    if(elem.dataset.isPositioned=='true') { continue; }
    setAbled(elem);
  }
  
}

function setDisabled(elem){
  elem.style.pointerEvents = 'none';
}
function setAbled(elem){
  elem.style.cursor ='pointer';
  elem.style.pointerEvents = 'auto';
}





function initPlayerEvents(){
  player1.getElem().addEventListener('dragstart',dragstartPlayer); //분리?
  player1.getElem().addEventListener('dragend',dragendPlayer); //분리?
  player2.getElem().addEventListener('dragstart',dragstartPlayer); //분리?
  player2.getElem().addEventListener('dragend',dragendPlayer); //분리?
}
function initObstacleEvents(){
  let obstacleUnits = document.querySelectorAll('.obstacleUnit');
  //console.log(obstacleUnits);
  for(let elem of obstacleUnits){
    elem.addEventListener('dragstart',dragstartObstacle); //분리?
    elem.addEventListener('dragend',dragendObstacle); //분리?
    elem.addEventListener('click',clickObstacle); //분리?

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
  console.log(this.id + ' dragstart!')
  event.dataTransfer.setData('text',event.target.id);
  let playerBoardUnits = document.querySelectorAll('.playerBoardUnit');
  for(let elem of playerBoardUnits){
    elem.addEventListener('dragenter',dragenterPlayer);
    elem.addEventListener('dragleave',dragleavePlayer);
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
  console.log(this.id + ' dragstart!')
  event.dataTransfer.setData('text',event.target.id);
  let obstacleBoardUnits = document.querySelectorAll('.obstacleBoardUnit');
  for(let elem of obstacleBoardUnits){
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
export function dropObstacle(event){ 
  event.preventDefault();
  console.log(this.id + ' drop!');
  let data=event.dataTransfer.getData('text');
  let imgElem=document.getElementById(data);
  event.target.append(imgElem);
  positionObstacleOnBoard(imgElem,event.target.dataset.row,event.target.dataset.col); //img요소, row, col
  imgElem.dataset.isPositioned='true';
  setDisabled(imgElem);
  changeTurn(getNowTurn(),getNextTurn());
}
export function clickObstacle(event){
  console.log('clikck!!');
  console.log(event.target.src);
  if(event.target.dataset.dir=='vertical'){
    event.target.src="./images/obstacleHorizontal.png";
    event.target.dataset.dir='horizontal';
  }
  else {
    event.target.src="./images/obstacleVertical.png";
    event.target.dataset.dir='vertical';
  }

}