import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";

import storageSession from "redux-persist/lib/storage/session";

import { apiSlice, authSlice } from "@api/config";
import authReducer from "@redux/reducers/auth";
import initReducer from "@redux/reducers/init";
import historyReducer from "@redux/reducers/history";

const persistConfig = {
  key: "root",
  storage: storageSession,
  blacklist: [],
};

const rootReducer = combineReducers({
  init: initReducer,
  auth: authReducer,
  history: historyReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [authSlice.reducerPath]: authSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware, authSlice.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
