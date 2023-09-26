import {createSlice} from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        value: ""
    },
    reducers: {
        add: (state) => {
            state.value = "add";
        },
        detail: (state) => {
            state.value = "detail";
        },
        modify: (state) => {
            state.value = "modify";
        },
        inactive: (state) => {
            state.value = "delete";
        },
        close: (state) => {
            state.value = "";
        }
    }
})

export const { add, detail, modify, inactive, close } = modalSlice.actions;

export default modalSlice.reducer;
