import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./CategorySlice";
import loginReducer from "./LoginSlice";
import expenseReducer from "./ExpenseSlice";

const store = configureStore({
  reducer: {
    category: categoryReducer,
    login: loginReducer,
    expense: expenseReducer
  }
});

export default store;