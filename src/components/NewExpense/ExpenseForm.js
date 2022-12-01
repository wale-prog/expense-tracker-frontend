import React, { useState } from "react";
import './ExpenseForm.css';
import axios from "axios";
import { useDispatch } from "react-redux";
import { expenseAction } from "../../redux/ExpenseSlice";

const ExpenseForm = (props) => {
  const dispatch = useDispatch();

  const [formInput, setFormInput] = useState({
    title: '',
    amount: '',
    date: ''
  })

  const handleChange = (e) => {
    setFormInput(prevState => (
      { ...prevState, [e.target.name]: e.target.value}
    ))
  }

  const postExpense = (input) => {
    const { name, amount, date } = input;
    axios.post("http://localhost:3000/api/v1/expense",
      {
        expense : {
          name,
          amount,
          date
        }
      },
      { withCredentials: true }
    ).then(response => {
      console.log(response.data)
      if (response.data.status === "created") {
        dispatch(expenseAction.addExpense(response.data.expense))
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const{ title, amount, date } = formInput
    const expenseData = {
      name: title,
      amount: Number(amount),
      date: new Date(date)
    };
    postExpense(expenseData);
    props.onCancel()   
    setFormInput(prevState => (
      {
        ...prevState,
        title: '',
        amount: '',
        date: ''
      }
    ))  
  }

  return (
    <div>      
      <form onSubmit={handleSubmit} >
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <label>Title</label>
            <input name="title" onChange={handleChange} type="text" value={formInput.title} />
          </div>
          <div className="new-expense__control">
            <label>Amount</label>
            <input name="amount" type="number" onChange={handleChange} value={formInput.amount} min="0.01" step="0.01" />
          </div>
          <div className="new-expense__control">
            <label>Date</label>
            <input name="date" type="date" onChange={handleChange} value={formInput.date} min="2019-01-01" max="2022-12-31" />
          </div>
        </div>
        <div className="new-expense__actions">
          <button type="button" onClick={props.onCancel}>Cancel</button>
          <button type="submit"> Add Expense </button>
        </div>
      </form>      
    </div>
  )
};
export default ExpenseForm;