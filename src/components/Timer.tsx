import { useTimer } from "react-timer-hook";
import { useEffect } from 'react'
import TimerWrapper from "styles/Timer";

interface Props{
    expiryTimestamp: Date,
    onPause: boolean,
    onExpire(): void 
}

const Timer = ({ expiryTimestamp, onPause, onExpire } : Props) =>{

    useEffect(() => {
      if(onPause){
        pause()
      }
      else{
        resume()
      }
    }, [onPause])
    

    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
      } = useTimer({ expiryTimestamp, onExpire: () => onExpire()});

    return (
        <TimerWrapper>
            <span>{minutes}</span>
            <span>:</span>
            <span>{seconds}</span>
        </TimerWrapper>
    )
}
export default Timer