import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { profileApi } from "./profileapi";
import profilereducer from "./profilereducer";
const rootReducer = combineReducers({
  profile: profilereducer,
  [profileApi.reducerPath]: profileApi.reducer, // Add this line
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(profileApi.middleware), // Fix this line
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
