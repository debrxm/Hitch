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
const upcoming = [];
export const selectUpcomingTrips = () =>
  createSelector([selectAllTrip], (trips) =>
    trips.forEach((item) => {
      let end = new Date(`${item.date} ${item.time}`);
      let now = new Date();
      let distance = end - now;
      if (distance > 0) {
        upcoming.push(item);
      }
      return upcoming
    })
  );
export const selectJoinedTrip = (userId) =>
  createSelector([selectAllTrip], (trips) => {
    const comingTrip = [];
    trips.forEach((item) => {
      item.passangers.forEach((sItem) => {
        if (sItem.id === userId) {
          comingTrip.push(item);
        }
      });
    });
    return comingTrip;
  });
