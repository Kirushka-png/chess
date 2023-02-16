import { Figure, IPosition, Side } from "models/Figure"
import QueenBlack from 'assets/QueenBlack.png'
import QueenWhite from 'assets/QueenWhite.png'

export class Queen extends Figure{
    attackMoves: Array<IPosition> = []

    constructor(pos: IPosition, side: Side){
        let img = side == 'Black' ? QueenBlack : QueenWhite
        super(pos, side, img)
    }

    getMoves(): Array<IPosition>{
        let tempArr = [[-1,0], [1,0], [0,1], [0,-1], [-1,-1], [1,1], [-1,1], [1,-1]]
        for(let i = 1; i < 8 ; i++){
            for(let j = 0; j < 8; j++){
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