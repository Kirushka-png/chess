import { IPosition } from "models/Figure";
import styled from "styled-components";
import colors from "utils/color";
interface ICellContainer{
    position: IPosition
    selected: boolean
}

const CellContainer = styled.div<ICellContainer>`
    width: 80px;
    height: 80px;
    background-color:${({position: p, selected: s}: ICellContainer) => s ? colors.PURPLE : ((p.x + p.y) % 2) == 0 ? colors.BLACK : colors.WHITE} ;
    position: relative;
    
`

export const CellImage = styled.img`
    width: 100%;
    height: 100%;
`

export const Mark = styled.div`
    position: absolute;
    width: 30px;
    height: 30px;
    background-color: aqua;
    border-radius: 15px;
`

export default CellContainer