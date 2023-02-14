type Turn = 'black' | 'white' | 'tied'

class Board{
    figures: Array<Figure> = []
    turn: Turn = 'tied'
    boardSize: number = 8

    constructor(){

    }

    refreshGame(){
        
    }
}