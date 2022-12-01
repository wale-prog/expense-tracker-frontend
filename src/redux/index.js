import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import categoryReducer from "./CategorySlice";
import loginReducer from "./LoginSlice";
import expenseReducer from "./ExpenseSlice";

const combineReducer = combineReducers({
  category: categoryReducer,
  login: loginReducer,
  expense: expenseReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'User/logout/fulfilled' ) {
   state = undefined;
  }
  return combineReducer(state, action);
};

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

// export default store;