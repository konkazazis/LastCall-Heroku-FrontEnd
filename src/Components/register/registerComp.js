import {React, useState} from 'react'
import Form from 'react-bootstrap/Form';
import LastCall from '../../assets/LastCall-removebg.png';
import axios from 'axios';

function RegisterComp({ setCurrentUser }) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    function toggleElement(elementId, isVisible) {
        var element = document.getElementById(elementId);
        element.style.display = isVisible ? "block" : "none";
    }

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

  return (
    <div className='flex h-screen animate__animated animate__fadeInDown' >
          <div className="w-1/2 bg-slate-200 flex flex-col justify-center items-center text-center" >
          <img src={LastCall} alt='logo' className='h-60 w-60'/>
          <h1 className='text-3xl font-semibold mb-4'>Register</h1>
          <div className="w-[30rem] p-4 ">
            <Form onSubmit={e => submitRegistration(e)}>
              <Form.Group className=" text-left mb-3" controlId="formBasicEmail">
                <Form.Label className="form-label text-black">Email address</Form.Label>
                <Form.Control className="" type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
              </Form.Group>
              <Form.Group className=" text-left mb-3" controlId="formBasicUsername">
                <Form.Label className="form-label text-black">Username</Form.Label>
                <Form.Control className="" type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
              </Form.Group>
              <Form.Group className=" text-left mb-3" controlId="formBasicPassword">
                <Form.Label className="form-label text-black">Password</Form.Label>
                <Form.Control className="" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              </Form.Group>
              <p className=' text-red-600 hidden mb-2' id='errorMessage'> Please enter all credentials. </p>
              <button className="w-[27rem] font-medium border-slate-950 border-1 rounded-md pt-2 pb-2 " type="submit">
                Register
              </button>
            </Form>
          </div>
          </div> 

          <div className='bg-custom2 flex-1 w-1/2 flex justify-center items-center text-center animate__animated animate__fadeInDownBig'>
            <div className='bg-no-repeat bg-blob-image bg-center bg-size h-[41rem] w-full flex flex-col justify-center items-center'>
              <h1 className='text-4xl text-sky-50 font-semibold'>Welcome to Last-Call !</h1>
              <p className='text-sky-50 mt-4 text-xl'>
                Log in to streamline inventory, track sales, and optimize staff performance. <br/>
                Manage your bar effortlessly with our user-friendly tools. <br/>
                Enter your credentials to access efficient bar management.
              </p>
            </div>
          </div>
        </div>     
  )
}

export default RegisterComp;