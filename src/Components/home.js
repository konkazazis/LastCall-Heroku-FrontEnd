import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the default styles
import hyperlink from '../assets/hyperlink.png'

function Home({userInfo}) {
  const [data, setData] = useState({ data: [] }); // Set the data state to an empty array
  const [errorCode, setErrorCode] = useState(null); // Set the errorInfo state to null
  const [date, setDate] = useState(new Date());
  const onChange = (newDate) => {
    setDate(newDate);
  };

  const fetchNewsData = async (url) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text(); 
        const errorCode = `Error Code: ${response.status}.`;
        setErrorCode(errorCode); 
        throw new Error(errorCode); // Throw the error with the error information
      }

      const responseData = await response.json();
      setData(responseData); // Update the entire data object
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorCode(error.message); // Set the errorInfo state to the error message
    }
  };

  useEffect(() => {
    const CovidDataPerDay =
      "https://api.thenewsapi.com/v1/news/all?language=en&api_token=UECGzUadiCBYT3YzjqyPJcehE4RRVy4buJA0PQGE";
      fetchNewsData(CovidDataPerDay);
  }, []);
  
  return (
    <div className='animate__animated animate__fadeIn m-2 h-[100%]'>
      <div className='flex h-2/3 mb-2'>
        <div className='bg-white w-3/4 mr-2 p-4'>
          <h1 className='text-5xl'>Hi {userInfo.username} !</h1>
          <h2 className='text-3xl mb-4'>This is your home page</h2>
          <p>There should be some general messages</p>
        </div>
        <div className='bg-white w-1/4'>
          <h1>Online Co-Workers</h1>
        </div> 
      </div>
      <div className='flex h-1/3 content-between'>
        <div className='bg-white w-1/3 mr-2'>
          <Calendar className='w-full' onChange={onChange} value={date} />
        </div>
        <div className='bg-white w-1/3 mr-2'>Strikes</div>
        <div className='bg-white w-1/3 overflow-scroll'>
          {data.data.length > 0  ? data.data.slice(0, 3).map((newsItem, index) => (
          <li className='list-none p-4 flex items-center justify-between' key={index}>
            <a href={newsItem.url} className='flex items-center'>
              <div>
                <div className="flex items-center"> {/* Wrap h2 and image in a flex container */}
                  <h2 className="font-semibold">{newsItem.title}</h2>
                  <img className='w-6 ml-2' src={hyperlink} alt="Hyperlink" />
                </div>
                <p className="font-light">{newsItem.description}</p>
              </div>
            </a>
          </li>
          )) : (
          <div className='p-4 text-center'>
            <h1 className="mb-4 font-light">{errorCode ? `Request Failed: ${errorCode}` : "Loading..."}</h1>
          </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home;