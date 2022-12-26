import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAction } from './redux/LoginSlice';
import axios from 'axios';
import ExpensePage from './components/Expenses/ExpensePage';
import Registration from './components/Auth/Registration';
import Login from './components/Auth/Login';
import { fetchCategory } from './redux/CategorySlice';

const App = () =>{
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLoginStatus = () => {
      axios.get("http://localhost:3000/logged_in", { withCredentials: true })
      .then(response => {
          if (response.data.logged_in) {
            dispatch(loginAction.login(response.data));
            dispatch(fetchCategory(response.data.user.id))        
          }
        })
      .catch(error => {
        console.log("Check login error", error);
      });
    }
    checkLoginStatus()
  })





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
              <ExpensePage />
            }
          />
          <Route
          exact
          path='/expense'
          element={
            <ExpensePage />
            } 
            />               
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
