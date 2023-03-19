import styled from "styled-components";

export const BoardContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #555;
`

export const BoardPlace = styled.div`
    width: 640px;
    height: 640px;
    display: flex;
    flex-wrap: wrap;
`

export const TimerContainer = styled.div`
    width: 200px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    height: 640px;
    font-size: 24px;
    font-weight: 600;
`

export const TurnContainer = styled.span`
    color: white;
    text-align: center;
`

export default BoardContainer