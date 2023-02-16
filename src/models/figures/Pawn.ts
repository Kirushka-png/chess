import { Figure, IPosition, Side } from "models/Figure"
import PawnBlack from 'assets/PawnBlack.png'
import PawnWhite from 'assets/PawnWhite.png'

export class Pawn extends Figure{
    firstMove: boolean = true

    constructor(pos: IPosition, side: Side){
        let img = side == 'Black' ? PawnBlack : PawnWhite
        super(pos, side, img)
        this.type = 'Pawn'
    }

    getMoves(cells: Map<number,Figure | null>): Array<IPosition>{
        this.attackMoves = []
        let pos = this.position
        let temp = this.side == 'Black' ? 1 : -1
        let moves = [{x: pos.x + temp, y: pos.y + temp}, {x: pos.x - temp, y: pos.y + temp}, {x: pos.x, y: pos.y + temp}, {x: pos.x, y: pos.y + temp * 2}]
        let tempFigure = this.checkFigure(moves[0], cells)
        if(tempFigure != null && tempFigure.side != this.side) this.attackMoves.push(moves[0])
        tempFigure = this.checkFigure(moves[1], cells)
        if(tempFigure != null && tempFigure.side != this.side) this.attackMoves.push(moves[1])
        if(this.checkFigure(moves[2], cells) == null) {
            this.attackMoves.push(moves[2])
            if(this.checkFigure(moves[3], cells) == null && this.firstMove) this.attackMoves.push(moves[3])
        }
        return this.attackMoves
    }

    moveFigure(newPos: IPosition){
        this.firstMove = false
        this.position = newPos
    }
    
}