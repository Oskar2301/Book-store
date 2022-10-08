import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "./slices/headerSlice";
import homeReducer from "./slices/homeSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: { headerReducer, homeReducer, userReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
