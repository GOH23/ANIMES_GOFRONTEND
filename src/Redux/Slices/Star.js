import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Components/axios.js";
export const FecthStarsGet = createAsyncThunk('anime/FecthStarsGet',async (id)=>{
    const { data } = await axios.get(`/starget/${id}`);
    return data;
});
const initialState ={
    data: null,
    status: 'loading'
}
const StarsGet = createSlice({
    name: 'stars',
    initialState,
    extraReducers: (builder) =>{
        builder.addCase(FecthStarsGet.pending,(state)=>{
            state.status = 'loading';
            state.data = null;
        });
        builder.addCase(FecthStarsGet.fulfilled,(state,action)=>{
            state.status = 'loaded';
            state.data = action.payload;
        });
        builder.addCase(FecthStarsGet.rejected,(state)=>{
            state.status = 'error';
            state.data = null;
        });
    },
})

export const StarsGetReducer = StarsGet.reducer;