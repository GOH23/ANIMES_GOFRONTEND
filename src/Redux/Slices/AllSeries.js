import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Components/axios.js";
export const FecthSeries = createAsyncThunk('admin/FecthSeries ',async ()=>{
    const {data } = await axios.get('/series');
    return data;
});
const initialState ={
    data: null,
    status: 'loading'
}
const AllSeriesSlice = createSlice({
    name: 'allseries',
    initialState,
    extraReducers: (builder) =>{
        builder.addCase(FecthSeries.pending,(state)=>{
            state.status = 'loading';
            state.data = null;
        });
        builder.addCase(FecthSeries.fulfilled,(state,action)=>{
            state.status = 'loaded';
            state.data = action.payload;
        });
        builder.addCase(FecthSeries.rejected,(state)=>{
            state.status = 'error';
            state.data = null;
        });
    },
})

export const AllSeriesReducer = AllSeriesSlice.reducer;