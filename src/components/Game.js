import React from "react";
import { useState } from "react";
import Board from "./Board";
import { calculateWinner } from "../helper/helper";

function Game() {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      stepLocate: [],
    },
  ]);

  const [reverse, setReverse] = useState(false);
  const [stepNumber, setStepNumber] = useState(0);
  const [winner, setWinner] = useState(null);
  const [winCell, setWinCell] = useState([]);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    const h = history.slice(0, stepNumber + 1);
    const current = h[h.length - 1];
    const squares = current.squares.slice();
    if (winner || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    const cell = calculateWinner(squares);
    if (cell) {
      setWinCell(cell);
      setWinner(squares[cell[0]]);
    } else {
      setWinner(null);
      setWinCell([]);
    }
    setHistory(
      h.concat([
        {
          stepLocate: [(i - (i % 3)) / 3, i % 3],
          squares: squares,
        },
      ])
    );
    setStepNumber(h.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    const s = history[step].squares;
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
    const cell = calculateWinner(s);
    if (cell) {
      setWinCell(cell);
      setWinner(s[cell[0]]);
    } else {
      setWinner(null);
      setWinCell([]);
    }
  };
  const current = history[stepNumber];
  const moves = history.map((key, move) => {
    const desc = move
      ? `Go to move (${key.stepLocate[0]},${key.stepLocate[1]})`
      : "Go to game start";
    return (
      <li key={move}>
        <button
          onClick={() => jumpTo(move)}
          className={stepNumber === move ? "bold-btn" : ""}
        >
          {desc}
        </button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (stepNumber < 9) {
    status = "Next player: " + (xIsNext ? "X" : "O");
  } else status = "Tie";
  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          winCell={winCell}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button
          onClick={() => {
            setReverse(!reverse);
          }}
        >
          Reverse
        </button>
        <div>
          <ol className={reverse ? "reverse-div" : ""}>{moves}</ol>
        </div>
      </div>
    </div>
  );
}

export default Game;
