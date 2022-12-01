import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './ExpensesFilter.css';

const ExpensesFilter = (props) => {

  const currentUserCat = useSelector((state) => state.category[0]);
  const expenses = useSelector((state) => state.expense[0])  

  const [filterSelect, setFilterSelect] = useState({
    category: '',
    year: ''
  });  

  const handleYearSelect = (e) => {
    setFilterSelect({ ...filterSelect, [e.target.name]: e.target.value})
    props.onYearChange(e.target.value)
  }

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
  const year = [];
  const filterYear = () => {

    for(let i = 0; i < expenses.length; i+=1){
      let data = expenses[i].date.split("-")[0]
      if(!year.includes(data)) {
        year.push(data)
      }
    }
    return year.sort();
  }
 
  const yearOptions = () => {
    if (expenses) {
      return(
        filterYear().map(expense => (
          <option
            key={expense}
            value={expense}
          >
            {expense}
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
          <select value={filterSelect.year} name='year' onChange={handleYearSelect}>
            <option className='year-filter__disabled' disabled={true} value=""> Year </option>
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