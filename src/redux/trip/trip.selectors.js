import { createSelector } from 'reselect';

const selectTrip = (state) => state.trip;

export const selectAllTrip = createSelector(
  [selectTrip],
  (trip) => trip.allTrips
);
export const selectFoundTrip = createSelector(
  [selectTrip],
  (trip) => trip.foundTrip
);
export const selectATrip = (tripId, url) =>
  createSelector([selectAllTrip], (trip) =>
    trip.filter((item, index) => item.id === tripId)
  );
