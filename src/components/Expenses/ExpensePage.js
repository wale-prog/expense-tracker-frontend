import { useNavigate } from "react-router-dom";
import Expenses from "./Expenses";
import axios from "axios";
import NewExpense from "../NewExpense/NewExpense";
import { useSelector } from "react-redux";
import Login from "../Auth/Login";

const ExpensePage = () => {
  const nav = useNavigate();
  const userInfo = useSelector((state) => state.login);
  console.log(userInfo)

  const handleSessions = (e) => {
    if (e.target.innerText === 'Logout') {
      const apiUrl = "http://localhost:3000/logout";
      axios.delete(apiUrl, { withCredentials: true })  
      nav("/login");     
    } else{
      nav("/login");
    } 
  }

  return (
  <>
    {userInfo.length > 0 && userInfo[0].logged_in ?
    <>
      <NewExpense />
      <Expenses />
      <h2>Status: {userInfo ? "LOGGED_IN" : "NOT LOGGED_IN"}</h2>    
      <button onClick={handleSessions}>{!userInfo ? "Login" : "Logout"}</button>
    </> : <Login />
  }
  </>
  )
};
export default ExpensePage;