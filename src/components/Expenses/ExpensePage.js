import { useNavigate } from "react-router-dom";
import Expenses from "./Expenses";
import axios from "axios";
import NewExpense from "../NewExpense/NewExpense";

const ExpensePage = (props) => {
  const nav = useNavigate();

  const handleSessions = (e) => {
    if (e.target.innerText === 'Logout') {
      const apiUrl = "http://localhost:3000/logout";
      axios.delete(apiUrl, { withCredentials: true })
        .then(response => {
          const data = {
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
          }
          props.updateLoggedInStatus(data)
        })
        .catch((error) => {
          console.log(error)
        })  
        nav("/login");     
    } else{
      nav("/login");
    } 
  }

  

  const button = () => {
    if (props.loggedInStatus === "LOGGED_IN") {
      return <button name="Logout" onClick={handleSessions}>Logout</button>
    } else if (props.loggedInStatus === "NOT_LOGGED_IN") {
      return <button name="Login" onClick={handleSessions}>Login</button>
    }
  }
  return (
  <>
    <NewExpense onAddExpense={props.onAddExpense} />
    <Expenses items={props.items}/>
    <h2>Status: {props.loggedInStatus}</h2>    
    {button()}
  </>
  )
};
export default ExpensePage;