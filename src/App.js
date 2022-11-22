import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import ExpensePage from './components/Expenses/ExpensePage';
import Registration from './components/Auth/Registration';
import Login from './components/Auth/Login';

const App = () =>{

  const [expenses, setExpenses] = useState([]);

  const [manageStatus, setmanageInStatus] = useState({
    loggedInStatus: "",
    user: {}
  });

  const checkLoginStatus = () => {
    axios.get("http://localhost:3000/logged_in", { withCredentials: true })
    .then(response => {
        if (response.data.logged_in) {
          setmanageInStatus({
          loggedInStatus: "LOGGED_IN",
          user: response.data.user
          })
        } else if (!response.data.logged_in) {
          setmanageInStatus({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {}
          })
        }
      })
    .catch(error => {
      console.log("Check login error", error);
    });
  }

  useEffect(() => {
    checkLoginStatus();
  }, [])

  const addExpenseHandler = (expense) => {
    setExpenses(prevExpenses => ([expense, ...prevExpenses])
    );
  };

  const handleSuccessfulAuth = (data) => {
    setmanageInStatus({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    });
  };

  const updateLoggedInStatus = (data) => {
    setmanageInStatus({
      loggedInStatus: data.loggedInStatus,
      user: data.user
    })
  }

  return (
    <div>      
      <BrowserRouter>
        <Routes>
          <Route exact path='registrations' element={<Registration handleSuccessfulAuth={handleSuccessfulAuth} />}/>
          <Route exact path='login' element={<Login  handleSuccessfulAuth={handleSuccessfulAuth} />}/>
          <Route
            exact
            path='/'
            element={
              <ExpensePage
                 onAddExpense={addExpenseHandler}
                 items={expenses}
                 loggedInStatus={manageStatus.loggedInStatus}
                 updateLoggedInStatus={updateLoggedInStatus}
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
               loggedInStatus={manageStatus.loggedInStatus}
               updateLoggedInStatus={updateLoggedInStatus}
              />
            } 
            />               
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
