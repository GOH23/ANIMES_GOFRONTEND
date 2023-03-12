import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Components/axios.js";
export const FecthRegister = createAsyncThunk('auth/FecthRegister',async (params)=>{
    const {data } = await axios.post('/auth/register',params);
    return data;
});
const initialState ={
    data: null,
    status: 'loading'
}
const RegisterSlice = createSlice({
    name: 'Reg',
    initialState,
    extraReducers: (builder) =>{
        builder.addCase(FecthRegister.pending,(state)=>{
            state.status = 'loading';
            state.data = null;
        });
        builder.addCase(FecthRegister.fulfilled,(state,action)=>{
            state.status = 'loaded';
            state.data = action.payload;
        });
        builder.addCase(FecthRegister.rejected,(state)=>{
            state.status = 'error';
            state.data = null;
        });
    },
})

export const RegisterReducer = RegisterSlice.reducer;