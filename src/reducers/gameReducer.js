import {
  START_GAME,
  INCREASE_CURRENT_SCORE,
  CHANGE_GAME_STATUS
} from "../actions/types";

const initialState = {
  modal: {
    visibility: true,
    header: "Enter Username",
    body: "Start"
  },
  username: "",
  gameStatus: "halted",
  currentScore: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        modal: {
          visibility: false,
          header: "",
          body: ""
        },
        gameStatus: "running",
        username: action.payload.username,
        currentScore: 0
      };
    case INCREASE_CURRENT_SCORE:
      let newCurrentScore = state.currentScore + 1;
      return {
        ...state,
        currentScore: newCurrentScore
      };
    case CHANGE_GAME_STATUS:
      let modal;
      switch (action.payload.gameStatus) {
        case "victory":
          // store the user's score on the scoreboard

          modal = {
            visibility: true,
            header: "You have won!",
            body: "Restart"
          };

          return {
            ...state,
            modal: modal,
            gameStatus: action.payload.gameStatus
          };
        case "defeat":
          modal = {
            visibility: true,
            header: "You have lost!",
            body: "Restart"
          };

          return {
            ...state,
            modal: modal,
            gameStatus: action.payload.gameStatus
          };
        default:
          return { ...state };
      }
    default:
      return state;
  }
}
