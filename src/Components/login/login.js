import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DotLoader from '../loading-spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import 'animate.css';
import App from '../../App';
import LoginComp from './loginComp';
import RegisterComp from '../register/registerComp';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

function LogIn() {
  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [loading, setLoading] = useState(true);
  // Check user authentication on component mount
  useEffect(() => {
    axios.get("/user")
      .then(function (res) {
        setLoading(false);
        setCurrentUser(true);
      })
      .catch(function (error) {
        setCurrentUser(false);
        setLoading(false); // Ensure that loading is set to false even if there's an error
      });
  }, []);

  // Function to switch between login and register forms
  function toggleForm() {
    setRegistrationToggle((prevToggle) => !prevToggle);
  }

  if (currentUser) {
    return (
      <div>
        <App />
      </div>
    );
  }

  return (
    <div>
      {loading ? (
        <div className='flex justify-center items-center h-screen'>
          <DotLoader/>
        </div>
      ) : (
        <div className='grid bg-cover '>
          <button onClick={toggleForm}>
            {registrationToggle ? 'Already have an account? Log in' : 'New to Last-Call? Register'}
          </button>
          {registrationToggle ? (
            <RegisterComp setCurrentUser={setCurrentUser} />
          ) : (
            <LoginComp setCurrentUser={setCurrentUser} />
          )} 
        </div>
      )}
    </div>
  );
}

export default LogIn;
