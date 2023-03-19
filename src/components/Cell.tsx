import { Figure, IPosition } from "models/Figure"
import { King } from "models/figures/King"
import { memo } from "react"
import CellContainer, { CellImage, Mark, TempCell } from "styles/Cell"

interface ICell {
    position: IPosition,
    figure: Figure | null,
    canMoveHere: boolean,
    onClickHandler(pos: IPosition): void,
    selected: boolean,
    lastMove: boolean
}

const Cell = memo(({ position, figure, canMoveHere, onClickHandler, selected, lastMove }: ICell) => {    

    return (
        <CellContainer position={position} selected={selected} underCheck={figure instanceof King && figure.underСheck} lastMove={lastMove} onClick={()=>onClickHandler(position)}>
            {
                //<TempCell>{'x:'+position.x+'  y:'+position.y}</TempCell>
            }
            {canMoveHere && <Mark/>}
            {figure != null && <CellImage src={figure.image}></CellImage>}
        </CellContainer>
    )
})

export default Cell