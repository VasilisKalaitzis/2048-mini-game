import React from "react";

// state managment
import { connect } from "react-redux";

// css
import styles from "./scoreboard.module.scss";

const Scoreboard = props => {
  return (
    <div
      className={"flexcontainer color-pallete1 " + styles.scoreboardContainer}
    >
      <div className={`${styles.scoreboardHeader} flexcontainer-block xs-12`}>
        <div className="flexcontainer-block xs-6 sm-hide">Player</div>
        <div className="flexcontainer-block xs-6">Moves</div>
        <div className="flexcontainer-block xs-6 sm-hide big-fonts">
          <b>
            YOU
            {props.username !== undefined &&
              props.username !== "" &&
              "(" + props.username + ")"}{" "}
          </b>
        </div>
        <div className="flexcontainer-block xs-6 big-fonts">
          <b>{props.currentScore}</b>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  username: state.gameReducer.username,
  currentScore: state.gameReducer.currentScore
});

export default connect(
  mapStateToProps,
  null
)(Scoreboard);
