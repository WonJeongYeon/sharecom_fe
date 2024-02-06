import {createSlice} from "@reduxjs/toolkit";

export const darkSlice = createSlice({
    name: 'dark',
    initialState: {
        value: false
    },
    reducers: {
        toggle: (state) => {
            state.value = !state.value;
        }
    }
})

export const { toggle } = darkSlice.actions;

export default darkSlice.reducer;
