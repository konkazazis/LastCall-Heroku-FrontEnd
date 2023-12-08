import React from 'react';
import { useState} from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import LoadingSpinner from '../loading-spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import 'animate.css';
import App from '../../App';

axios.defaults.baseURL = 'https://lc-backend-django-2e9aca49847c.herokuapp.com/';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

function LogIn() {

  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  function toggleElement(elementId, isVisible) {
    var element = document.getElementById(elementId);
    element.style.display = isVisible ? "block" : "none";
  }

//holds the login state even after page refresh
setTimeout(() => {
  // useEffect(() => {
    axios.get("/user")
    .then(function(res) {
      setLoading(false);
      setCurrentUser(true);
    })
    .catch(function(error) {
      setCurrentUser(false);
    });
  // }, []);
}, 1500);

// changes between login and register forms        
  function loadRegister() {
    setRegistrationToggle(true);
  }
  function loadLogin() {
    setRegistrationToggle(false);
  }

// Registration,login and logout functions
  function submitRegistration(e) {
    e.preventDefault();
    axios.post(
      "/register",
      {
        email: email,
        username: username,
        password: password
      }
    ).then(function(res) {
      axios.post(
        "/login",
        {
          email: email,
          password: password
        }
      ).then(function(res) {
        setCurrentUser(true);
      });
    }).catch(function(error) {

      if (email==="" || username==="" || password==="") {
        return toggleElement("errorMessage", true);
      }

      toggleElement("errorMessage", false);
      console.log(error);
    });
  }

  function submitLogin(e) {
    e.preventDefault();
    axios.post(
      "/login",
      {
        email: email,
        password: password
      }
    )
    .then(function(res) {
      setCurrentUser(true);
    })
    .catch(function(error) {
      if (email==="" || password==="") {
        toggleElement("errorMessage", true);
        toggleElement("errorMessage2", false);
      }
      else {
        toggleElement("errorMessage", false);
        toggleElement("errorMessage2", true);
      }
      console.log(error);
    });
  }

  if (currentUser) {
    return (
        <div>
          <App />
        </div>
    );
  }
  return (
    <div className='bg-custom2'>
      {loading ? (
        <div className='flex justify-center items-center h-screen'>
          <LoadingSpinner />
        </div>
    ) : (
    <div className='grid h-screen bg-cover '>
      
      <Navbar>
        <Container>
          <Navbar.Toggle />
          <Navbar.Collapse className=" justify-between animate__animated animate__fadeIn">
            <Navbar.Brand href="#home">LastCall</Navbar.Brand> 
            <Navbar.Text>
              <span className='box-border text-black hover:border-b-2 border-transparent hover:border-black hover:transition duration-200 hover:ease-in-out cursor-pointer'>
                <button onClick={loadLogin}>Login</button>
              </span>
              <span className='ml-4 box-border text-black hover:border-b-2 border-transparent hover:border-black hover:transition duration-200 hover:ease-in-out cursor-pointer'>
                <button onClick={loadRegister}>Register</button>
              </span>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    {
      registrationToggle ? (
        <div className='flex ml-12 animate__animated animate__fadeInDown' >
          <div className="w-[20rem] h-[25rem] shadow-lg border-2 mt-32 bg-slate-100 p-4 ml-6 mb-6" >
            <Form onSubmit={e => submitRegistration(e)}>
              <Form.Group className="grid mb-3" controlId="formBasicEmail">
                <Form.Label className="form-label text-black">Email address</Form.Label>
                <Form.Control className="placeholder-slate-700 placeholder-opacity-25 bg-transparent text-black custom-input-reset rounded-none border-b-2 border-t-0 border-l-0 border-r-0 border-black focus:border-black !important" type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label className="form-label text-black">Username</Form.Label>
                <Form.Control className="placeholder-slate-700 placeholder-opacity-25 bg-transparent text-black custom-input-reset rounded-none border-b-2 border-t-0 border-l-0 border-r-0 border-black focus:border-black !important" type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="form-label text-black">Password</Form.Label>
                <Form.Control className="placeholder-slate-700 placeholder-opacity-25 bg-transparent text-black custom-input-reset rounded-none border-b-2 border-t-0 border-l-0 border-r-0 border-black focus:border-black !important" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              </Form.Group>
              <p className=' text-red-600 hidden mb-2' id='errorMessage'> Please enter all credentials. </p>
              <button className="bg-transparent border-2 border-black text-black rounded-lg p-2" type="submit">
                Register
              </button>
            </Form>
          </div> 
          <div className='flex-1 flex justify-center items-center text-center animate__animated animate__fadeInDownBig'>
            <div className='bg-no-repeat bg-blob-image bg-center bg-size h-[41rem] w-full flex flex-col justify-center items-center'>
              <h1 className='text-4xl text-sky-50 font-semibold'>Your personal Expense-Tracker</h1>
              <p className='text-sky-50 mt-4'>Take control of your finances with Your Personal Expense Tracker. <br/>
                Track, budget, and manage expenses effortlessly.<br/> Sign in or sign up now to get started!</p>
            </div>
          </div>

        </div>      
      ) : (
        <div className='flex ml-12 animate__animated animate__fadeInDown'>
          <div className="w-[20rem] h-[25rem] shadow-lg border-2 mt-32 bg-slate-100 p-4 ml-6 mb-6">
          <Form onSubmit={e => submitLogin(e)}>
              <Form.Group className="grid mb-10" controlId="formBasicEmail">
                <Form.Label className="form-label text-black">Email address</Form.Label>
                <Form.Control     className="placeholder-slate-700 placeholder-opacity-25 bg-transparent text-black custom-input-reset rounded-none border-b-2 border-t-0 border-l-0 border-r-0 border-black focus:border-black !important" type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="form-label text-black">Password</Form.Label>
                <Form.Control className="placeholder-slate-700 placeholder-opacity-25 bg-transparent text-black custom-input-reset rounded-none border-b-2 border-t-0 border-l-0 border-r-0 border-black focus:border-black !important" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              </Form.Group>
              <p className=' text-red-600 hidden mb-2' id='errorMessage'> Please enter both email and password. </p>
              <p className=' text-red-600 hidden mb-2' id='errorMessage2'> Please check your credentials. </p>
              <button className="bg-transparent border-2 border-black text-black rounded-lg p-2" type="submit">
                Login
              </button>
            </Form>
          </div>
          <div className='flex-1 flex justify-center items-center text-center animate__animated animate__fadeInDownBig'>
            <div className='bg-no-repeat bg-blob-image bg-center bg-size h-[41rem] w-full flex flex-col justify-center items-center'>
              <h1 className='text-4xl text-sky-50 font-semibold'>Your personal Expense-Tracker</h1>
              <p className='text-sky-50 mt-4'>Take control of your finances with Your Personal Expense Tracker. <br/>
                Track, budget, and manage expenses effortlessly.<br/> Sign in or sign up now to get started!</p>
            </div>
          </div>

        </div>
        
      )
    }
    </div>
    )}
    </div>
    
  );
}
export default LogIn;