import React from "react";
import "../styles/Score.css";

const Score = (props) => {
  return (
    <div className="scoreTurns">
      <h2>Score: {props.score}</h2>
      <h2>Turns: {props.turns}</h2>
      <h2>Timer: {props.timer}</h2>
    </div>
  );
};

export default Score;
