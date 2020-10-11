import React from "react";
import Square from "./Square";

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        key={i}
        isWinCell={this.props.winCell.includes(i)}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  createBoard(n) {
    const board = [];
    for (let i = 0; i < n; i++) {
      let row = [];
      for (let j = 0; j < n; j++) {
        row.push(this.renderSquare(j + i * n));
      }
      board.push(
        <div className="board-row" key={i}>
          {row}
        </div>
      );
    }
    return board;
  }

  render() {
    return <div>{this.createBoard(3)}</div>;
  }
}

export default Board;
