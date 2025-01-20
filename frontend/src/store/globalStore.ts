import {
  AnyAction,
  combineReducers,
  configureStore,
  Reducer,
} from "@reduxjs/toolkit";
import storageSession from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import authSlice from "./authStore/authStore";

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const combinedReducer = combineReducers({
  auth: authSlice.reducer,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === "authStore/logout") {
    state = {} as RootState;
  }
  return combinedReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const globalStore = configureStore({
  devTools: true,
  reducer: rootReducer,
});

export const persistor = persistStore(globalStore);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof combinedReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof globalStore.dispatch;

export default globalStore;

export const authActions = authSlice.actions;
