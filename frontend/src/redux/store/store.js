import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";
import courseSlice from "./slices/courseSlice";
import modalSlice from "./slices/modalSlice";
import questionSlice from "./slices/questionSlice";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  course: courseSlice,
  modal: modalSlice,
  question: questionSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
