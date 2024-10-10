import { createSlice } from '@reduxjs/toolkit';

const jwtSlice = createSlice({
    name:"token",
    initialState:{
        token: null,
        id: null,
    },
    reducers:{
        setToken: (state, action)=>{
            state.token = action.payload;
        },
        clearToken: (state) => {
            state.token = null;
        },
        setId: (state, action)=>{
            state.id = action.payload;
        },
        clearId: (state) => {
            state.id = null;
        },

    }
})

export const { setToken, clearToken, setId, clearId } = jwtSlice.actions;
export default jwtSlice.reducer;