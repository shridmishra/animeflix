import React from 'react'
import ThemeToggle from '../ThemeToggle'
import { Button } from '../ui/button'

const Navbar = () => {
  return (
    <div className='flex justify-between brutal py-2 px-2 lg:px-4 mx-4 lg:mx-24 mt-2 lg:mt-4 rounded-xl'>
        <Button variant={"brutal"} className='text-xl font-semibold bg-main-light'>AnimeFlix</Button>
        <ThemeToggle/>
    </div>
  )
}

export default Navbar