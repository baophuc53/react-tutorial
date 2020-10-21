import React from "react";
import Square from "./Square";

function Board(props) {
  const renderSquare = (i) => 
      <Square
        value={props.squares[i]}
        key={i}
        isWinCell={props.winCell.includes(i)}
        onClick={() => props.onClick(i)}
      />

  const createBoard = (n) => {
    const board = [];
    for (let i = 0; i < n; i++) {
      let row = [];
      for (let j = 0; j < n; j++) {
        row.push(renderSquare(j + i * n));
      }
      board.push(
        <div className="board-row" key={i}>
          {row}
        </div>
      );
    }
    return board;
  }
  return <div>{createBoard(3)}</div>;
}

export default Board;
