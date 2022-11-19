import Expenses from "./Expenses";
import NewExpense from "../NewExpense/NewExpense";

const ExpensePage = (props) => (
  <>
    <NewExpense onAddExpense={props.onAddExpense} />
    <Expenses items={props.items}/>
    <h2>Status: {props.loggedInStatus}</h2>
  </>
);
export default ExpensePage;