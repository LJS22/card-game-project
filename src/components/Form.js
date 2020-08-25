import React from "react";
import "../styles/Form.css";

const Form = () => {
  return (
    <div>
      <form
        action="http://localhost:4500/cardgameleaderboard/v1/players"
        method="POST"
      >
        <input type="text" placeholder="Player Name" id="userame"></input>
        <p>Score</p>
        <p id="time" value="15"></p>
        <button type="submit">SUBMIT!</button>
      </form>
    </div>
  );
};

export default Form;
