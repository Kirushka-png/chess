import { Figure, IPosition, Side } from "models/Figure"
import BishopBlack from 'assets/BishopBlack.png'
import BishopWhite from 'assets/BishopWhite.png'

export class Bishop extends Figure{

    constructor(pos: IPosition, side: Side){
        let img = side == 'Black' ? BishopBlack : BishopWhite
        super(pos, side, img)
        this.type = 'Bishop'
    }

    getMoves(cells: Map<number,Figure | null>): Array<IPosition>{
        this.attackMoves = []
        this.movement = []
        let tempArr = [[-1,-1], [1,1], [-1,1], [1,-1]]
        for(let i = 1; i < 8 ; i++){
            for(let j = 0; j < 4; j++){
                let newXpos = this.position.x+(tempArr[j][0]* i)
                let newYpos = this.position.y+(tempArr[j][1]* i)
                let tempCell = this.checkFigure({x:newXpos, y: newYpos}, cells)
                if(tempCell != null && tempCell.side == this.side){
                    tempArr[j][0] = 8
                    newXpos = 8
                }
                else if(tempCell != null && tempCell.side != this.side ){
                    tempArr[j][0] = 8
                }
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