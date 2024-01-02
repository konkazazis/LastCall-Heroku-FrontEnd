import React from 'react'

function Chat({userInfo}) {
  return (
    <div className='flex animate__animated animate__fadeIn m-2'>
        <div className='w-2/6 h-[50rem] p-2 bg-custom2'>
            <div className='flex items-center'>
              <img src='https://picsum.photos/200/300' alt='profile' className='h-8 w-8 rounded-full'/>
              <h1 className='text-white ml-2'>{userInfo.username}</h1>
            </div>
        </div>
        <div className='w-4/6 bg-custom3 p-2'>
            chat messages
        </div>
    </div>
  )
}

export default Chat;