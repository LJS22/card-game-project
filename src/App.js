import React, { Component } from "react";
import Card from "./components/Card";
import "./styles/App.css";
import LoseGif from "./images/losingGif.gif";
import Bowser from "./images/bowser.png";
import Mario from "./images/mario.png";
import Wario from "./images/wario.jpg";
import Yoshi from "./images/yoshi.jpg";
import Toad from "./images/toad.jpg";
import DK from "./images/DK.jpg";
import Luigi from "./images/luigi.jpg";
import Peach from "./images/peach.jpg";
import Score from "./components/Score";
import Confetti from "react-dom-confetti";
import "react-responsive-modal/styles.css";
import Modals from "./components/Modal";
import Leaderboard from "./components/Leaderboard";

class App extends Component {
  state = {
    message: "Match the cards to win the game",
    cards: [
      { flipped: false, image: Luigi },
      { flipped: false, image: Toad },
      { flipped: false, image: Bowser },
      { flipped: false, image: Yoshi },
      { flipped: false, image: Peach },
      { flipped: false, image: Wario },
      { flipped: false, image: Bowser },
      { flipped: false, image: Mario },
      { flipped: false, image: DK },
      { flipped: false, image: Mario },
      { flipped: false, image: Yoshi },
      { flipped: false, image: Wario },
      { flipped: false, image: Luigi },
      { flipped: false, image: Peach },
      { flipped: false, image: Toad },
      { flipped: false, image: DK },
    ],
    firstFlip: null,
    secondFlip: null,
    score: 0,
    turns: 25,
    timer: 30,
    active: false,
    openWinModal: false,
    openLoseModal: false,
    hasGameStarted: false,
    boardView: false,
  };

  intervalID = 0;

  startGame = () => {
    this.intervalID = setInterval(() => {
      this.setState({ timer: this.state.timer - 1 });
      this.checkGameLost();
    }, 1000);
    this.setState({ hasGameStarted: true });
  };

  flipHandler = (index) => {
    const { firstFlip, secondFlip, hasGameStarted } = this.state;
    if (hasGameStarted === true) {
      if (firstFlip == null) {
        this.decreaseTurns();
        let newCards = this.state.cards;
        newCards[index].flipped = true;
        this.setState({ cards: newCards, firstFlip: index });
      } else if (secondFlip == null) {
        this.decreaseTurns();
        let newCards = this.state.cards;
        newCards[index].flipped = true;
        this.setState({ cards: newCards, secondFlip: index });
      }
    }
    this.checkGameWon();
  };

  componentDidUpdate() {
    const { firstFlip, secondFlip, cards } = this.state;
    if (firstFlip != null && secondFlip != null) {
      if (cards[firstFlip].image === cards[secondFlip].image) {
        this.increaseScore();
        this.setState({ firstFlip: null, secondFlip: null });
      } else if (cards[firstFlip].image != cards[secondFlip].image) {
        setTimeout(() => {
          let newCards = cards;
          cards[firstFlip].flipped = false;
          cards[secondFlip].flipped = false;
          this.setState({
            cards: newCards,
            firstFlip: null,
            secondFlip: null,
          });
        }, 1000);
      }
    }
  }

  increaseScore = () => {
    this.setState({ score: this.state.score + 1 });
  };

  decreaseTurns = () => {
    this.setState({ turns: this.state.turns - 1 });
    this.checkGameLost();
  };

  checkGameLost = () => {
    if (this.state.turns === 0 || this.state.timer === 0) {
      this.setState({ openLoseModal: true });
      clearInterval(this.intervalID);
    }
  };

  checkGameWon = () => {
    const checker = this.state.cards.every((cards) => cards.flipped === true);
    if (checker === true) {
      this.setState({ active: true, openWinModal: true });
      clearInterval(this.intervalID);
    }
  };

  restartHandler = () => {
    for (let i = 0; i < this.state.cards.length; i++) {
      this.setState((state) => {
        let newState = JSON.parse(JSON.stringify(state));
        newState.cards[i].flipped = false;
        return {
          cards: newState.cards,
        };
      });
    }
    this.setState({
      turns: 25,
      score: 0,
      firstFlip: null,
      secondFlip: null,
      timer: 30,
      openWinModal: false,
      openLoseModal: false,
      hasGameStarted: false,
    });
    clearInterval(this.intervalID);
  };

  toggleView = () => {
    this.setState({ boardView: !this.state.boardView });
  };

  render() {
    const {
      score,
      turns,
      timer,
      cards,
      message,
      openWinModal,
      openLoseModal,
      boardView,
    } = this.state;
    return (
      <section className="board">
        {boardView ? <Leaderboard /> : null}
        <header className="header">
          <div className="title">
            <h1>MEMORY GAME</h1>
          </div>
          <div className="messages">
            <Score score={score} turns={turns} timer={timer} />
          </div>
          <button className="startButton" onClick={this.startGame}>
            START GAME
          </button>
        </header>
        <Modals
          open={openWinModal}
          onClose={this.restartHandler}
          image={null}
          form={openWinModal}
          timer={timer}
        />
        <Modals
          open={openLoseModal}
          onClose={this.restartHandler}
          image={LoseGif}
        />
        <main className="mainBody">
          {cards.map((card, index) => {
            return (
              <>
                <Card
                  key={index}
                  image={card.image}
                  flipped={card.flipped}
                  click={() => this.flipHandler(index)}
                />
                <Confetti active={this.state.active} />
              </>
            );
          })}
        </main>
        <footer>
          <button className="restartButton" onClick={this.toggleView}>
            Leaderboard
          </button>
          <p className="message1">{message}</p>
          <button className="restartButton" onClick={this.restartHandler}>
            RESTART
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
