import React, { useEffect } from "react";

// state managment
import { connect } from "react-redux";
import { fetchScoreHistory } from "../../actions/gameActions";
// css
import styles from "./scoreboard.module.scss";

const Scoreboard = props => {
  // component will mount
  useEffect(() => {
    props.fetchScoreHistory();
  }, []);

  // section for the current user
  function renderScoreboardHeader(username, score) {
    return (
      <React.Fragment>
        <div className="flexcontainer-block block-margin xs-6 sm-hide">
          Player
        </div>
        <div className="flexcontainer-block block-margin xs-6">Moves</div>
        <div className="flexcontainer-block block-margin xs-6 text-elipsis sm-hide big-fonts">
          <span>
            <b>
              YOU
              {username !== undefined &&
                username !== "" &&
                "(" + username + ")"}
            </b>
          </span>
        </div>
        <div className="flexcontainer-block block-margin text-elipsis xs-6 big-fonts">
          <b>{score}</b>
        </div>
      </React.Fragment>
    );
  }

  // section for the scoreboard history
  function renderScoreboardBody(scores) {
    return (
      scores !== undefined &&
      scores.map((record, index) => {
        return (
          <div key={"scoreboard-body-" + index} className="flexcontainer">
            <div className="flexcontainer-block block-margin xs-6">
              {index + 1}) {record.username}
            </div>
            <div className="flexcontainer-block block-margin xs-6">
              {record.score}
            </div>
          </div>
        );
      })
    );
  }

  return (
    <div
      className={"flexcontainer color-pallete1 " + styles.scoreboardContainer}
    >
      <div className={`${styles.scoreboardHeader} flexcontainer-block xs-12`}>
        {renderScoreboardHeader(props.username, props.currentScore)}
      </div>
      <div
        className={`${styles.scoreboardBody} flexcontainer-block xs-12 sm-hide`}
      >
        {renderScoreboardBody(props.scoreHistory)}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  username: state.gameReducer.username,
  currentScore: state.gameReducer.currentScore,
  scoreHistory: state.gameReducer.scoreHistory
});

export default connect(
  mapStateToProps,
  { fetchScoreHistory }
)(Scoreboard);
