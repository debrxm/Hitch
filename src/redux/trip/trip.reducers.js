import { tripActionTypes } from './trip.actionTypes';
const INITIAL_STATE = {
  allTrip: [],
  foundTrip: [],
};

const tripReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case tripActionTypes.SET_TRIPS:
      return {
        ...state,
        allTrips: action.payload,
      };

    case tripActionTypes.SET_FOUND_TRIP:
      return {
        ...state,
        foundTrip: action.payload,
      };

    default:
      return state;
  }
};

export default tripReducer;
