import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const logout = createAsyncThunk(
  'User/logout',
  async() => {
    await axios.delete('http://localhost:3000/logout', { withCredentials: true })
  }   
)

// export const login = createAsyncThunk(
//   'User/login',
//   async(user) => {
//     const response = await axios.post("http://localhost:3000/sessions", user, { withCredentials: true })
//     const responseData = await response.data
//     return responseData
//   }
// )
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
    // builder.addCase(login.fulfilled, (state, action) => (
    //   [...state, {login: action.payload}]
    // ))
  } 
})

export default loginSlice.reducer;
export const loginAction = loginSlice.actions;