/* eslint-disable react/prop-types */
import { Square } from './Square'

// human
var huPlayer = "O";
// ai
var aiPlayer = "X";



// eslint-disable-next-line no-unused-vars
export function Board({xIsNext, squares, onPlay, onCheckWin, winner, gameover}){
 // eslint-disable-next-line no-unused-vars
    const board = Array(9).fill("")

    function handleClick(i) {
        let nextSquares = squares.slice();
        
        nextSquares = onCheckWin(nextSquares, i);

        // ini next stage
        // setelah giliran O dan X maka akan dilanjutkan ke stage selanjutnya
        // per stage akan di cek siapa pemenangnya
        onPlay(nextSquares)
    }

    // let status = 'Next player: ' + (xIsNext ? 'X' : 'O');

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
              disabled={ (squares[index] === huPlayer || squares[index] === aiPlayer || gameover)}
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