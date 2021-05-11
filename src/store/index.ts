import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { reducer as accountReducer } from "./account/slice";
import { reducer as medicinesReducer } from "./medicines/slice";

const persistConfig = {
  key: "echo_auto_orders_prototype",
  storage,
};

const rootReducer = combineReducers({
  account: accountReducer,
  medicines: medicinesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export let store = configureStore({
  reducer: persistedReducer,
  // reducer: rootReducer,
});

export let persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;
export type GetState = () => AppState;
export type Dispatch = typeof store.dispatch;
