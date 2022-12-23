import { createSlice } from '@reduxjs/toolkit';

const initialState = [];
const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    addExpense: (state, action) => {
    const nextState = [...state, action.payload];
      return (nextState)
    }
  },
  
});

export default expenseSlice.reducer;
export const expenseAction = expenseSlice.actions;