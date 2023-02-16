import { Figure, IPosition, Side } from "models/Figure"
import PawnBlack from 'assets/PawnBlack.png'
import PawnWhite from 'assets/PawnWhite.png'

export class Pawn extends Figure{
    firstMove: boolean = true

    constructor(pos: IPosition, side: Side){
        let img = side == 'Black' ? PawnBlack : PawnWhite
        super(pos, side, img)
    }

    getMoves(): Array<IPosition>{
        this.attackMoves = []
        this.movement = []
        let pos = this.position
        let temp = this.side == 'Black' ? 1 : -1
        this.attackMoves.push({x: pos.x + temp, y: pos.y + temp})
        this.attackMoves.push({x: pos.x - temp, y: pos.y + temp})
        this.movement.push({x: pos.x, y: pos.y + temp})
        this.firstMove && this.movement.push({x: pos.x, y: pos.y + temp * 2})
        return [...this.movement, ...this.attackMoves]
    }

    moveFigure(newPos: IPosition){
        this.firstMove = false
        this.position = newPos
    }
    
}