import React, {useEffect, useState} from 'react';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation
import { getExpenses } from '../Services/requests';

function GraphDays() {
  // Get the current date
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentMonthName = currentDate.toLocaleDateString('en-US', { month: 'long' });
  const [expenses, setExpenses] = useState([]);
  // Initialize an array to hold the expenses for each day of the current month (initialized with zeros)
  const expensesByDay = Array(31).fill(0);

  useEffect(() => {
    getExpenses()
      .then((data) => {
        setExpenses(data);
      })
      .catch((error) => {
        console.error('Error fetching expenses:', error);
      });
  }, []);


  // Calculate the expenses for each day based on the received expenses prop
  expenses.forEach((expense) => {
    const date = new Date(expense.date);
    if (date.getMonth() === currentMonth) {
      expensesByDay[date.getDate() - 1] += parseFloat(expense.amount);
    }
  });

  

  const daysInMonth = new Date(currentDate.getFullYear(), currentMonth + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);


  const chartOptions = {
    options: {
      chart: {
        height: 280,

        animations: {
          enabled: true,
          easing: "linear",
          speed: 900,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
      },
      xaxis: {
        categories: daysArray,
        title: {
          text: currentMonthName,
        },
      },
      yaxis: {
        title: {
          text: "Expenses", // Set the label for the y-axis
        },
      },
      stroke: {
        curve: "smooth",
        width: 4, // Adjust the width of the line as needed
        dashArray: 0, // Remove any dashed line style
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100],
        },
      },
    },
    series: [
        {
          name: "Money Spent",
          data: expensesByDay,
        },
    ],
  };

  return (
    <div className='animate__animated animate__fadeIn m-2 bg-slate-200 rounded-lg'>
      <h1 className='text-2xl font-thin text-center pb-4 pt-4'>Graph</h1>
      <Chart
        options={chartOptions.options}
        series={chartOptions.series}
        type="area"
        height={280}
      />
    </div>
  );
}

GraphDays.propTypes = {
  expenses: PropTypes.array.isRequired, // Define expenses as a required prop of type array
};

export default GraphDays;
