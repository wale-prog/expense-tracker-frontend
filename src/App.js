import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAction } from './redux/LoginSlice';
import axios from 'axios';
import ExpensePage from './components/Expenses/ExpensePage';
import Registration from './components/Auth/Registration';
import Login from './components/Auth/Login';

const App = () =>{
  const [expenses, setExpenses] = useState([]);
  const dispatch = useDispatch();

  const checkLoginStatus = () => {
    axios.get("http://localhost:3000/logged_in", { withCredentials: true })
    .then(response => {
      console.log(response.data)
        if (response.data.logged_in) {
          dispatch(loginAction.login(response.data));          
        // } else if (!response.data.logged_in) {
         
        }
      })
    .catch(error => {
      console.log("Check login error", error);
    });
  }

  useEffect(() => {
    checkLoginStatus();
  })

  const addExpenseHandler = (expense) => {
    setExpenses(prevExpenses => ([expense, ...prevExpenses])
    );
  };

  return (
    <div>      
      <BrowserRouter>
        <Routes>
          <Route exact path='registrations' element={<Registration />}/>
          <Route exact path='login' element={<Login  />}/>
          <Route
            exact
            path='/'
            element={
              <ExpensePage
                 onAddExpense={addExpenseHandler}
                 items={expenses}
              />
            } 
          />
          <Route
          exact
          path='/expense'
          element={
            <ExpensePage
               onAddExpense={addExpenseHandler}
               items={expenses}
              />
            } 
            />               
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
