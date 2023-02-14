interface IPosition{
    x: number,
    y:number
}
type Side = 'Black' | 'White'

class Figure {
    position:  IPosition
    image: string
    movement: Array<IPosition>
    side: Side

    constructor(pos: IPosition, side: Side){
        this.position = pos
        this.side = side
    }

    moveFigure(newPos){
        this.position = newPos
    }
}