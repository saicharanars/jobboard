import { combineReducers, configureStore } from "@reduxjs/toolkit";
import jobslice from "./Jobreducer";
import { jobsApi } from "./jobsapi";

const rootReducer = combineReducers({
  job: jobslice.reducer,
  [jobsApi.reducerPath]: jobsApi.reducer, // Add this line
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(jobsApi.middleware), // Fix this line
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;