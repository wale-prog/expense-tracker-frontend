import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://localhost:3000/api/v1/expense'

export const getExpenses = createAsyncThunk(
  'Expense/getExpense',
   async() => {
    const response = await axios.get(apiUrl, { withCredentials: true })
    const responseData = await response.data
    const output = responseData.expenses.map(expense => ({
      id: expense.id,
      name: expense.name,
      amount: expense.amount,
      date: expense.date,
      category_id: expense.category_id      
    }));
    return output;
  }
  
)

const initialState = [];
const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state = []
      state.push(action.payload)
    }  
  },
  extraReducers: (builder) => {
    builder.addCase(getExpenses.fulfilled, (state, action) => (
      [...state, action.payload]
    ))
  },  
});

export default expenseSlice.reducer;
export const expenseAction = expenseSlice.actions;