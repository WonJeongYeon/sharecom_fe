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
        deletedParts: (state) => {
            state.value = "deleted_parts";
        },
        detail: (state) => {
            state.value = "detail";
        },
        detailParts: (state) => {
            state.value = "detail_parts";
        },
        modifyParts: (state) => {
            state.value = "modify_parts";
        },
        modifyDesktop: (state) => {
            state.value = "modify_desktop";
        },
        deletedDesktop: (state) => {
            state.value = "deleted_desktop";
        },
        modifyCustomer: (state) => {
            state.value = "modify_customer";
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
        customerDetail: (state) => {
            state.value = "customer_detail";
        },
        close: (state) => {
            state.value = "";
        }
    }
})

export const { add, deletedParts, detail, detailParts, modifyParts, modifyDesktop, deletedDesktop, modifyCustomer, rentalInput, customerDetail, inactive, close } = modalSlice.actions;

export default modalSlice.reducer;
