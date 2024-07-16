import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { applicationsApi } from "./applicationsapi";
import applicationslice from "./applicatonreducer";

const rootReducer = combineReducers({
  application: applicationslice.reducer,
  [applicationsApi.reducerPath]: applicationsApi.reducer, // Add this line
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(applicationsApi.middleware), // Fix this line
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
