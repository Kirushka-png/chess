import { FigureType } from "./Board"

export interface IPosition{
    x: number,
    y:number
}
export type Side = 'Black' | 'White'

export class Figure {
    attackMoves: Array<IPosition> = []
    position:  IPosition
    image: string
    movement: Array<IPosition> = []
    side: Side
    type: FigureType = 'Pawn'

    constructor(pos: IPosition, side: Side, image: string){
        this.position = pos
        this.side = side
        this.image = image
    }

    moveFigure(newPos: IPosition){
        this.position = newPos
    }

    checkFigure(pos: IPosition, cells: Map<number,Figure | null>): Figure | null{
        let figure = (pos.x < 8 && pos.x >=0 && pos.y < 8 && pos.y >= 0) ? cells.get(pos.x + pos.y*8) : undefined
        return figure != undefined ? figure : null
    }
    
    getMoves(cells: Map<number,Figure | null>): Array<IPosition>{
        return []
    }
}