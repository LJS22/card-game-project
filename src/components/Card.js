import React from "react";
import ReactCardFlip from "react-card-flip";
import "../styles/Card.css";

const Card = (props) => {
  return (
    <ReactCardFlip isFlipped={props.flipped} flipDirection="horizontal">
      <div className="card-front" onClick={props.click}>
        <p className="message">Click Me!</p>
      </div>
      <div className="card-back">
        <img className="card-image" src={props.image} alt="" />
      </div>
    </ReactCardFlip>
  );
};

export default Card;
