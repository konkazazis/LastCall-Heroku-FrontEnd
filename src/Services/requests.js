import Cookies from 'js-cookie';
const API_URL = process.env.REACT_APP_API_URL; // Update with your API URL

// Function to send a GET request to fetch expenses
export const getExpenses = () => {
  return fetch(`${API_URL}api/expense-get/`, { 
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken'), // Implement a function to get the CSRF token from cookies
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

// Function to send a POST request to add an expense
export const addExpense = (expenseData) => {
  return fetch(`${API_URL}api/expense-post/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken'), // Implement a function to get the CSRF token from cookies
    },
    credentials: 'include',
    body: JSON.stringify(expenseData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

// Function to send a DELETE request to delete an expense by ID
export const deleteExpense = (expenseId) => {
  return fetch(`${API_URL}api/expense-delete/${expenseId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken'), // Implement a function to get the CSRF token from cookies
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

// Function to get CSRF token from cookies (add this function if not already implemented)
function getCookie(name) {
  const cookieString = Cookies.get(name);
  const cookies = cookieString ? cookieString.split('; ') : [];

  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName === name) {
      return cookieValue || '';
    }
  }
  console.log(cookieString);
  return ''; // Return an empty string if the cookie is not found
}
