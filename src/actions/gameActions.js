import {
  OPEN_MODAL,
  CLOSE_MODAL,
  START_GAME,
  INCREASE_CURRENT_SCORE
} from "./types";

// start the game
// request: none
// parameters:
//        username string = (the name of the current player)
export const startGame = username => dispatch => {
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

// IMPORTANT: Everything that has to do with the modal should have been in different action/reducer
// Due to time restriction, I decided to leave it here
// open the modal
// request: none
// parameters:
//        header string = (the message displayed on the header)
//        body   string = (the type of the body)
export const openModal = (header, body) => dispatch => {
  dispatch({
    type: OPEN_MODAL,
    payload: {
      header: header,
      body: body
    }
  });
};

// close the modal
// request: none
// parameters:
//            ---
export const closeModal = () => dispatch => {
  dispatch({
    type: CLOSE_MODAL,
    payload: {}
  });
};
