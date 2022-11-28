import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import './ExpensesFilter.css';

const ExpensesFilter = (props) => {

  const currentUserCat = useSelector((state) => state.category[0]);
   
  const handleSelect = (e) => {
    props.onYearChange(e.target.value)
  } 

  const optionYear = [
    {value: '', text: 'Year', className: 'year-filter__disabled', disabled: true},
    {value: '2022', text: '2022'},
    {value: '2021', text: '2021'},
    {value: '2020', text: '2020'},
    {value: '2019', text: '2019'},
  ]

  const [category, setCategory] = useState('')

  const handleCatSelect = (e) => {
    setCategory(e.target.value)
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


  return (
    <div className='expenses-filter'>
      <div className='expenses-filter__control'>
        <div className='expense-filter__year'>
          <label>Filter by year</label>
          <select value={props.selected} onChange={handleSelect}>
          {optionYear.map(year => (
            <option
              key={year.value}
              value={year.value}
              disabled={year.disabled}
              className={year.className}
            >
              {year.text}
            </option>
           ))}
          </select>
        </div>
        <div className='expense-filter__category'>
          <label>Filter by Category</label>
          <select value={category} onChange={handleCatSelect}>          
            <option className='category-filter' disabled={true} value="">Category</option>
            {catOptions()}            
          </select>
        </div>
        
      </div>
    </div>
  );
};

export default ExpensesFilter;