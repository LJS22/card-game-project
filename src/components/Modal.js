import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "../styles/Modal.css";
import Form from "./Form";

const Modals = (props) => {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
        center
        styles={{
          modal: {
            width: "400px",
            height: "300px",
            borderRadius: "15%",
            fontFamily: "'Lemonada', cursive",
            color: "#fff",
            animation: `${
              props.open ? "spinIn" : "spinOut"
            } 1500ms ease-in-out`,
          },
        }}
      >
        <img className="modalImg" src={props.image} alt="" />
        {props.form ? <Form /> : null}
      </Modal>
    </div>
  );
};

export default Modals;
