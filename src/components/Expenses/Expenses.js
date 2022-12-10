import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Expenses.css'
import Card from "../UI/Card";
import ExpensesFilter from './ExpensesFilter';
import ExpensesList from './ExpensesList';
import ExpenseChart from './ExpenseChart';

const Expenses = () => {
  const [filterInput, setFilterInput] = useState({
    year: '',
    category: ''
  })
  let expenses = useSelector((state) => state.expense[0])

  const handleYearChange = (changeYear) => {
    setFilterInput(prevState => (
      { ...prevState, year: changeYear}
    ))
  }

  const handleCatChange = (changeCat) => {
    setFilterInput(prevState => (
      { ...prevState, category: changeCat}
    ))
  }

  console.log(filterInput)

  const filteredExpenses = (input, year) => {
    if(expenses === undefined) {
      return []
    }
    if (year === '' && filterInput.category === '') {
      return input
    } else if(year !== '' && filterInput.category === '') {
      return input.filter(expense => expense.date.split("-")[0] === year)
    } else if(year === '' && filterInput.category !== '') {
      return input.filter(expense => expense.category_id === parseInt(filterInput.category))
    } else if (year !== '' && filterInput.category !== '') {
      return input.filter(expense => expense.date.split("-")[0] === year && expense.category_id === parseInt(filterInput.category))
    }
  }

  // expenses ? expenses = expenses.filter(expense => expense.date.split("-")[0] === selectedYear) : expenses = []  

  return (
    <div>
      <Card className="expenses">        
        <ExpensesFilter selected={filterInput.year} onYearChange={handleYearChange} onCatChange={handleCatChange}/> 
        <ExpenseChart expenses={filteredExpenses(expenses, filterInput.year)} />
        <ExpensesList items={filteredExpenses(expenses, filterInput.year)} />
      </Card>
    </div>
  );
}
export default Expenses;