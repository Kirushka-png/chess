import { Figure, IPosition, Side } from "models/Figure"
import KingBlack from 'assets/KingBlack.png'
import KingWhite from 'assets/KingWhite.png'

export interface IKingDirection extends IPosition{
    security: 'safe' | 'unsafe' | null
}

export class King extends Figure{
    firstMove: boolean = true
    underСheck: boolean = false

    constructor(pos: IPosition, side: Side){
        let img = side == 'Black' ? KingBlack : KingWhite
        super(pos, side, img)
        this.type = 'King'
    }

    getMoves(cells: Map<number,Figure | null>): Array<IPosition>{
        this.attackMoves = []
        let tempArr = [[-1,0], [1,0], [0,1], [0,-1], [-1,-1], [1,1], [-1,1], [1,-1]]
        for(let j = 0; j < 8; j++){
            let newXpos = this.position.x+tempArr[j][0]
            let newYpos = this.position.y+tempArr[j][1]
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
        return this.attackMoves
    }

    getKingDirections(cells: Map<number,Figure | null>, position: IPosition | null): Array<IKingDirection>{
        let knightArr = [[-2,1], [-2,-1], [2,1], [2,-1], [1,-2], [1,2], [-1,2], [-1,-2]]
        let tempArr: Array<IKingDirection> = [{x:-1,y:0,security: null}, {x:1,y:0,security: null}, {x:0,y:1,security: null}, {x:0,y:-1,security: null}, {x:-1,y:-1,security: null}, {x:1,y:1,security: null}, {x:-1,y:1,security: null}, {x:1,y:-1,security: null}]
        let pos = position == null ? this.position : position
        for (let n = 0; n < 8; n++) {
            let Xpos = pos.x+knightArr[n][0]
            let Ypos = pos.y+knightArr[n][1]
            let tempCell = this.checkFigure({x:Xpos, y: Ypos}, cells)
            if(tempCell != null && tempCell.side != this.side && tempCell.type == 'Knight'){
                tempArr[n].security = 'unsafe'
            }
        }
        for(let i = 1; i < 8 ; i++){
            for(let j = 0; j < 8; j++){
                let newXpos = pos.x+(tempArr[j].x * i)
                let newYpos = pos.y+(tempArr[j].y * i)
                let tempCell = this.checkFigure({x:newXpos, y: newYpos}, cells)
                if(tempCell != null && tempArr[j].security == null){
                    if(tempCell.side != this.side){
                        if((j < 4 && (tempCell.type == 'Rook' || tempCell.type == 'Queen')) ||
                        (j > 3 && (tempCell.type == 'Bishop' || tempCell.type == 'Queen')) || 
                        (i == 1 && tempCell.type =='Pawn' && ((tempCell.side =='Black' && (j == 4 || j == 7)) ||
                        (tempCell.side =='White' && (j == 5 || j == 6)))) ||
                        (i == 1 && tempCell.type == 'King')
                        ){
                            tempArr[j].security = 'unsafe'
                        }
                        else{ 
                            tempArr[j].security = 'safe'
                        }
                    }
                    else{
                        tempArr[j].security = 'safe'
                    }
                    
                }
            }
        }
        return tempArr
    }

    getUnderCheck(cells: Map<number,Figure | null> ){
        this.underСheck = this.getKingDirections(cells,null).findIndex((dir) => dir.security == 'unsafe') > -1
        return this.underСheck
    }
    
    moveFigure(newPos: IPosition){
        this.firstMove = false
        this.position = newPos
    }
}