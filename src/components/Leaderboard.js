import React, { Component } from "react";
import "../styles/Leaderboard.css";

class Leaderboard extends Component {
  state = {
    playersNames: [],
    playersTimes: [],
  };

  componentDidMount = async () => {
    await fetch("http://localhost:4500/cardgameleaderboard/v1/allplayers")
      .then((response) => response.json())
      .then((data) => this.manipulateData(data));
  };

  manipulateData = (data) => {
    let playersNames = [];
    let playersTimes = [];
    for (let i = 0; i < data.data.length; i++) {
      playersNames.push(data.data[i].username);
      playersTimes.push(data.data[i].time);
    }
    this.setState({ playersNames: playersNames, playersTimes: playersTimes });
    console.log(playersNames, playersTimes);
  };

  render() {
    return (
      <div className="boardMain">
        {this.state.playersNames.map(() => {
          return (
            <>
              <li>{this.state.playersNames + this.state.playersTimes}</li>
            </>
          );
        })}
      </div>
    );
  }
}

export default Leaderboard;
