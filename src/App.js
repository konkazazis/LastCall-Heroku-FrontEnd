import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faCreditCard, faUser, faMagnifyingGlassChart, faHome, faCommenting, faBoxesStacked, faFileInvoiceDollar, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { getExpenses } from './Services/requests'; 
import { faFacebook, faTwitter, faInstagram, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Widgets from './widgets';
import Profile from './Components/profile';
import Settings from './Components/settings';
import Analysis from './Components/analysis';
import axios from 'axios';
import Home from './Components/home';
import Stock from './Components/stock';
import Chat from './Components/chat';
import Reservations from './Components/reservations';
import Schedule from './Components/schedule';
import BusinessCards from './Components/businessCards';

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [component, setComponent] = useState();
  
  // Function to fetch expenses
  const fetchExpenses = () => {
    getExpenses()
      .then((data) => {
        setExpenses(data);
      })
      .catch((error) => {
        console.error('Error fetching expenses:', error);
      });
  };

  // Fetch expenses when the component mounts
  useEffect(() => {
    fetchExpenses();
    axios.get("/user")
    .then(function(res) {
      setUserInfo(res.data.user);
      setComponent(<Home userInfo={res.data.user} />);
    })
    .catch(function(error) {
      console.log(error);
    });
  }, []);

  // Logout function
  function submitLogout(e) {
    e.preventDefault();
    axios.post(
      "/logout",
      {withCredentials: true}
    ).then(function(res) {
      window.location.href = '/';
    });
  }

  // Function to set the component to be rendered
  const changeComponent = (component) => {
    setComponent(component);
  }

  // Menu items background color change on click
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      menuItems.forEach(otherItem => {
        otherItem.classList.remove('bg-slate-300');
      });
      item.classList.remove('bg-slate-300');
      item.classList.add('bg-slate-300');
    });
  });

  return (
    <div className='bg-white animate__animated animate__fadeIn m-2'>

      {/* Header */}
      <div className='bg-slate-100 border-custom3 shadow-md border-2 rounded-md ml-4 mr-4 mb-2 pt-2 pb-2 flex justify-between'>
        <div className='ml-2'>
          <h1 className='text-lg font-thin text-left inline-block'>LastCall | Bar Management</h1>
        </div>
        <div>
          <Widgets />
        </div>
      </div>

      {/* Body */}
      <div className="flex h-full">
        <div className=" w-1/6 mr-4 ml-4 shadow-xl">

          {/* Sidebar */}
          <div className="animate__animated animate__fadeIn  h-[100%] shadow-xl rounded-md bg-slate-100 border-custom3 border-2">
            <div className=' flex m-4 justify-start items-center '>
              <img src={'../mountain.jpg'} alt="Logo" className='w-[50px] h-[50px] rounded-full' />
              <p className='ml-4 text-lg font-thin'>{userInfo.username}</p>
            </div>
            <div className='grid place-items-center'>
              <hr className='mb-8 w-[12rem] h-[0.1rem] bg-slate-300'/>
              <div className='grid place-items-start mt-2 w-[12rem]'>
                    <div     className='menu-item w-[12rem] text-m font-normal mb-2 hover:cursor-pointer transition duration-300 ease-in-out transform hover:bg-slate-200 rounded-md p-2'
                          onClick={() => changeComponent(<Home userInfo={userInfo} />)}><FontAwesomeIcon icon={faHome} className='mr-4 w-4 h-4' /> Home</div>
                    <div     className='menu-item w-[12rem] text-m font-normal mb-2 hover:cursor-pointer transition duration-300 ease-in-out transform hover:bg-slate-200 rounded-md p-2'
                          onClick={() => changeComponent(<Chat userInfo={userInfo}/>)}><FontAwesomeIcon icon={faCommenting} className='mr-4 w-4 h-4' /> Chat</div>
                    <div     className='menu-item w-[12rem] text-m font-normal mb-2 hover:cursor-pointer transition duration-300 ease-in-out transform hover:bg-slate-200 rounded-md p-2'
                          onClick={() => changeComponent(<Stock />)}><FontAwesomeIcon icon={faBoxesStacked} className='mr-4 w-4 h-4' /> Stock</div>
                    <div     className='menu-item w-[12rem] text-m font-normal mb-2 hover:cursor-pointer transition duration-300 ease-in-out transform hover:bg-slate-200 rounded-md p-2'
                          onClick={() => changeComponent(<Reservations/>)}><FontAwesomeIcon icon={faFileInvoiceDollar} className='mr-4 w-4 h-4' />Reservations</div>
                    <div     className='menu-item w-[12rem] text-m font-normal mb-2 hover:cursor-pointer transition duration-300 ease-in-out transform hover:bg-slate-200 rounded-md p-2'
                          onClick={() => changeComponent(<Schedule/>)}><FontAwesomeIcon icon={faCalendarDays} className='mr-4 w-4 h-4' />Schedule</div>
                    <div     className='menu-item w-[12rem] text-m font-normal mb-2 hover:cursor-pointer transition duration-300 ease-in-out transform hover:bg-slate-200 rounded-md p-2'
                          onClick={() => changeComponent(<BusinessCards/>)}><FontAwesomeIcon icon={faCreditCard} className='mr-4 w-4 h-4' />Menu</div>
                    <div className='menu-item w-[12rem] text-m font-normal mb-2 hover:cursor-pointer transition duration-300 ease-in-out transform hover:bg-slate-200 rounded-md p-2'
                          onClick={() => changeComponent(<Analysis/>)}><FontAwesomeIcon icon={faMagnifyingGlassChart} className='mr-4 w-4 h-4' />Revenue Analysis </div>
                    <div     className='menu-item w-[12rem] text-m font-normal mb-2 hover:cursor-pointer transition duration-300 ease-in-out transform hover:bg-slate-200 rounded-md p-2'
                          onClick={() => changeComponent(<Profile/>)}><FontAwesomeIcon icon={faUser} className='mr-4 w-4 h-4' />Profile</div>
                    <div     className='menu-item w-[12rem] text-m font-normal mb-2 hover:cursor-pointer transition duration-300 ease-in-out transform hover:bg-slate-200 rounded-md p-2'
                          onClick={() => changeComponent(<Settings/>)}><FontAwesomeIcon icon={faGear} className='mr-4 w-4 h-4' />Setings</div>
                    <div onClick={e => submitLogout(e)} className='w-[12rem] text-m font-normal mb-2 hover:cursor-pointer transition duration-300 ease-in-out transform hover:bg-slate-200 rounded-md p-2'>
                    <button>
                      <FontAwesomeIcon icon={faArrowRightFromBracket} className='mr-6 w-4 h-4'/>Log out
                    </button>
              </div>
            </div>  
            <hr className='mb-8 mt-8 w-[12rem] h-[0.1rem]  bg-slate-400'/>
          </div>  
            
          <div className='grid place-items-center mb-4'>
            <p className='text-xl font-thin mb-4 '>Socials</p>
            <hr className='mb-6 w-[4px] rounded-full h-[4px] bg-slate-400'/>
            <div className='w-[12rem] text-center flex justify-between'>
              <FontAwesomeIcon icon={faFacebook} className="w-6 h-6" />
              <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
              <FontAwesomeIcon icon={faTwitter} className="w-6 h-6" />
              <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
              <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
            </div>
          </div> 

        </div> 
      </div>

      {/* Main content */}
      <div className="w-5/6 flex mr-4 shadow-xl bg-slate-100 rounded-md border-custom3 border-2">
          <div className='h-full w-full'>
            {component}
          </div>
      </div>
        
      </div>
    </div>
  );
}

export default ExpenseTracker;
