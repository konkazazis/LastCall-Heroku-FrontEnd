import React from 'react'

function Home({userInfo}) {
  
  return (
    <div className='animate__animated animate__fadeIn m-2 h-[100%]'>
      <div className='p-4 bg-white h-2/3 mb-2'>
        <h1 className='text-5xl '>Hi {userInfo.username} !</h1>
        <h2 className='text-3xl mb-4'>This is your home page</h2>
        <p>There should be some general messages</p>
      </div>
      <div className='flex h-1/3 content-between'>
        <div className='bg-white w-1/3 mr-2'>Schedule</div>
        <div className='bg-white w-1/3 mr-2'>Strikes</div>
        <div className='bg-white w-1/3'>News</div>
      </div>
    </div>
  )
}

export default Home;