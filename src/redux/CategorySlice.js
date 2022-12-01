import { createSlice } from '@reduxjs/toolkit';


const initialState = [];
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      return ([...state, action.payload])
    }
  },
  
});

export default categorySlice.reducer;
export const categoryAction = categorySlice.actions;