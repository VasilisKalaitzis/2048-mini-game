import {
  START_GAME,
  INCREASE_CURRENT_SCORE,
  CHANGE_GAME_STATUS,
  FETCH_SCORE_HISTORY
} from "./types";

// start the game
// request: none
// parameters:
//        username string = (the name of the current player)
export const startGame = username => (dispatch, getState) => {
  // if the username has not been provided, then use the username in the state
  if (username === undefined) {
    username = getState().gameReducer.username;
  }

  dispatch({
    type: START_GAME,
    payload: {
      username: username
    }
  });
};

// increase the score counter
// request: none
// parameters:
//           -----
export const increaseCurrentScore = () => dispatch => {
  dispatch({
    type: INCREASE_CURRENT_SCORE,
    payload: {}
  });
};

// change the status of the game
// request: none
// parameters:
//           gameStatus string = (the new status of the game)
export const changeGameStatus = gameStatus => (dispatch, getState) => {
  if (gameStatus === "victory") {
    // store the user's score on the scoreboard
    let { username, currentScore, scoreHistory } = getState().gameReducer;
    let scores = storeUserScore(username, currentScore, scoreHistory);

    dispatch({
      type: FETCH_SCORE_HISTORY,
      payload: {
        scoreHistory: scores
      }
    });
  }

  dispatch({
    type: CHANGE_GAME_STATUS,
    payload: {
      gameStatus: gameStatus
    }
  });
};

function storeUserScore(username, score, scoreHistory = []) {
  // we could use binary search in order to place the new score
  // on the currect order since we know that the array is already sorted.
  // however, we also know that there are very few records on the table,
  // thus, we sacrifice almost no-performance for readability

  // push the new score on a sorted position
  var newEntry = { username: username, score: score };
  scoreHistory.push(newEntry);
  scoreHistory.sort((a, b) => {
    return a.score - b.score;
  });

  // remove the last element if the maximun records exceeded
  if (scoreHistory.length > 10) {
    scoreHistory.pop();
  }

  localStorage.setItem("scores_2048", JSON.stringify(scoreHistory));

  return scoreHistory;
}

// fetch the scores from previous users
// request: none
// parameters:
//           ------
export const fetchScoreHistory = () => dispatch => {
  var scores = localStorage.getItem("scores_2048");
  if (scores === null) {
    scores = [];
  } else {
    scores = JSON.parse(scores);
  }

  dispatch({
    type: FETCH_SCORE_HISTORY,
    payload: {
      scoreHistory: scores
    }
  });
};

// IMPORTANT: Everything that has to do with the modal should have been in different action/reducer
// Due to time restriction, I decided to leave it here
// open the modal
// request: none
// parameters:
//        header string = (the message displayed on the header)
//        body   string = (the type of the body)
// export const openModal = (header, body) => dispatch => {
//   dispatch({
//     type: OPEN_MODAL,
//     payload: {
//       header: header,
//       body: body
//     }
//   });
// };

// // close the modal
// // request: none
// // parameters:
// //            ---
// export const closeModal = () => dispatch => {
//   dispatch({
//     type: CLOSE_MODAL,
//     payload: {}
//   });
// };
