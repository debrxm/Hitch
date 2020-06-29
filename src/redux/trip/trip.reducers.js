import { tripActionTypes } from './trip.actionTypes';
const INITIAL_STATE = {
  allTrip: [],
  foundTrip: [],
  editTrip: null,
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
    case tripActionTypes.EDIT_TRIP:
      return {
        ...state,
        editTrip: action.payload,
      };

    default:
      return state;
  }
};

export default tripReducer;
