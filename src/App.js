import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ExpensePage from './components/Expenses/ExpensePage';
import Registration from './components/Auth/Registration';

const initialExpenses = [
  {
    id: "e1",
    title: "Toilet Paper",
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  { id: "e2", 
    title: "New TV",
    amount: 799.49, 
    date: new Date(2021, 2, 12)
  },
  {
    id: "e3",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: "e4",
    title: "New Desk (Wooden)",
    amount: 450,
    date: new Date(2021, 5, 12),
  },
  {
    id: "e5",
    title: "New Computer",
    amount: 700,
    date: new Date(2022, 4, 25 )
  }
]

const App = () =>{
 

  const [expenses, setExpenses] = useState(initialExpenses);
  const [manageStatus, setmanageInStatus] = useState({
    loggedInStatus: "NOT_LOGGED_IN",
    user: {}
   });

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

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path='registrations' element={<Registration handleSuccessfulAuth={handleSuccessfulAuth} />}/>
          <Route
          exact
          path='/'
          element={
            <ExpensePage
               onAddExpense={addExpenseHandler}
               items={expenses}
               loggedInStatus={manageStatus.loggedInStatus}
              />} 
            />
            <Route
          exact
          path='/expense'
          element={
            <ExpensePage
               onAddExpense={addExpenseHandler}
               items={expenses}
               loggedInStatus={manageStatus.loggedInStatus}
              />} 
            />               
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
