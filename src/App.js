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
      { flipped: false, image: Luigi, id: 1 },
      { flipped: false, image: Toad, id: 2 },
      { flipped: false, image: Bowser, id: 3 },
      { flipped: false, image: Yoshi, id: 4 },
      { flipped: false, image: Peach, id: 5 },
      { flipped: false, image: Wario, id: 6 },
      { flipped: false, image: Bowser, id: 7 },
      { flipped: false, image: Mario, id: 8 },
      { flipped: false, image: DK, id: 9 },
      { flipped: false, image: Mario, id: 10 },
      { flipped: false, image: Yoshi, id: 11 },
      { flipped: false, image: Wario, id: 12 },
      { flipped: false, image: Luigi, id: 13 },
      { flipped: false, image: Peach, id: 14 },
      { flipped: false, image: Toad, id: 15 },
      { flipped: false, image: DK, id: 16 },
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

  handleSelect = (index) => {
    const { cards, firstFlip, secondFlip, hasGameStarted } = this.state;

    let newCards = cards;
    let currentCard = newCards[index];
    if (hasGameStarted == true) {
      if (firstFlip == null && secondFlip == null && currentCard.flipped) {
        // Check that the selected card isn't already flipped
        this.decreaseTurns();
        return;
      } else if (firstFlip == null && secondFlip == null) {
        // Flip the first card
        this.decreaseTurns();
        newCards[index].flipped = !currentCard.flipped;
        currentCard.index = index;
        this.setState({ cards: newCards, firstFlip: currentCard });
      } else if (
        currentCard.id !== firstFlip.id &&
        firstFlip != null &&
        secondFlip == null
      ) {
        // Flip the second card
        this.decreaseTurns();
        newCards[index].flipped = !currentCard.flipped;
        this.setState({ cards: newCards, secondFlip: currentCard });

        // Check the 2 flipped cards for a match
        setTimeout(() => {
          if (firstFlip.image !== currentCard.image) {
            // Turn both back
            newCards[firstFlip.index].flipped = false;
            newCards[index].flipped = !currentCard.flipped;
            this.setState({
              cards: newCards,
              secondFlip: null,
              firstFlip: null,
            });
          } else {
            // Keep them turned
            this.increaseScore();
            this.checkGameWon();
            this.setState({
              secondFlip: null,
              firstFlip: null,
            });
          }
        }, 1000);
      }
    }
  };

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
                  click={() => this.handleSelect(index)}
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
