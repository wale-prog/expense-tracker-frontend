import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { categoryAction } from '../../redux/CategorySlice';
import axios from 'axios';
import { useSelector } from 'react-redux';

import './ExpensesFilter.css';

const ExpensesFilter = (props) => {

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.login[0]);
  const user = currentUser.user
  const userId = user.id
  
  const getCategories = () => {
    const apiUrl = `http://localhost:3000/api/v1/user/${userId}/category`;
    axios.get(apiUrl, { withCredentials: true })
      .then(response => {
        dispatch(categoryAction.addCategory(response.data));
        console.log(response.data);
      })
  }

  useEffect(() => {
    getCategories();
  }, [])


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
            <option value="Car">Car</option>
            <option value="Home">Home</option>
          </select>
        </div>
        
      </div>
    </div>
  );
};

export default ExpensesFilter;