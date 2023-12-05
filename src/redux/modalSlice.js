import {createSlice} from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        value: "",
        id: 0,
        name: ""
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
        rentalInput: (state, customer) => {
            state.value = "rental_input";
            const data = JSON.parse(customer.payload);
            state.id = data.id;
            state.name = data.name;
        },
        inactive: (state) => {
            state.value = "delete";
        },
        close: (state) => {
            state.value = "";
        }
    }
})

export const { add, detail, modifyParts, modifyDesktop, rentalInput, inactive, close } = modalSlice.actions;

export default modalSlice.reducer;
