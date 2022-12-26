import { useNavigate } from "react-router-dom";
import Expenses from "./Expenses"; 
import NewExpense from "../NewExpense/NewExpense";
import { useSelector, useDispatch } from "react-redux";
import { postLogout } from "../../redux/LoginSlice";

const ExpensePage = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.login);
  
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
    <NewExpense />
    <Expenses />
    <h2>Status: {userInfo ? "LOGGED_IN" : "NOT LOGGED_IN"}</h2>    
    <button onClick={handleSessions}>{!userInfo ? "Login" : "Logout"}</button>  
  </>
  )
};
export default ExpensePage;