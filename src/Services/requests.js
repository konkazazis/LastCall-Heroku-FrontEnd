import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL; // Update with your API URL

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

// Function to send a GET request to fetch expenses
export const getExpenses = () => {
  return axios.get(`${API_URL}api/expense-get/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

// Function to send a POST request to add an expense
export const addExpense = (expenseData) => {
  // Get CSRF token from cookies
  const csrfToken = getCookie('csrftoken');

  // Set the CSRF token in the request headers
  const headers = {
    'Content-Type': 'application/json',
    'X-CSRFToken': csrfToken,
  };
  return axios.post(`${API_URL}api/expense-post/`, expenseData, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

// Function to send a DELETE request to delete an expense by ID
export const deleteExpense = (expenseId) => {
  return axios.delete(`${API_URL}api/expense-delete/${expenseId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
      });
};





