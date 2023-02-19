import { Figure, IPosition, Side } from "./Figure"
import { Bishop } from "./figures/Bishop"
import { King } from "./figures/King"
import { Knight } from "./figures/Knight"
import { Pawn } from "./figures/Pawn"
import { Queen } from "./figures/Queen"
import { Rook } from "./figures/Rook"

type Turn = 'Black' | 'White' | 'Tied'

export type FigureType = 'King' | 'Queen' | 'Pawn' | 'Rook' | 'Knight' | 'Bishop'


export class Board {
    figures: Array<Figure> = []
    turn: Turn = 'Tied'
    boardSize: number = 8
    cells = new Map<number, Figure | null>()
    kings: Array<King> = []
    lastMove: [IPosition | null, IPosition | null] = [null, null]

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
        for(let i = 0; i < 2; i++){
            let side: Side = i % 2 == 0 ? 'Black' : 'White'
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
                this.kings.push(figure)
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

    makeMove(selectedFigure: Figure, pos:IPosition){
        this.cells.set(selectedFigure.position.x + selectedFigure.position.y * 8, null)
        this.cells.set(pos.x + pos.y*8, selectedFigure)
        selectedFigure.moveFigure({x:pos.x,y:pos.y})
    }
    onCellClick(pos:IPosition, selectedFigure: Figure | null, isMarked: boolean): (Figure | null){
        if(selectedFigure == null || !isMarked){
            let figure = this.cells.get(pos.x + pos.y * 8)
            if(figure != null && figure.side == this.turn ){
                return figure
            }
            return null
        }
        else{
            if(isMarked){
                let diff = pos.x - selectedFigure.position.x
                if(selectedFigure instanceof King && (diff < -1 || diff > 1)){
                    let tempX = diff < 0 ? 0 : 7
                    let tempRook = this.cells.get(tempX + pos.y * 8)
                    if(tempRook instanceof Rook) {
                        let tempK = diff < 0 ? -1 : 1
                        this.makeMove(tempRook, {x: selectedFigure.position.x + tempK, y: pos.y})
                    }
                }
                this.lastMove =[pos,selectedFigure.position]
                this.makeMove(selectedFigure, pos)
                this.turn = this.turn == 'White' ? 'Black' : 'White'
            }
            this.kings[0].getUnderCheck(this.cells)
            this.kings[1].getUnderCheck(this.cells)
            return null
        }
    }

    getPossibleMoves(figure: Figure): Array<IPosition>{
        let possibleMoves: Array<IPosition> = []
        let allMoves: Array<IPosition> = figure.getMoves(this.cells)
        if(figure instanceof King) {
            let moves = figure.checkOnСastling(this.cells) 
            if(moves !== null){
                moves.forEach((el)=>{
                    allMoves.push(el)
                })
            }
        }
        let tempKing = figure.side == 'Black' ? this.kings[0] : this.kings[1]
        allMoves.forEach((pos)=>{
            let tempCells = new Map(this.cells)
            let tempPos = figure.type == 'King' ? pos : null
            tempCells.set(figure.position.x + figure.position.y * 8, null)
            tempCells.set(pos.x + pos.y*8, figure)
            if(tempKing.getKingDirections(tempCells,tempPos).findIndex((dir) => dir.security == 'unsafe') == -1){
                possibleMoves.push(pos)
            }
        })
        return possibleMoves
    }
}