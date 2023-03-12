import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Components/axios.js";
export const FecthIsModer = createAsyncThunk('isadmin/FecthIsModer ',async ()=>{
    const {data } = await axios.get('/auth/moderator');
    return data;
});
const initialState ={
    data: null,
    status: 'loading'
}
const IsModeratorSlice = createSlice({
    name: 'ismoder',
    initialState,
    extraReducers: (builder) =>{
        builder.addCase(FecthIsModer.pending,(state)=>{
            state.status = 'loading';
            state.data = null;
        });
        builder.addCase(FecthIsModer.fulfilled,(state,action)=>{
            state.status = 'loaded';
            state.data = action.payload;
        });
        builder.addCase(FecthIsModer.rejected,(state)=>{
            state.status = 'error';
            state.data = null;
        });
    },
})
export const selectIsModer = state => Boolean(state.ismoder.data); 
export const IsModerReducer = IsModeratorSlice.reducer;