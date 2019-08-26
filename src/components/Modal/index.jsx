import React, { useState } from "react";
import PropTypes from "prop-types";

// state managment
import { connect } from "react-redux";
import { startGame } from "../../actions/gameActions";

// css
import styles from "./modal.module.scss";

const Modal = props => {
  const [username, setUsername] = useState("");

  function renderHeader(header) {
    return (
      header !== "" && (
        <div className={styles.modalContentHeader}>
          <span>{header}</span>
        </div>
      )
    );
  }
  function renderBody(body) {
    switch (body) {
      case "Start":
        // Modal with username form and a button that starts the game
        return (
          <div className={styles.modalContentBody}>
            <div className={styles.inputContainer}>
              <input
                type="text"
                onChange={e => setUsername(e.currentTarget.value)}
              ></input>
            </div>
            <div>
              <button
                className={`beau-button ${styles.modalContentButton} container-margin`}
                onClick={() => props.startGame(username)}
              >
                {body}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {renderHeader(props.header)}
        {renderBody(props.body)}
      </div>
    </div>
  );
};

Modal.propTypes = {
  header: PropTypes.string,
  body: PropTypes.string
};

Modal.defaultProps = {
  header: "",
  body: ""
};

export default connect(
  null,
  { startGame }
)(Modal);
