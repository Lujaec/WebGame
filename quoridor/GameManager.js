import {Player} from "./Player.js";
import {Board, initBoardEvents} from "./Board.js";
import * as events from "./dragEvents.js";


export let board = new Board();
export let player1 = new Player("player1", "black",8,4);
export let player2 = new Player("player2", "white",0,4);



export class GameManager {
  constructor(){
    this._nowTurn = null;
  }
  setNowTurn(player){ this._nowTurn=player;}
  getNowTurn(){ return this._nowTurn;}

  gameStart(){
    board.setPlayerBoardArr(player1.getPos(),player1.getPos(),player1); //playerBoard에 올려줌
    board.setPlayerBoardArr(player2.getPos(),player2.getPos(),player2); //playerBoard에 올려줌
    player1.initElem('black'); //elem을 토큰이미지요소로
    player2.initElem('white');
    
    document.querySelector(player1.getId()).append(player1.getElem());
    document.querySelector(player2.getId()).append(player2.getElem());
    
    initPlayerEvents();
    initObstacleEvents();
    this.changeTurn(player2,player1);
    //this.changeTurn(player1,player2);
  }
  changeTurn(from,to){
    
    this.setNowTurn(to);
    document.getElementById(from.getName()+'info').style.backgroundColor='';
    document.getElementById(to.getName()+'info').style.backgroundColor='red'; //현재턴표시
    console.log('nowTurn : '+this.getNowTurn().getName());

    from.getElem().style='-webkit-user-drag : none; cursor : default;'; //함수로 뺴야하나?
    to.getElem().style='-webkit-user-drag : default; cursor : pointer;'; //함수로 뺴야하나? 드래그비활성화가 곧 턴체인지

    let fromObstacles=document.querySelectorAll('.'+from.getName()+'Obstacle');
    for(let elem of fromObstacles){
      elem.style='-webkit-user-drag : none; cursor : default;';
    }
    let toObstacles=document.querySelectorAll('.'+to.getName()+'Obstacle');
    for(let elem of toObstacles){
      elem.style='-webkit-user-drag : default; cursor : pointer;';
    }

  
  }
}

function initPlayerEvents(){
  player1.getElem().addEventListener('dragstart',events.dragstartPlayer); //분리?
  player1.getElem().addEventListener('dragend',events.dragendPlayer); //분리?
  player2.getElem().addEventListener('dragstart',events.dragstartPlayer); //분리?
  player2.getElem().addEventListener('dragend',events.dragendPlayer); //분리?
}
function initObstacleEvents(){
  let obstacleUnits = document.querySelectorAll('.obstacleUnit');
  console.log(obstacleUnits);
  for(let elem of obstacleUnits){
    elem.addEventListener('dragstart',events.dragstartObstacle); //분리?
    elem.addEventListener('dragend',events.dragendObstacle); //분리?
  }
}
function moveTo(from, to, who){
  who.setPos(to.row,to.col);
  board.setPlayerBoardArr(from,to,who);
  board.printPlayerBoardArr();
}
