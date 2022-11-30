import { createSlice } from "@reduxjs/toolkit";

export interface userState {
  userId: string | null;
  userEmail: string | null;
  favorite: any | null;
  errorLogin: boolean;
  errorAuth: boolean;
}

const user = JSON.parse(localStorage.getItem("User")!);

const initialState: userState = {
  userId: user && user.userId,
  userEmail: user && user.userEmail,
  favorite: user && user.fav,
  errorAuth: false,
  errorLogin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.userId = action.payload.user.uid;
      state.userEmail = action.payload.user.email;
      state.favorite = action.payload.fav;
      state.errorAuth = false;
      state.errorLogin = false;
      localStorage.setItem(
        "User",
        JSON.stringify({
          userId: state.userId,
          userEmail: state.userEmail,
          fav: state.favorite,
        })
      );
    },
    removeUser(state) {
      state.userId = null;
      state.userEmail = null;
      state.favorite = null;
      localStorage.setItem("User", JSON.stringify(null));
    },
    errorLogin(state) {
      state.errorLogin = true;
    },
    errorAuth(state) {
      state.errorAuth = true;
    },
  },
});

export const { setUser, removeUser, errorLogin, errorAuth } = userSlice.actions;

export default userSlice.reducer;
