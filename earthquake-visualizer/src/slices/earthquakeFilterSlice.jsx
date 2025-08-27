import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    activeMaptype : "street",
    timeframe : "day"
}

const earthquakeFilterSlice = createSlice({
    name : "earthquakeFilter",
    initialState,
    reducers : {
        setActiveMap : (state,action) => {
            state.activeMaptype = action.payload;
        },
        setTimeframe : (state,action) => {
            state.timeframe = action.payload;
        }
    }
});

export const {setActiveMap,setTimeframe} = earthquakeFilterSlice.actions;
export default earthquakeFilterSlice.reducer;