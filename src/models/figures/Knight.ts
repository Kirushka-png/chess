import { Figure, IPosition, Side } from "models/Figure"
import KnightBlack from 'assets/KnightBlack.png'
import KnightWhite from 'assets/KnightWhite.png'

export class Knight extends Figure{
    attackMoves: Array<IPosition> = []

    constructor(pos: IPosition, side: Side){
        let img = side == 'Black' ? KnightBlack : KnightWhite
        super(pos, side, img)
    }


    getMoves(): Array<IPosition>{
        let tempArr = [[-2,1], [-2,-1], [2,1], [2,-1], [1,-2], [1,2], [-1,2], [-1,-2]]
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

}