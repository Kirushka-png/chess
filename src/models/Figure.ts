export interface IPosition{
    x: number,
    y:number
}
export type Side = 'Black' | 'White'

export class Figure {
    position:  IPosition
    image: string
    movement: Array<IPosition> = []
    side: Side

    constructor(pos: IPosition, side: Side, image: string){
        this.position = pos
        this.side = side
        this.image = image
    }

    moveFigure(newPos: IPosition){
        this.position = newPos
    }
}