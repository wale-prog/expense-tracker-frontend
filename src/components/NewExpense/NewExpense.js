import React, { useState } from "react"
import './NewExpense.css'
import ExpenseForm from "./ExpenseForm";

const NewExpense = () => {

  const [hideForm, setHideForm] = useState(false)

  const handleHide = () => {
    setHideForm(!hideForm)
  }

  return(
    <div className="new-expense">
      {!hideForm && <button onClick={handleHide}>Add New Expense</button>}
      {hideForm && <ExpenseForm onCancel={handleHide} />}
    </div>
  )

};

export default NewExpense;