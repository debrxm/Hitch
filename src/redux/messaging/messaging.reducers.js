import { messagingActionTypes } from "./messaging.actionTypes";
const INITIAL_STATE = {
  currentChannel: null,
};

const currentChannelReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case messagingActionTypes.SET_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload,
      };
    default:
      return state;
  }
};

export default currentChannelReducer;
