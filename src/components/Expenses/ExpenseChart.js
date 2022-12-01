import React from "react";
import Chart from "../Chart/Chart";
import { useSelector } from "react-redux";

const ExpenseChart = () => {

  const expenses = useSelector(state => state.expense[0])

  const chartDataPoints = [
    { label: 'Jan', value: 0 },
    { label: 'Feb', value: 0 },
    { label: 'Mar', value: 0 },
    { label: 'Apr', value: 0 },
    { label: 'May', value: 0 },
    { label: 'Jun', value: 0 },
    { label: 'Jul', value: 0 },
    { label: 'Aug', value: 0 },
    { label: 'Sep', value: 0 },
    { label: 'Oct', value: 0 },
    { label: 'Nov', value: 0 },
    { label: 'Dec', value: 0 }
  ];
  if(expenses) {
    for (const expense of expenses) {       
      const expenseMonth = (+expense.date.split("-")[1]) - 1;
      chartDataPoints[expenseMonth].value += expense.amount
    }
  }


  return(
      <Chart chart={chartDataPoints} />
    )  
    
};

export default ExpenseChart;