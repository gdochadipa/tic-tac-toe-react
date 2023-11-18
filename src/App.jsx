/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import classNames from 'classnames';
import { useState } from 'react'
import {Board} from './components/Board'
import { winningAi, minimax } from './utils/board';
import { level } from './lib/position'




function App() {
  const [history, setHistory] = useState([Array(9).fill().map((_,i) => i)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState(null)
  const [levelAi, setLevelAi] = useState('lvl1')
  const isLastGame = history.length == 9;
  let currentSquares = history[currentMove]; 

  const levels = [
    {
      id : 'lvl1',
      name: 'level 1'
    },
    {
      id : 'lvl2',
      name: 'level 2'
    },
    {
      id : 'lvl3',
      name: 'level 3'
    },
  ]
  

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
    setGameOver(false)
    setWinner(null)
  }

  function handleCheckWin(nextSquares, path){
     nextSquares[path] = huPlayer;
     // level3 adalah level standart dg potensi kemenangan 100%
    // ini ngecek kemenangan
     let Owin = winningAi(nextSquares, huPlayer, 'lvl3');

     if(Owin){
        setGameOver(true)
        setWinner(huPlayer)
        
        return nextSquares
     }


      // disini di taruh ai nya
      let bestMove = minimax(nextSquares,aiPlayer,levelAi);
      
      nextSquares[bestMove.index] = 'X';
      let Xwin = winningAi(nextSquares, aiPlayer, 'lvl3');
      
      let win = Owin ? huPlayer : ((Xwin) ? aiPlayer : null);

      if(win){
        setGameOver(true)
        setWinner(win)
      }

      // console.log(nextSquares)

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
        <div className='m-8'>
          <select 
          name="level" 
          id=""
          className='  text-gray-900 text-sm rounded-lg text-lg block w-full p-2.5 dark:bg-black dark:text-white '
          onChange={({target}) => {
            setLevelAi(target.value)
            resetGame()
            
          }}
          >
            {
                levels.map((val, key) => {

                  return (<option className=' text-lg'  value={val.id} key={key} > {val.name} </option>)
                })
            }

          </select>
        </div>
        <div className='flex flex-col items-center gap-8'>
          <Board isLastGame={isLastGame} squares={currentSquares} onPlay={handlePlay} onCheckWin={handleCheckWin} winner={winner} gameover={gameOver} />
        </div>
        <div className='mt-8'>
          <button onClick={resetGame} className='text-lg'>Reset Game</button>
        </div>
      </div>
     
    </>
  )
}



export default App
