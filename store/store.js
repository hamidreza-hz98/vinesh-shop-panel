import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

import adminReducer from "./admin/admin.slice";
import mediaReducer from "./media/media.slice";
import categoryReducer from "./category/category.slice";
import tagReducer from "./tag/tag.slice";
import brandReducer from "./brand/brand.slice";

const rootReducer = combineReducers({
  admin: adminReducer,
  media: mediaReducer,
  category: categoryReducer,
  tag: tagReducer,
  brand: brandReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
