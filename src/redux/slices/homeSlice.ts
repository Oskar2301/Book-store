import { createSlice } from "@reduxjs/toolkit";

export interface homeState {
  items: any;
}

const initialState: homeState = {
  items: JSON.parse(localStorage.getItem("Books")!) || [],
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
      if (state.items)
        localStorage.setItem("Books", JSON.stringify(state.items));
    },
  },
});

export const { setItems } = homeSlice.actions;

export default homeSlice.reducer;
