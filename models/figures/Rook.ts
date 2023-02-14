class Rook extends Figure{
    attackMoves: Array<IPosition> = []

    constructor(pos: IPosition, side: Side){
        super(pos, side)
        this.image = `assets/Rook${side}.png`
    }

    
}