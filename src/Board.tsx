import Cell from 'components/Cell';
import Timer from 'components/Timer';
import { Board } from 'models/Board';
import { Figure, IPosition } from 'models/Figure';
import { useCallback, useEffect, useState } from 'react';
import BoardContainer, { BoardPlace, TimerContainer, TurnContainer } from 'styles/Board';

const board = new Board()

function GameBoard() {

  const TurnMock = {
    'White': 'Ход белых',
    'Black': 'Ход черных',
    'Tied': 'Ничья'
  }

  const [cells, setCells] = useState(board.cells)
  const [selectedFigure, setSelectedFigure] = useState<Figure | null>(null)
  const [possibleMoves, setPossibleMoves] = useState<Array<IPosition>>([])
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7];
  const [loseByTime, setLoseByTime] = useState(false)

  const onClickHandler = (pos: IPosition, isMarked: boolean) =>{
    let tempFigure = board.onCellClick(pos, selectedFigure, isMarked)
    setSelectedFigure(tempFigure)
  }

  const positionCompare = (pos1: IPosition | null,pos2:IPosition | null) : boolean =>{
    return (pos1?.x == pos2?.x) && (pos1?.y == pos2?.y)
  }
  
  useEffect(() => {
    if(selectedFigure !== null){
      setPossibleMoves(board.getPossibleMoves(selectedFigure))
    }
  }, [selectedFigure])

  useEffect(() => {
    if(loseByTime) board.loseByTime()
  }, [loseByTime])
  

  const time: Array<Date> = [new Date(), new Date()];
  time[0].setSeconds(time[0].getSeconds() + 10);
  time[1].setSeconds(time[1].getSeconds() + 10);


  return (
    <BoardContainer>
      <TimerContainer>
        <TurnContainer>
          <Timer expiryTimestamp={time[0]} onPause={board.turn !== 'Black'} onExpire={() => setLoseByTime(true)}/>
          {
            loseByTime ? 'Поражение по времени' : board.onMate ? 'Мат' : TurnMock[board.turn]
          }
          <Timer expiryTimestamp={time[1]} onPause={board.turn !== 'White'} onExpire={() => setLoseByTime(true)}/>
        </TurnContainer>
      </TimerContainer>
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
                lastMove={positionCompare(board.lastMove[0],{x:j,y:i}) || positionCompare(board.lastMove[1],{x:j,y:i})}
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
