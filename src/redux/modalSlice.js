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
        modifyParts: (state) => {
            state.value = "modify_parts";
        },
        modifyDesktop: (state) => {
            state.value = "modify_desktop";
        },
        inactive: (state) => {
            state.value = "delete";
        },
        close: (state) => {
            state.value = "";
        }
    }
})

export const { add, detail, modifyParts, modifyDesktop, inactive, close } = modalSlice.actions;

export default modalSlice.reducer;
