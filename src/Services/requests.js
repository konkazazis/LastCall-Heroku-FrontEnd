import axios from 'axios';
const API_URL = 'http://16.171.237.119:8000/api'; // Update with your API URL

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'; 
axios.defaults.withCredentials = true;

// Function to send a GET request to fetch expenses
export const getExpenses = () => {
  return axios.get(`${API_URL}/expense-get/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

// Function to send a POST request to add an expense
export const addExpense = (expenseData) => {
  return axios.post(`${API_URL}/expense-post/`, expenseData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

// Function to send a DELETE request to delete an expense by ID
export const deleteExpense = (expenseId) => {
  return axios.delete(`${API_URL}/expense-delete/${expenseId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
      });
};





