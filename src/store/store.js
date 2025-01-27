import { configureStore } from "@reduxjs/toolkit";
import basketReducer from './basketSlice'
import sortReducer from './sortSlice'
import productsReducer from './productsSlice';

const store = configureStore({
    reducer: {
        basket: basketReducer,
        sort: sortReducer,
        productsSlise: productsReducer,
    },
})

export default store;