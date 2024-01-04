import React from 'react'

function Chat({userInfo}) {
  return (
    <div className='flex animate__animated animate__fadeIn m-2 h-full'>
        <div className='w-2/6 p-2 bg-white'>
            <div className='flex items-center'>
              <img src='https://picsum.photos/200/300' alt='profile' className='h-8 w-8 rounded-full'/>
              <h1 className='ml-2'>{userInfo.username}</h1>
            </div>
        </div>
        <div className='w-4/6 ml-2 bg-white p-2'>
            chat messages
        </div>
    </div>
  )
}

export default Chat;