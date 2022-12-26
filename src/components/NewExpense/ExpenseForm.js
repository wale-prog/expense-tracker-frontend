import React, { useState } from "react";
import { useSelector } from "react-redux";
import './ExpenseForm.css';
import { useDispatch } from "react-redux";
import { postExpense } from "../../redux/ExpenseSlice";

const ExpenseForm = (props) => {
  const dispatch = useDispatch();
  const currentUserCat = useSelector((state) => state.category[0]);

  const [formInput, setFormInput] = useState({
    title: '',
    amount: '',
    date: '',
    category_id: ''
  })

  const handleChange = (e) => {
    setFormInput(prevState => (
      { ...prevState, [e.target.name]: e.target.value}
    ))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const{ title, amount, date, category_id } = formInput
    const expenseData = {
      name: title,
      amount: Number(amount),
      date: new Date(date),
      category_id: Number(category_id)
    };
    dispatch(postExpense(expenseData))
    props.onCancel()   
    setFormInput(prevState => (
      {
        ...prevState,
        title: '',
        amount: '',
        date: '',
      }
    ))  
  }

  return (
    <div>      
      <form onSubmit={handleSubmit} >
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <label>Name</label>
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
          <div className="new-expense__control">
            <label>Category</label>
            <select required name="category_id" onChange={handleChange}>
              <option value="">Select Category</option>
              {currentUserCat.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
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