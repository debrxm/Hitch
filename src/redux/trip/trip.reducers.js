import { tripActionTypes } from './trip.actionTypes';
const INITIAL_STATE = {
  trip: null,
};

const tripReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case tripActionTypes.SET_FOUND_TRIP:
      return {
        ...state,
        trip: action.payload,
      };

    default:
      return state;
  }
};

export default tripReducer;
