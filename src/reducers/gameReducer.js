import {
  OPEN_MODAL,
  CLOSE_MODAL,
  START_GAME,
  INCREASE_CURRENT_SCORE
} from "../actions/types";

const initialState = {
  modal: {
    visibility: 1,
    header: "Enter Username",
    body: "Start"
  },
  gameStatus: "halted",
  currentScore: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        modal: {
          visibility: true,
          header: action.payload.header,
          body: action.payload.body
        }
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modal: {
          visibility: false,
          header: "",
          body: ""
        }
      };
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
      break;
    default:
      return state;
  }
}
