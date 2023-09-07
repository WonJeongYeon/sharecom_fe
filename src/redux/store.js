import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import modalReducer from "./modalSlice";
import storage from 'redux-persist/lib/storage';
import {configureStore} from "@reduxjs/toolkit";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["bookmark", "modal"]
}

const reducers = combineReducers({
    modal: modalReducer
    // bookmark: bookmarkReducer
})

const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
    reducer: persistedReducer});

export default store;
