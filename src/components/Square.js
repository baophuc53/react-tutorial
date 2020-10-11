import React from "react";

function Square(props) {
    return (
      <button className={props.isWinCell?"square fill-square":"square"} onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

export default Square
  