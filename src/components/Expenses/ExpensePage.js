import { useNavigate } from "react-router-dom";
import Expenses from "./Expenses"; 
import NewExpense from "../NewExpense/NewExpense";
import { useSelector, useDispatch } from "react-redux";
import { postLogout } from "../../redux/LoginSlice";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';



const ExpensePage = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.login);
  const expense = useSelector(state => state.category)
  console.log(expense)

  

  const backdrop = () => {
  return(
    <>
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, opacity: 0.95 }}
      open
    >
      <CircularProgress color="inherit" />
    </Backdrop>
    </>

  )
}
  
  const handleSessions = (e) => {
    if (e.target.innerText === 'Logout') {
      dispatch(postLogout())
      localStorage.removeItem("login");
      nav("/login");     
    } else{
      nav("/login");
    } 
  } 

  
  return (
  <> 
  {expense.length > 0 ? 
    <>
    <NewExpense />
    <Expenses />
    <h2>Status: {userInfo ? "LOGGED_IN" : "NOT LOGGED_IN"}</h2>    
    <button onClick={handleSessions}>{!userInfo ? "Login" : "Logout"}</button>  </> : 
    <>
      {backdrop()}
      <NewExpense />
      <Expenses />
      <h2>Status: {userInfo ? "LOGGED_IN" : "NOT LOGGED_IN"}</h2>    
      <button onClick={handleSessions}>{!userInfo ? "Login" : "Logout"}</button>      
    </>
  }
   
  </>
  )
};
export default ExpensePage;