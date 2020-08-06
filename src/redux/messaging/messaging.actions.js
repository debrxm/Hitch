import { messagingActionTypes } from "./messaging.actionTypes";

export const setCurrentChannel = (channel) => ({
  type: messagingActionTypes.SET_CHANNEL,
  payload: channel,
});
