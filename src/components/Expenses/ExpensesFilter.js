import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExpense } from '../../redux/ExpenseSlice';
import './ExpensesFilter.css';

const ExpensesFilter = (props) => {
  const currentUserCat = useSelector((state) => state.category[0]);
  const expenses = useSelector((state) => state.expense[0]);
  const dispatch = useDispatch();

  const [filterSelect, setFilterSelect] = useState({
    category: '',
    year: ''
  });

  useEffect(() => {
    dispatch(fetchExpense())
  }, [dispatch])

  const handleCatSelect = (e) => {
    props.onFilterChange({...filterSelect, [e.target.name]: e.target.value })
    setFilterSelect({ ...filterSelect, [e.target.name]: e.target.value})    
  }

  const uniqueYear = () => {
    const array = []
    if (expenses !== undefined) {
      for (let i = 0; i < expenses.length; i++) {
        if (!array.includes(expenses[i].date.split("-")[0])) array.push(expenses[i].date.split("-")[0])
      }
    }
    return array;
  }

  const catOptions = () => {
    if (typeof currentUserCat !== 'undefined' && currentUserCat.length > 0) {
      return (
        currentUserCat.map(cat => (
          <option
            key={cat.id}
            value={cat.id}
            >
              {cat.name}
          </option>
        ))
      )
    }
  }

  const yearOptions = () => (
    uniqueYear().map((year, index) => (
      <option
        key={index}
        value={year}
      >
        {year}
      </option>
    ))
  )


  return (
    <div className='expenses-filter'>
      <div className='expenses-filter__control'>
        <div className='expense-filter__year'>
          <label>Filter by year</label>
          <select
           value={filterSelect.year}
           name='year' 
           onChange={handleCatSelect}
          >
            <option className='year-filter__disabled' value=""> Year </option>
            {yearOptions()}
          </select>
        </div>
        <div className='expense-filter__category'>
          <label>Filter by Category</label>
          <select value={filterSelect.category} name='category' onChange={handleCatSelect}>          
            <option className='category-filter' value=""> Category </option>
            {catOptions()}            
          </select>
        </div>
        
      </div>
    </div>
  );
};

export default ExpensesFilter;