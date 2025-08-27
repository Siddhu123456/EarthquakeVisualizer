import {configureStore} from '@reduxjs/toolkit';
import earthquakeFilterReducer from '../slices/earthquakeFilterSlice.jsx'

const store = configureStore({
    reducer : {
        earthquakeFilter : earthquakeFilterReducer,
    }
});

export default store;