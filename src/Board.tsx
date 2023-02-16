import Cell from 'components/Cell';
import { Board } from 'models/Board';
import { Figure, IPosition } from 'models/Figure';
import { useEffect, useState } from 'react';
import BoardContainer, { BoardPlace } from 'styles/Board';

const board = new Board()

function GameBoard() {

  const [cells, setCells] = useState(board.cells)
  const [selectedFigure, setSelectedFigure] = useState<Figure | null>(null)
  const [possibleMoves, setPossibleMoves] = useState<Array<IPosition>>([])
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7];

  const onClickHandler = (pos: IPosition, isMarked: boolean) =>{
    let tempFigure = board.onCellClick(pos, selectedFigure, isMarked)
    setSelectedFigure(tempFigure)
  }

  const positionCompare = (pos1: IPosition,pos2:IPosition) : boolean =>{
    return (pos1.x == pos2.x) && (pos1.y == pos2.y)
  }
  useEffect(() => {
    if(selectedFigure !== null){
      setPossibleMoves(board.getPossibleMoves(selectedFigure))
    }
  }, [selectedFigure])
  

  return (
    <BoardContainer>
      <BoardPlace>
        {
          numbers.map((i) => {
            return numbers.map((j) => {
              let tempCell = cells.get(i*8+j)
              let isMarked = selectedFigure != null && !!possibleMoves.find((pos) => pos.x == j && pos.y == i)
              return tempCell !== undefined && 
              <Cell 
                key={i*8+j} 
                selected={selectedFigure != null && positionCompare(selectedFigure.position, {x:j,y:i})} 
                position={{x:j,y:i}} 
                figure={tempCell} 
                canMoveHere={isMarked} 
                onClickHandler={(pos)=>onClickHandler(pos,isMarked)}
              /> 
            })
          })
        }
      </BoardPlace>
    </BoardContainer>
  );
}

export default GameBoard;
