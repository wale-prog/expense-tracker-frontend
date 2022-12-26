import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const expenseApiUrl = "http://localhost:3000/api/v1/expense";

export const fetchExpense = createAsyncThunk(
  'expense/fetchExpense',
  async () => {
    const response = await axios.get(expenseApiUrl, { withCredentials: true });
    return response.data;
  }
)

export const postExpense = createAsyncThunk(
  'expense/postExpense',
  async (input) => {
    const { name, amount, date, category_id } = input;
    const response = await axios.post(expenseApiUrl,
      {
        expense : {
          name,
          amount,
          date,
          category_id
        }
      },
      { withCredentials: true }
    );
    console.log(response.data);
    return response.data.expense;
  }
)

const initialState = [];
const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchExpense.fulfilled, (state, action) => {
      (state.push(action.payload.expenses))
    })
    builder.addCase(postExpense.fulfilled, (state, action) => {
      (state[0].unshift(action.payload))
    })
  }
  
});

export default expenseSlice.reducer;
export const expenseAction = expenseSlice.actions;