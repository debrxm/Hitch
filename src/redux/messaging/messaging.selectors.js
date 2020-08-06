import { createSelector } from "reselect";

const selectChannel = (state) => state.channel;

export const selectCurrentChannel = createSelector(
  [selectChannel],
  (channel) => channel.currentChannel
);
