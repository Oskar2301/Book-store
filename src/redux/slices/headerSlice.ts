import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface HeaderState {
    search: string
}

const initialState: HeaderState = {
    search: ''
}

export const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        setSearch(state, action: PayloadAction<string>){
            state.search = action.payload
        }
    }
})

export const { setSearch } = headerSlice.actions;

export default headerSlice.reducer
