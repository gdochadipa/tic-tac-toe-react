/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import classNames from 'classnames';
import { useState } from 'react'
import {Board} from './components/Board'
import { winningAi, minimax } from './utils/board';




function App() {
  const [history, setHistory] = useState([Array(9).fill().map((_,i) => i)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState(null)
  const xIsNext = currentMove % 2 === 0;
  let currentSquares = history[currentMove]; 

  // human
var huPlayer = "O";
// ai
var aiPlayer = "X";


  function jumpTo(nextMove){
    setCurrentMove(nextMove)
  }

  function resetGame(){
    setCurrentMove(0)
    setHistory([Array(9).fill().map((_,i) => i)])
    currentSquares = history[currentMove];
    
  }

  function handleCheckWin(nextSquares, path){
     nextSquares[path] = huPlayer;
    
     let Owin = winningAi(nextSquares, huPlayer);

      // disini di taruh ai nya
      let bestMove = minimax(nextSquares,aiPlayer);
      
      nextSquares[bestMove.index] = 'X';
      let Xwin = winningAi(nextSquares, aiPlayer);
      
      let win = Owin ? huPlayer : ((Xwin) ? aiPlayer : null);

      if(win){
        setGameOver(true)
        setWinner(win)
      }

       return nextSquares
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]

    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  let moves = history.map((squares, move) => {
    let desc = '';
    if(move > 0){
      desc = 'Go to move #' + move;
    } else {
      desc = 'Go to game start';
    }

    return (
      <li key={move}>
        <div className=' py-3 px-1 m-1 rounded-md'>
           <button onClick={()=> jumpTo(move)}>{desc}</button>
        </div>
       
      </li>
    );
  })


  return (
    <>
     <div className='flex min-h-screen w-full flex-col items-center justify-center gap-4 transition-colors duration-300 dark:bg-black dark:text-white'>
        <div className='flex flex-col items-center gap-8'>
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} onCheckWin={handleCheckWin} winner={winner} gameover={gameOver} />
        </div>
        {/* <div className='game-info'>
            <ol>{moves}</ol>
        </div> */}
        <div>
          <button onClick={resetGame}>Reset Game</button>
        </div>
      </div>
     
    </>
  )
}



export default App
