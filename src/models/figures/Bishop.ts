import { Figure, IPosition, Side } from "models/Figure"
import BishopBlack from 'assets/BishopBlack.png'
import BishopWhite from 'assets/BishopWhite.png'

export class Bishop extends Figure{
    attackMoves: Array<IPosition> = []

    constructor(pos: IPosition, side: Side){
        let img = side == 'Black' ? BishopBlack : BishopWhite
        super(pos, side, img)
    }

    getMoves(): Array<IPosition>{
        let tempArr = [[-1,-1], [1,1], [-1,1], [1,-1]]
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
}