import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loginApiUrl = "http://localhost:3000/sessions";

export const postLogin = createAsyncThunk(
  "login/postLogin",
  async (user) => {
    const response = await axios.post(loginApiUrl, {
      user: {
        email: user.email,
        password: user.password,
      },
    }, { withCredentials: true });
    return response.data;
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
    logout: (state, action) => {
      state.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postLogin.fulfilled, (state, action) => {
      state.push(action.payload)
    })
  }
})

export default loginSlice.reducer;
export const loginAction = loginSlice.actions;