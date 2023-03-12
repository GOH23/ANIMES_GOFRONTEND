import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Components/axios";
export const FecthIsActivated = createAsyncThunk('isactivated/FecthIsActivated',async ()=>{
    const {data } = await axios.get('/getactiv');
    return data;
});
const initialState ={
    data: null,
    status: 'loading'
}
const IsActivatedSlice = createSlice({
    name: 'isactivated',
    initialState,
    
    extraReducers: (builder) =>{
        builder.addCase(FecthIsActivated.pending,(state)=>{
            state.status = 'loading';
            state.data = null;
        });
        builder.addCase(FecthIsActivated.fulfilled,(state,action)=>{
            state.status = 'loaded';
            state.data = action.payload;
        });
        builder.addCase(FecthIsActivated.rejected,(state)=>{
            state.status = 'error';
            state.data = null;
        });
    },
})
export const selectIsActivated = state => Boolean(state.isactivated.data); 

export const IsActivatedReducer = IsActivatedSlice.reducer;