import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Expenses.css'
import Card from "../UI/Card";
import ExpensesFilter from './ExpensesFilter';
import ExpensesList from './ExpensesList';
import ExpenseChart from './ExpenseChart';

const Expenses = () => {
  const [selectedYear, setSelectedYear] = useState('2020')
  console.log(selectedYear)

  let expenses = useSelector((state) => state.expense[0])
  console.log(expenses)
  
  const handleYearChange = (changeYear) => {
    setSelectedYear(changeYear)
  }
  expenses ? expenses = expenses.filter(expense => expense.date.split("-")[0] === selectedYear) : expenses = []
  console.log(expenses)
  
  

  return (
    <div>
      <Card className="expenses">        
        <ExpensesFilter selected={selectedYear} onYearChange={handleYearChange}/> 
        <ExpenseChart expenses={expenses} />
        <ExpensesList items={expenses} />
      </Card>
    </div>
  );
}
export default Expenses;