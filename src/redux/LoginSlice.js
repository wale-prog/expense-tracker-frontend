import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action) => {
      state.push(action.payload);
    },
    logout: (state, action) => {
      state.push(action.payload);
    }
  },  
})

export default loginSlice.reducer;
export const loginAction = loginSlice.actions;