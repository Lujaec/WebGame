export class ObstacleBoard{
  constructor(){
    this._obstacleBoardArr = Array.from(Array(8), () => Array(8).fill(-1));
    this._player1=null;
    this._player2=null;
  }
  getObstacleBoardArr(){ //set없어도?
    return this._obstacleBoardArr;
  }
  
  printObstacleBoardArr(){
    for(let i=0;i<8;i++){
      for(let j=0;j<8;j++){
        console.log( this._obstacleBoardArr);
      }
    }
  }
  
}


export function initObstacleBoardEvents(){
  let obstacles = document.querySelectorAll('#obstacleBoard td');
  for(let elem of obstacles){
    elem.onclick = function(event){
      let target = event.target;
      console.log(target.getBoundingClientRect(), target.id,target.className);
    }
  }
}

