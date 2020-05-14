import { tripActionTypes } from './trip.actionTypes';

export const setFoundTrip = (trip) => ({
  type: tripActionTypes.SET_FOUND_TRIP,
  payload: trip,
});
