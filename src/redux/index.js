import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import categoryReducer from "./CategorySlice";
import loginReducer from "./LoginSlice";
import expenseReducer from "./ExpenseSlice";
// import logger from "redux-logger";


const combinedReducer = combineReducers({
  category: categoryReducer,
  login: loginReducer,
  expense: expenseReducer
});

const rootReducer = (state, action) => {
  if (action.type === "login/logout") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

// const store = configureStore({
//   reducer: {
//     category: categoryReducer,
//     login: loginReducer,
//     expense: expenseReducer
//   }
// });

