class Knight extends Figure{
    attackMoves: Array<IPosition> = []

    constructor(pos: IPosition, side: Side){
        super(pos, side)
        this.image = `assets/Knight${side}.png`
    }

}