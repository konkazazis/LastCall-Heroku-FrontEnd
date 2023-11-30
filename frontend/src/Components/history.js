import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faPlus } from '@fortawesome/free-solid-svg-icons'; // Import the plus icon
import '../App.css';

function History({ expenses, onDeleteExpense, onAddExpense }) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; 
  const currentMonthName = currentDate.toLocaleDateString('en-US', { month: 'long' });
  const currentYear = currentDate.getFullYear();
  // Function to handle deleting an expense
  const handleDeleteExpense = (expenseId) => onDeleteExpense(expenseId);
  // Function to handle adding an expense
  const handleAddExpense = () => onAddExpense();
  
  const monthlyExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() + 1 === currentMonth && expenseDate.getFullYear() === currentYear;
  });

  const yearlyExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getFullYear() === currentYear;
  });


  return (
    <div className='animate__animated animate__fadeIn flex justify-center m-2 bg-slate-300 rounded-lg pb-6' >
      <div className='mr-6'>
        <h1 className='text-2xl font-thin text-center pb-4 pt-4'>Summary</h1>
        <div>
          <div className='flex rounded-lg bg-slate-200 shadow-lg w-[19rem] h-24 p-4 mb-2'>
            <div className='mr-6 font-medium'>
              {currentMonthName}:
            </div>
            <div className='text-6xl italic font-medium'>
              {monthlyExpenses.reduce((acc, expense) =>  acc + parseFloat(expense.amount), 0)}€
            </div> 
          </div>
          <div className='flex rounded-lg bg-slate-200 shadow-lg w-[19rem] h-24 p-4 mb-2'>
            <div className='mr-6 font-medium'>
              {currentYear}:
            </div>
            <div className='text-6xl italic font-medium'>
              {yearlyExpenses.reduce((acc, expense) =>  acc + parseFloat(expense.amount), 0)}€
            </div>   
          </div>
        </div>
      </div>
      <div>
        <h1 className='text-2xl font-thin text-center pb-4 pt-4'>History</h1>
        <div className='flex justify-center items-center'>
          <div className='max-h-64 overflow-y-auto overflow-x-hidden custom-scrollbar rounded-lg'>
            {expenses.map((expense) => (
              <div key={expense.id} className='flex rounded-lg bg-slate-200 shadow-lg w-[37.5rem] justify-between mb-2'>
                <div className='p-2'>
                  <ul>
                    <li>Id: {expense.id}</li>
                    <li>Date: {expense.date}</li>
                  </ul>
                </div>
                <div className='p-2'>
                  <ul>
                    <li>Amount: {expense.amount}</li>
                    <li>Descr.: {expense.description}</li>
                  </ul>
                </div>
                <div className='p-2'>
                  <button onClick={() => handleDeleteExpense(expense.id)} className='bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600'>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='text-center pt-4'>
          {/* Add an icon/button for adding new expenses */}
          <button onClick={handleAddExpense} className='bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600'>
            <FontAwesomeIcon icon={faPlus} /> Add Expense
          </button>
        </div>
      </div>
      
    </div>
  );
}

History.propTypes = {
  expenses: PropTypes.array.isRequired,
  onDeleteExpense: PropTypes.func.isRequired,
  onAddExpense: PropTypes.func.isRequired, // Define onAddExpense as a required prop of type function
};

export default History;
