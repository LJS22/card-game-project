import React, { Component } from "react";
import "../styles/Leaderboard.css";

class Leaderboard extends Component {
  state = {
    players: [],
  };

  componentDidMount = async () => {
    await fetch("https://git.heroku.com/card-game-rest-api/allplayers.git")
      .then((response) => response.json())
      .then((data) => this.manipulateData(data));
  };

  manipulateData = (data) => {
    let players = [];
    for (let i = 0; i < data.data.length; i++) {
      players.push([data.data[i].username, data.data[i].time]);
    }
    players.sort(function (a, b) {
      if (a[1] < b[1]) return -1;
      if (a[1] > b[1]) return 1;
      return 0;
    });
    this.setState({ players: players });
  };

  render() {
    return (
      <div className="boardMain">
        <header>
          <h1>HIGHSCORES</h1>
          <div className="boardTitles">
            <h2 className="h2Titles">PLACE</h2>
            <h2 className="h2Titles">NAME</h2>
            <h2 className="h2Titles">TIMES</h2>
          </div>
        </header>
        {this.state.players.map((player, index) => {
          return (
            <main>
              <div className="listBlock">
                <div className="playerLists1">
                  <p>{index + 1}</p>
                </div>
                <div className="playerLists">
                  <p>{player[0]}</p>
                </div>
                <div className="playerLists">
                  <p>{player[1]}</p>
                </div>
              </div>
            </main>
          );
        })}
      </div>
    );
  }
}

export default Leaderboard;
