import { Figure, IPosition, Side } from "models/Figure"
import RookBlack from 'assets/RookBlack.png'
import RookWhite from 'assets/RookWhite.png'

export class Rook extends Figure{
    firstMove: boolean = true

    constructor(pos: IPosition, side: Side){
        let img = side == 'Black' ? RookBlack : RookWhite
        super(pos, side, img)
    }

    getMoves(): Array<IPosition>{
        this.attackMoves = []
        this.movement = []
        let tempArr = [[-1,0], [1,0], [0,1], [0,-1]]
        for(let i = 1; i < 8 ; i++){
            for(let j = 0; j < 4; j++){
                let newXpos = this.position.x+(tempArr[j][0]* i)
                let newYpos = this.position.y+(tempArr[j][1]* i)
                if(newXpos >= 0 && newYpos >= 0 && newXpos <=7 && newYpos <= 7){
                    this.attackMoves.push({
                        x: newXpos,
                        y: newYpos
                    })
                }
            }
        }
        return this.attackMoves
    }

    moveFigure(newPos: IPosition){
        this.firstMove = false
        this.position = newPos
    }
}