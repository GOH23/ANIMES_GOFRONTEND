import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Components/axios.js";
export const FecthCardFullPost = createAsyncThunk('anime/FecthCardFullPost',async (id)=>{
    const { data } = await axios.get(`/animes/${id}`);
    return data;
});
const initialState ={
    data: null,
    status: 'loading'
}
const CardFullPost = createSlice({
    name: 'anime',
    initialState,
    extraReducers: (builder) =>{
        builder.addCase(FecthCardFullPost.pending,(state)=>{
            state.status = 'loading';
            state.data = null;
        });
        builder.addCase(FecthCardFullPost.fulfilled,(state,action)=>{
            state.status = 'loaded';
            state.data = action.payload;
        });
        builder.addCase(FecthCardFullPost.rejected,(state)=>{
            state.status = 'error';
            state.data = null;
        });
    },
})

export const CardFullReducer = CardFullPost.reducer;