/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import classNames from 'classnames';
import { useState } from 'react'
import { Square } from './components/square';


// human
var huPlayer = "O";
// ai
var aiPlayer = "X";


function Board({xIsNext, squares, onPlay}){
  const [board, setBoard] = useState(Array(9).fill(""))
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState(null)
    function handleClick(i) {
      const nextSquares = squares.slice();
      nextSquares[i] = 'O'
      let Owin = winningAi(nextSquares, huPlayer);

      // disini di taruh ai nya
      let bestMove = minimax(nextSquares,aiPlayer);
      
      nextSquares[bestMove.index] = 'X';
      let Xwin = winningAi(nextSquares, aiPlayer);

      if(Owin){
        setGameOver(true)
        setWinner(huPlayer)
      }else if(Xwin){
        setGameOver(true)
        setWinner(aiPlayer)
      }

      // ini next stage
      // setelah giliran O dan X maka akan dilanjutkan ke stage selanjutnya
      // per stage akan di cek siapa pemenangnya
      onPlay(nextSquares)
    }

    let status = 'Next player: ' + (xIsNext ? 'X' : 'O');

    return (
      <>
        <section>
          {
            winner === aiPlayer ? 
            <h1 className="mb-8 text-center text-2xl font-bold">X wins!</h1>
            : 
            ''
          }
          {
            winner === huPlayer ?
            <h1 className="mb-8 text-center text-2xl font-bold">O wins!</h1>
            :
            ''
          }
        </section>
        <div className='grid grid-cols-3 grid-rows-3 relative '>
            {board.map((value, index) => {

              return <Square 
              key={index}
              value={squares[index]}
              disabled={ (squares[index] === huPlayer || squares[index] === aiPlayer || gameOver)}
               onClickSq = {
                () =>{
                   handleClick(index) 
                  }
                }
                index={index}
                />

            })}     
          </div>
      </>
    )
}


function App() {
  const [history, setHistory] = useState([Array(9).fill().map((_,i) => i)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [listMoving, setListMoving] = useState([])
  const xIsNext = currentMove % 2 === 0;
  let currentSquares = history[currentMove]; 

  function jumpTo(nextMove){
    setCurrentMove(nextMove)
  }

  function resetGame(){
    setCurrentMove(0)
    setHistory([Array(9).fill().map((_,i) => i)])
    currentSquares = history[currentMove];
    
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
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
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

function winningAi(board, player){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (player == board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }

  return false;
}

function emptyBoard(board){
  return board.filter(s => s != 'O' && s != 'X')
}

function minimax(newBoard, player){

  //cari spot yg kosong
   var availSpot = emptyBoard(newBoard)

   
   if (winningAi(newBoard, huPlayer)){
    return {score : -10}

   }else if (winningAi(newBoard, aiPlayer)){
    return {score : 10}

   }else if (availSpot.length  === 0){
    return {score:0};
   }

   var moves = []
   /**
    * loop ini bakal ngecek potensi nilai dari setiap posisi yang kosong
    * 
    */
   for (var i = 0; i < availSpot.length; i++){
    var move = {}

    // set index yg jadi target test poin
    move.index = newBoard[availSpot[i]];

    newBoard[availSpot[i]] = player
    var result = null;

    if(player == aiPlayer){
      result = minimax(newBoard, huPlayer)
      move.score = result.score
    }else{
      result = minimax(newBoard, aiPlayer)
      move.score = result.score
    }

    newBoard[availSpot[i]] = move.index


    moves.push(move)
   }

   // if it is the computer's turn loop over the moves and choose the move with the highest score
  var bestMove;
  if(player === aiPlayer){
    var bestScore = -10000;
    for(let i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }else{

   // else loop over the moves and choose the move with the lowest score
    let bestScore = 10000;
    for(let i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

// return the chosen move (object) from the array to the higher depth
  return moves[bestMove];
}


export default App
