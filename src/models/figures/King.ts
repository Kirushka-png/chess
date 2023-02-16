import { Figure, IPosition, Side } from "models/Figure"
import KingBlack from 'assets/KingBlack.png'
import KingWhite from 'assets/KingWhite.png'

export class King extends Figure{
    firstMove: boolean = true

    constructor(pos: IPosition, side: Side){
        let img = side == 'Black' ? KingBlack : KingWhite
        super(pos, side, img)
    }

    getMoves(): Array<IPosition>{
        this.attackMoves = []
        this.movement = []
        let tempArr = [[-1,0], [1,0], [0,1], [0,-1], [-1,-1], [1,1], [-1,1], [1,-1]]
        for(let j = 0; j < 8; j++){
            let newXpos = this.position.x+tempArr[j][0]
            let newYpos = this.position.y+tempArr[j][1]
            if(newXpos >= 0 && newYpos >= 0 && newXpos <=7 && newYpos <= 7){
                this.attackMoves.push({
                    x: newXpos,
                    y: newYpos
                })
            }
        }
        return this.attackMoves
    }
    
    moveFigure(newPos: IPosition){
        this.firstMove = false
        this.position = newPos
    }
}