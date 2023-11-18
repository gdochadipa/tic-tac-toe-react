import { level } from "../lib/position";
// human
var huPlayer = "O";
// ai
var aiPlayer = "X";

export const winningAi = (board, player, lvl) => {
    const lines = level[lvl];

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

export function minimax(newBoard, player, lvl){
     //cari spot yg kosong
   var availSpot = emptyBoard(newBoard)

   if (winningAi(newBoard, huPlayer, lvl)){
    return {score : -10}

   }else if (winningAi(newBoard, aiPlayer, lvl)){
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
      result = minimax(newBoard, huPlayer, lvl)
      move.score = result.score
    }else{
      result = minimax(newBoard, aiPlayer, lvl)
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