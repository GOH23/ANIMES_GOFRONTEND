import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Components/axios.js";
export const FecthIsAdmin = createAsyncThunk('isadmin/FecthIsAdmin ',async ()=>{
    const {data } = await axios.get('/auth/admin');
    return data;
});
const initialState ={
    data: null,
    status: 'loading'
}
const IsAdminSlice = createSlice({
    name: 'isadmin',
    initialState,
    extraReducers: (builder) =>{
        builder.addCase(FecthIsAdmin.pending,(state)=>{
            state.status = 'loading';
            state.data = null;
        });
        builder.addCase(FecthIsAdmin.fulfilled,(state,action)=>{
            state.status = 'loaded';
            state.data = action.payload;
        });
        builder.addCase(FecthIsAdmin.rejected,(state)=>{
            state.status = 'error';
            state.data = null;
        });
    },
})
export const selectIsAdmin = state => Boolean(state.isadmin.data); 
export const IsAdminReducer = IsAdminSlice.reducer;