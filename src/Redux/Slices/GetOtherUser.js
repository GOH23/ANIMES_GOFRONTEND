import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Components/axios";
export const FecthIsOtherUser = createAsyncThunk('otheruser/FecthIsOtherUser',async (id)=>{
    const {data } = await axios.get(`/profile/check/${id}`);
    return data;
});
const initialState ={
    data: null,
    status: 'loading'
}
const OtherUserSlice = createSlice({
    name: 'otheruser',
    initialState,
    
    extraReducers: (builder) =>{
        builder.addCase(FecthIsOtherUser.pending,(state)=>{
            state.status = 'loading';
            state.data = null;
        });
        builder.addCase(FecthIsOtherUser.fulfilled,(state,action)=>{
            state.status = 'loaded';
            state.data = action.payload;
        });
        builder.addCase(FecthIsOtherUser.rejected,(state)=>{
            state.status = 'error';
            state.data = null;
        });
    },
})


export const OtherUserReducer = OtherUserSlice.reducer;