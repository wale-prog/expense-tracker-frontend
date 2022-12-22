import { createSlice } from '@reduxjs/toolkit';

const initialState = [];
const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    addExpense: (state, action) => {
      return ([...state, action.payload])
    }
  },
  
});

export default expenseSlice.reducer;
export const expenseAction = expenseSlice.actions;