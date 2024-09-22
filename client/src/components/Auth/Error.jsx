import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className='flex flex-row item-center justify-center text-center'>
      You are not allowed to visit this page , admin is only allowed to visit this page.
      <Link to="/user_details"><button className='text-white rounded-md p-3 text-lg m-6 bg-blue-500'>Go Back</button></Link>
    </div>
  )
}

export default Error
