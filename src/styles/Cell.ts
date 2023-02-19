import { IPosition } from "models/Figure";
import styled from "styled-components";
import colors from "utils/color";
interface ICellContainer{
    position: IPosition,
    selected: boolean,
    underCheck: boolean,
    lastMove: boolean
}

const CellContainer = styled.div<ICellContainer>`
    width: 80px;
    height: 80px;
    background-color:${({position: p, selected: s, underCheck: uC, lastMove: lM}: ICellContainer) => s ? colors.PURPLE 
        : uC ? colors.RED 
        : lM ? colors.LIGHT_PURPLE 
        : ((p.x + p.y) % 2) == 0 ? colors.BLACK 
        : colors.WHITE} ;

    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    
`

export const CellImage = styled.img`
    width: 100%;
    height: 100%;
`

export const Mark = styled.div`
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: ${colors.PURPLE};
    border-radius: 10px;
`

export const TempCell = styled.div`
    position: absolute;
    top: 0px;
    left:0px;
    color: red;
`

export default CellContainer