export const horWinPos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
];

export const verWinPos = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
]

export const diagonal = [
  [0, 4, 8],
  [2, 4, 6],
]


export const lvlOnePos = [
    horWinPos[0],
    horWinPos[2],
    verWinPos[1],
    diagonal[0],
];

export const lvlTwoPos = [
    horWinPos[0],
    horWinPos[2],
    verWinPos[0],
    ...diagonal,
];

export const lvlThree = [
    ...horWinPos,
    ...verWinPos,
    ...diagonal
]

export const level = {
   'lvl1' : lvlOnePos,
   'lvl2' : lvlTwoPos,
   'lvl3' :lvlThree
}
