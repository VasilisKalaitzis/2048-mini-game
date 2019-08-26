import React from "react";

// state managment
import { connect } from "react-redux";

// components
import Tiles from "./components/Tiles";
import Modal from "./components/Modal";
import Scoreboard from "./components/Scoreboard";

// css
import "./css/app.scss";
import "./css/containers.scss";
import "./css/colors.scss";
import "./css/frames.scss";
import "./css/elements.scss";

const App = props => {
  return (
    <div className="App color-pallete2">
      {/* Modal window here */}
      {props.modal.visibility && (
        <Modal header={props.modal.header} body={props.modal.body}></Modal>
      )}
      {/* main content here */}
      <div className="sub-app">
        <div className="sub-app-content flexcontainer">
          {/* container of the actual game */}
          <div className="flexcontainer-block block-margin xs-12 md-6">
            {props.gameStatus === "running" && <Tiles></Tiles>}
          </div>
          {/* score board */}
          <div className="flexcontainer-block block-margin xs-12 md-6">
            <Scoreboard></Scoreboard>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  modal: state.gameReducer.modal,
  gameStatus: state.gameReducer.gameStatus
});

export default connect(
  mapStateToProps,
  null
)(App);
