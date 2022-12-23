import { useNavigate } from "react-router-dom";
import Expenses from "./Expenses";
import axios from "axios";
import NewExpense from "../NewExpense/NewExpense";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../../redux/LoginSlice";

const ExpensePage = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.login);

  const handleSessions = (e) => {
    if (e.target.innerText === 'Logout') {
      const apiUrl = "http://localhost:3000/logout";
      axios.delete(apiUrl, { withCredentials: true })
        .then(response => {
          const data = { ...response.data, 
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
          }
          console.log(response.data);
          dispatch(loginAction.logout(data));
        })
        .catch((error) => {
          console.log(error)
        })  
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