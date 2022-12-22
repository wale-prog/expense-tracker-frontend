import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { expenseAction } from '../../redux/ExpenseSlice';
import './ExpensesFilter.css';

const ExpensesFilter = () => {

  const currentUserCat = useSelector((state) => state.category[0]);
  const expenses = useSelector((state) => state.expense[0])
  const dispatch = useDispatch();

  const [filterSelect, setFilterSelect] = useState({
    category: '',
    year: ''
  });

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/expense", { withCredentials: true })
    .then(response => {
      if (response.data.status === 200) {
        dispatch(expenseAction.addExpense(response.data.expenses))
      }
    }
    )
  })
   

  const handleCatSelect = (e) => {
    setFilterSelect({ ...filterSelect, [e.target.name]: e.target.value})
  }

  const catOptions = () => {
    if (typeof currentUserCat !== 'undefined' && currentUserCat.length > 0) {
      return (
        currentUserCat.map(cat => (
          <option
            key={cat.id}
            value={cat.name}
            >
              {cat.name}
          </option>
        ))
      )
    }
  }

  const yearOptions = () => {
    if (expenses) {
      return(
        expenses.map(expense => (
          <option
            key={expense.id}
            value={expense.name}
          >
            {expense.date.split("-")[0]}
          </option>
         ))
      )
    }
  }

  return (
    <div className='expenses-filter'>
      <div className='expenses-filter__control'>
        <div className='expense-filter__year'>
          <label>Filter by year</label>
          <select value={filterSelect.year} name='year' onChange={handleCatSelect}>
            <option className='year-filter__disabled' disabled={true} value="Year"> Year </option>
            {yearOptions()}
          </select>
        </div>
        <div className='expense-filter__category'>
          <label>Filter by Category</label>
          <select value={filterSelect.category} name='category' onChange={handleCatSelect}>          
            <option className='category-filter' disabled={true} value=""> Category </option>
            {catOptions()}            
          </select>
        </div>
        
      </div>
    </div>
  );
};

export default ExpensesFilter;