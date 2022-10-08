import { createSlice } from "@reduxjs/toolkit";

export interface userState {
  email: string | null;
  token: string | null;
  id: string | null;
  errorLogin: boolean;
  errorAuth: boolean;
}
const user = JSON.parse(localStorage.getItem("User")!);

const initialState: userState = {
  email: user && user.email,
  token: user && user.token,
  id: user && user.id,
  errorAuth: false,
  errorLogin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.errorAuth = false;
      state.errorLogin = false;
      const user = { email: state.email, token: state.token, id: state.id };
      localStorage.setItem("User", JSON.stringify(user));
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
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
