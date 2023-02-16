import { Figure, IPosition, Side } from "./Figure"
import { Bishop } from "./figures/Bishop"
import { King } from "./figures/King"
import { Knight } from "./figures/Knight"
import { Pawn } from "./figures/Pawn"
import { Queen } from "./figures/Queen"
import { Rook } from "./figures/Rook"

type Turn = 'Black' | 'White' | 'Tied'

type FigureType = 'King' | 'Queen' | 'Pawn' | 'Rook' | 'Knight' | 'Bishop'


export class Board {
    figures: Array<Figure> = []
    turn: Turn = 'Tied'
    boardSize: number = 8
    cells = new Map<number, Figure | null>()

    constructor() {
        for (let x = 0; x < this.boardSize; x++) {
            for (let y = 0; y < this.boardSize; y++) {
                this.cells.set(x + y * 8, null)
            }
        }
        this.refreshGame()
    }

    refreshGame() {
        let tempArr = [[0,0],[0,7],[7,0],[7,7]]
        for(let i = 0; i < this.boardSize; i++){
            this.createNewFigure({x:i,y:1}, 'Black', 'Pawn')
            this.createNewFigure({x:i,y:6}, 'White', 'Pawn')
        }
        for(let i = 0; i < 4; i++){
            let side: Side = i % 2 ==0 ? 'Black' : 'White'
            let change: number = i > 1 ? -1 : 1
            this.createNewFigure({x:tempArr[i][0],y: tempArr[i][1]}, side, 'Rook')
            this.createNewFigure({x:tempArr[i][0]+change,y: tempArr[i][1]}, side, 'Knight')
            this.createNewFigure({x:tempArr[i][0]+(change*2),y: tempArr[i][1]}, side, 'Bishop')
        }
        tempArr = [[4,0],[3,7]]
        for(let i =0; i < 2; i++){
            let side: Side = i % 2 ==0 ? 'Black' : 'White'
            let change: number = i > 0 ? -1 : 1
            this.createNewFigure({x:tempArr[i][0],y: tempArr[i][1]}, side, 'King')
            this.createNewFigure({x:tempArr[i][0] - change,y: tempArr[i][1]}, side, 'Queen')
        }
        this.turn = 'White'
    }

    createNewFigure(pos: IPosition, side: Side, figureType: FigureType) {
        let figure
        switch (figureType) {
            case 'King':
                figure = new King(pos, side)
                break;
            case 'Queen':
                figure = new Queen(pos, side)
                break;
            case 'Rook':
                figure = new Rook(pos, side)
                break;
            case 'Knight':
                figure = new Knight(pos, side)
                break;
            case 'Bishop':
                figure = new Bishop(pos, side)
                break;
            default:
                figure = new Pawn(pos, side)
                break;
        }
        this.figures.push(figure)
        this.cells.set(pos.x + pos.y * 8, figure)
    }

    onCellClick(pos:IPosition, selectedFigure: Figure | null): (Figure | null){
        if(selectedFigure == null){
            let figure = this.cells.get(pos.x + pos.y * 8)
            if(figure != null && figure.side == this.turn ){
                return figure
            }
            return null
        }
        else{
            return null
            switch (this.turn) {
                case 'Black':
                    
                    break;
            
                case 'White':
                    
                    break;
                default:
                    break;
            }
        }
    }
    whoOnThisPosition() {

    }
}