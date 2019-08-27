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
        <React.Fragment>
          <span>{header}</span>
        </React.Fragment>
      )
    );
  }
  function renderBody(body) {
    switch (body) {
      case "Start":
        // Modal with username form and a button that starts the game
        return (
          <React.Fragment>
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
          </React.Fragment>
        );
      default:
        return (
          <div>
            <button
              className={`beau-button ${styles.modalContentButton} container-margin`}
              onClick={() => props.startGame()}
            >
              {body}
            </button>
          </div>
        );
    }
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalContentHeader}>
          {renderHeader(props.header)}
        </div>
        <div className={styles.modalContentBody}>{renderBody(props.body)}</div>
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
