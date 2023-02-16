import { Figure, IPosition } from "models/Figure"
import CellContainer, { CellImage, Mark } from "styles/Cell"

interface ICell {
    position: IPosition,
    figure: Figure | null,
    canMoveHere: boolean,
    onClickHandler(pos: IPosition): void,
    selected: boolean
}

const Cell = ({ position, figure, canMoveHere, onClickHandler, selected }: ICell) => {

    return (
        <CellContainer position={position} selected={selected} onClick={()=>onClickHandler(position)}>
            {canMoveHere && <Mark/>}
            {figure != null && <CellImage src={figure.image}></CellImage>}
        </CellContainer>
    )
}

export default Cell