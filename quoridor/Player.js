class Player {
    constructor(name){
        this._name = name;
        this._leftObstacles = 10;
        this._isMyTurn = false; //네명 모두 초기값 false

    }   
    getName() { return this._name; }
    setName() {} //굳이 필요없는대ㅔ?

    getLeftObstacles() { return this._leftObstacles ;}
    setLeftObstacles(value_Number){ this._leftObstacles = value_Number;}

    getIsMyTurn() { return this._isMyTurn ;}
    setIsMyTurn(value_Bool){ this._isMyTurn = value_Bool;}
}