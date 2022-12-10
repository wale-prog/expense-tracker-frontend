import { useNavigate } from "react-router-dom";
import Expenses from "./Expenses";
import { useEffect } from "react";
import NewExpense from "../NewExpense/NewExpense";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/LoginSlice";
import { getExpenses } from "../../redux/ExpenseSlice";

const ExpensePage = (props) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.login[0]);
 
  
  useEffect(() => {
    dispatch(getExpenses())
  }, [dispatch])

  const handleSessions = (e) => {
    if (e.target.innerText === 'Logout') {
      dispatch(logout()).then(resp => {
        if(resp.type === "User/logout/fulfilled"){
          nav("/login");
        }
      })
    } else if(e.target.innerText === 'Login') {
      nav("/login");
    }
  }

  const status = () => {
    if (userInfo && userInfo.logged_in) {
      return (
        <h2>Status: LOGGED_IN</h2>
      )
    }else {
      return(
        <h2>Status: NOT LOGGED_IN</h2>
      )
    }
  }

  return (
  <>
    <NewExpense />
    <Expenses items={props.items}/>
    {status()}   
    <button onClick={handleSessions}>{!userInfo ? "Login" : "Logout"}</button>
  </>
  )
};
export default ExpensePage;