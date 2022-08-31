
export class Player {
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
    }   
    getName() { return this._name; }
    setName() {} //굳이 필요없는대ㅔ?

    getLeftObstacles() { return this._leftObstacles ;}
    setLeftObstacles(value_Number){ this._leftObstacles = value_Number;}

    getIsMyTurn() { return this._isMyTurn ;}
    setIsMyTurn(value_Bool){ this._isMyTurn = value_Bool;}

    getPos() { return this._pos; }
    setPos(r,c) { 
        this._pos.row = r, this._pos.col = c;
    }

    getElem() { return this._elem; }
    setElem(pos){
        this._elem = document.querySelector(`#p${pos.row}${pos.col}`); //이거 p84??
    }

}
export function clickPlayer(event){
    console.log(event.type);
    console.log(this);
    console.log(event.currentTarget);
    //this.
}