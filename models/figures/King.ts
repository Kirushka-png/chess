class King extends Figure{
    firstMove: boolean = true
    attackMoves: Array<IPosition> = []

    constructor(pos: IPosition, side: Side){
        super(pos, side)
        this.image = `assets/King${side}.png`
    }

    
}