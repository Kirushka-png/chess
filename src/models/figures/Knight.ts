import { Figure, IPosition, Side } from "models/Figure"
import KnightBlack from 'assets/KnightBlack.png'
import KnightWhite from 'assets/KnightWhite.png'

export class Knight extends Figure{

    constructor(pos: IPosition, side: Side){
        let img = side == 'Black' ? KnightBlack : KnightWhite
        super(pos, side, img)
        this.type = 'Knight'
    }


    getMoves(cells: Map<number,Figure | null>): Array<IPosition>{
        this.attackMoves = []
        let tempArr = [[-2,1], [-2,-1], [2,1], [2,-1], [1,-2], [1,2], [-1,2], [-1,-2]]
        for(let j = 0; j < 8; j++){
            let newXpos = this.position.x+tempArr[j][0]
            let newYpos = this.position.y+tempArr[j][1]
            let tempCell = this.checkFigure({x:newXpos, y: newYpos}, cells)
            if(newXpos >= 0 && newYpos >= 0 && newXpos <=7 && newYpos <= 7 && (tempCell == null || tempCell.side != this.side)){
                this.attackMoves.push({
                    x: newXpos,
                    y: newYpos
                })
            }
        }
        return this.attackMoves
    }

}