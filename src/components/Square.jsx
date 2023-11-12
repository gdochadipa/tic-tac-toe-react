/* eslint-disable react/prop-types */
import classNames from 'classnames';


export function Square({value, onClickSq, index, disabled}){
  // human
var huPlayer = "O";
// ai
var aiPlayer = "X";

  let x =  (value == huPlayer || value == aiPlayer) ? value : '' ;
  const noBorderRight = [2,5,8];

  return (
    <button 
    type='button'
    disabled= {disabled}
    className={
      classNames(
        "h-24 w-24 text-4xl font-bold disabled:cursor-not-allowed ",
          {
          "border-b border-white" : noBorderRight.includes(index) && index < 8
        },
        {
          " border-r border-white" :  !noBorderRight.includes(index) && index < 8
        },
        {
          "border-b border-white" : !noBorderRight.includes(index) && index < 5
        }
      )
    } onClick={onClickSq}>
        <div className='flex items-center justify-center h-full '>
         {x}
        </div>
    </button>
  )
}