import React from "react";
import "../styles/Form.css";

class Form extends React.Component {
  state = {
    username: "",
    time: null,
  };

  updateUsername = (e) => {
    this.setState({ username: e.target.value });
  };

  componentDidMount = () => {
    this.setState({ time: 30 - this.props.timer });
  };

  sendData = async (e) => {
    const response = await fetch(
      "https://git.heroku.com/card-game-rest-api/players.git",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: this.state.username,
          time: this.state.time,
        }),
      }
    );
    e.preventDefault();
    const data = await response.json();
    console.log(data);
  };
  render() {
    return (
      <div className="mainForm">
        <h1 className="formTitle">Congratualtions!</h1>
        <h3 className="formTitle">
          Submit your name below to add your score to the Leaderboard!
        </h3>
        <form>
          <input
            type="text"
            placeholder="Player Name"
            onChange={this.updateUsername}
          ></input>
          <p className="timer">Your Time: {this.state.time}s</p>
          <button type="submit" onClick={this.sendData}>
            SUBMIT!
          </button>
        </form>
      </div>
    );
  }
}
export default Form;
