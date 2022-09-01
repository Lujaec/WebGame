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

  console.log(this);
  
}