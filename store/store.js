import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

import adminReducer from "./admin/admin.slice";
import mediaReducer from "./media/media.slice";


const rootReducer = combineReducers({
  admin: adminReducer,
  media: mediaReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
