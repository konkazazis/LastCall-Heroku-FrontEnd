import React, {useState, useEffect} from 'react';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation
import { getExpenses } from '../Services/requests';

function GraphMonths() {
  const currDate = new Date();
  const year = currDate.getFullYear();
  const [expenses, setExpenses] = useState([]);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  useEffect(() => {
    getExpenses()
      .then((data) => {
        setExpenses(data);
      })
      .catch((error) => {
        console.error('Error fetching expenses:', error);
      });
  }, []);


  // Initialize an array to hold the expenses for each month (initialized with zeros)
  const expensesByMonth = Array(12).fill(0);

  // Calculate the expenses for each month based on the received expenses prop
  expenses.forEach((expense) => {
    const date = new Date(expense.date);
    const monthIndex = date.getMonth();
    expensesByMonth[monthIndex] += parseFloat(expense.amount);
  });


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
        categories: months,
        title: {
          text: year, // Set the label for the x-axis
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
        data: expensesByMonth,
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

GraphMonths.propTypes = {
  expenses: PropTypes.array.isRequired, // Define expenses as a required prop of type array
};

export default GraphMonths;
