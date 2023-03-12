import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Components/axios.js";
export const FecthAuth = createAsyncThunk('auth/FecthAuth',async (params)=>{
    const {data } = await axios.post('/auth/login',params);
    return data;
});
export const FecthAuthMe = createAsyncThunk('auth/FecthAuthMe',async ()=>{
    const {data } = await axios.get('/auth/me');
    return data;
});
const initialState ={
    data: null,
    status: 'loading'
}
const authSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        logout: (state)=>{
            state.data = null;
            state.status= 'loaded'
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(FecthAuth.pending,(state)=>{
            state.status = 'loading';
            state.data = null;
        });
        builder.addCase(FecthAuth.fulfilled,(state,action)=>{
            state.status = 'loaded';
            state.data = action.payload;
        });
        builder.addCase(FecthAuth.rejected,(state)=>{
            state.status = 'error';
            state.data = null;
        });
        builder.addCase(FecthAuthMe.pending,(state)=>{
            state.status = 'loading';
            state.data = null;
        });
        builder.addCase(FecthAuthMe.fulfilled,(state,action)=>{
            state.status = 'loaded';
            state.data = action.payload;
        });
        builder.addCase(FecthAuthMe.rejected,(state)=>{
            state.status = 'error';
            state.data = null;
        });
    },
})
export const selectIsAuth = state => Boolean(state.auth.data); 

export const {logout} = authSlice.actions;

export const authReducer = authSlice.reducer;