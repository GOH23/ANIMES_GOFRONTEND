import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Components/axios.js";
export const FecthOptionGet = createAsyncThunk('option/FecthOptionGet',async (id)=>{
    const { data } = await axios.get(`/option/${id}`);
    return data;
});
const initialState ={
    data: null,
    status: 'loading'
}
const OPtionGet = createSlice({
    name: 'option',
    initialState,
    extraReducers: (builder) =>{
        builder.addCase(FecthOptionGet.pending,(state)=>{
            state.status = 'loading';
            state.data = null;
        });
        builder.addCase(FecthOptionGet.fulfilled,(state,action)=>{
            state.status = 'loaded';
            state.data = action.payload;
        });
        builder.addCase(FecthOptionGet.rejected,(state)=>{
            state.status = 'error';
            state.data = null;
        });
    },
})

export const OptionGetReducer = OPtionGet.reducer;