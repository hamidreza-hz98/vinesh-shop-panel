import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

import adminReducer from "./admin/admin.slice";


const rootReducer = combineReducers({
  admin: adminReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
