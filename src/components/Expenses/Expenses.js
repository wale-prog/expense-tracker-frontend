import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Expenses.css'
import Card from "../UI/Card";
import ExpensesFilter from './ExpensesFilter';
import ExpensesList from './ExpensesList';
import ExpenseChart from './ExpenseChart';

const Expenses = ()=> {
  const expenses = useSelector(state => state.expense[0])
  const [selectedOption, setSelectedOption] = useState({
    year: '',
    category: ''
  })
  
  const handleYearChange = (changeYear) => {
    setSelectedOption(changeYear)
  };
  
  let filteredExpenses = [];
  if(expenses !== undefined) {
    if(selectedOption.year === '' && selectedOption.category === ''){
       filteredExpenses = expenses;
    } else if (selectedOption.year !== '' && selectedOption.category === ''){
      filteredExpenses = expenses.filter(expense => {
        return expense.date.split("-")[0] === selectedOption.year
      });
    
    } else if(selectedOption.year === '' && selectedOption.category !== ''){
      filteredExpenses = expenses.filter(expense => {
        return expense.category_id === Number(selectedOption.category)
      });
    } else if (selectedOption.year !== '' && selectedOption.category !== ''){
      filteredExpenses = expenses.filter(expense => {
        return expense.date.split("-")[0] === selectedOption.year && expense.category_id === Number(selectedOption.category)
      });
    }
  }

  return (
    <div>
      <Card className="expenses">        
        <ExpensesFilter selected={selectedOption} onFilterChange={handleYearChange}/> 
        <ExpenseChart expenses={filteredExpenses} />
        <ExpensesList items={filteredExpenses} />
      </Card>
    </div>
  );
}
export default Expenses;