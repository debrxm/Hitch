import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import tripReducer from './trip/trip.reducers';

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['shop']
};

const rootReducer = combineReducers({
  user: userReducer,
  trip: tripReducer,
});

export default persistReducer(persistConfig, rootReducer);
