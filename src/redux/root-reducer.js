import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import tripReducer from "./trip/trip.reducers";
import currentChannelReducer from "./messaging/messaging.reducers";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["channel"],
};

const rootReducer = combineReducers({
  user: userReducer,
  trip: tripReducer,
  channel: currentChannelReducer,
});

export default persistReducer(persistConfig, rootReducer);
