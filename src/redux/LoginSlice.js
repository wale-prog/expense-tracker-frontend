import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const logout = createAsyncThunk(
  'User/logout',
  async() => {
    await axios.delete("http://localhost:3000/logout", { withCredentials: true })
  }   
)

const initialState = [];
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action) => {
     return [...state, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state, action) => (
      state = []
    ))
  } 
})

export default loginSlice.reducer;
export const loginAction = loginSlice.actions;