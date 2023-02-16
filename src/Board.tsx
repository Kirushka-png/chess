import Cell from 'components/Cell';
import { Board } from 'models/Board';
import { Figure, IPosition } from 'models/Figure';
import { useEffect, useState } from 'react';
import BoardContainer, { BoardPlace } from 'styles/Board';

const board = new Board()

function GameBoard() {

  const [cells, setCells] = useState(board.cells)
  const [selectedFigure, setSelectedFigure] = useState<Figure | null>(null)
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7];

  const onClickHandler = (pos: IPosition) =>{
    let tempFigure = board.onCellClick(pos, selectedFigure)
    console.log(tempFigure)
    setSelectedFigure(tempFigure)
  }

  const positionCompare = (pos1: IPosition,pos2:IPosition) : boolean =>{
    return (pos1.x == pos2.x) && (pos1.y == pos2.y)
  }

  useEffect(() => {
   console.log(selectedFigure)
  }, [selectedFigure])
  

  return (
    <BoardContainer>
      <BoardPlace>
        {
          numbers.map((i) => {
            return numbers.map((j) => {
              let tempCell = cells.get(i*8+j)
              return tempCell !== undefined && <Cell key={i*8+j} selected={selectedFigure != null && positionCompare(selectedFigure.position, {x:j,y:i})} position={{x:j,y:i}} figure={tempCell} canMoveHere={false} onClickHandler={(pos)=>onClickHandler(pos)}></Cell> 
            })
          })
        }
      </BoardPlace>
    </BoardContainer>
  );
}

export default GameBoard;
