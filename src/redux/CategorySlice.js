import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategory = createAsyncThunk(
  'expense/fetchCategory',
  async (userId) => {
    const response = await axios.get(`http://localhost:3000/api/v1/user/${userId}/category`, { withCredentials: true });
    return response.data;
  }
)


const initialState = [];
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      return ([...state, action.payload])
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      return ([...state, action.payload])
    })
  }
  
});

export default categorySlice.reducer;
export const categoryAction = categorySlice.actions;