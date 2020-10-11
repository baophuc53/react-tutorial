import React from "react";
import Board from "./Board";
import { calculateWinner } from "../helper/helper";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          stepLocate: [],
        },
      ],
      reverse: false,
      stepNumber: 0,
      winner: null,
      winCell: [],
      xIsNext: true,
    };
  }

  setWinner=(winner, winCell)=>{
      this.setState({winner, winCell})
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.state.winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    calculateWinner(squares, this.setWinner)
    this.setState({
      history: history.concat([
        {
          stepLocate: [(i - (i % 3)) / 3, i % 3],
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
      winCell: [],
      winner: null
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const moves = history.map((key, move) => {
      const desc = move
        ? `Go to move (${key.stepLocate[0]},${key.stepLocate[1]})`
        : "Go to game start";
      return (
        <li key={move}>
          <button
            onClick={() => this.jumpTo(move)}
            className={this.state.stepNumber === move ? "bold-btn" : ""}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (this.state.winner) {
      status = "Winner: " + this.state.winner;
    } else if (this.state.stepNumber<9){
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    } else
      status = "Tie";  
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winCell={this.state.winCell}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button
            onClick={() => {
              this.setState({ reverse: !this.state.reverse });
            }}
          >
            Reverse
          </button>
          <div >
            <ol className={this.state.reverse ? "reverse-div" : ""}>{moves}</ol>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
