import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";

// initial states here
const initalState = {};

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// middleware
const middleware = [thunk];

// creating store
// export const store = createStore(
//   rootReducer,
//   initalState,
//   composeWithDevTools(applyMiddleware(...middleware)),
// );

export const store = configureStore({
  reducer: persistedReducer,

  middleware: [thunk],
});

// assigning store to next wrapper
const makeStore = () => store;
export const persistor = persistStore(store);
export const wrapper = createWrapper(makeStore);
