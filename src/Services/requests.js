import axios from 'axios';
const API_URL = 'https://lc-python-backend-b63f70e42fc6.herokuapp.com/api'; // Update with your API URL

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
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





