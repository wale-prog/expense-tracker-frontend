import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./CategorySlice";
import loginReducer from "./LoginSlice";

const store = configureStore({
  reducer: {
    category: categoryReducer,
    login: loginReducer,
  }
});

export default store;