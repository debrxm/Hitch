import { createSelector } from 'reselect';

const selectTrip = (state) => state.trip;

export const selectFoundTrip = createSelector(
  [selectTrip],
  (trip) => trip.trip
);
