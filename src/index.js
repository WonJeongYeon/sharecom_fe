import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";
import store from "./redux/store";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {persistStore} from "redux-persist";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Parts from "./parts/Parts";
import Desktop from "./desktop/Desktop";
import Customer from "./customer/Customer";
import All from "./all/All";
import {ThemeProvider} from "./context/themeProvider";
import {GlobalStyle} from "./theme/GlobalStyle";

export let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <ThemeProvider>
                    <GlobalStyle/>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route path="/" element={<Parts />}/>
                        <Route path="desktop" element={<Desktop/>}/>
                        <Route path="customer" element={<Customer/>}/>
                        <Route path="all" element={<All/>}/>
                    </Route>
                </Routes>
                </ThemeProvider>
            </BrowserRouter>

        </PersistGate>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
