import React from 'react'
import ThemeToggle from '../ThemeToggle'
import { Button } from '../ui/button'
import { FaGithub } from "react-icons/fa";
const Navbar = () => {
  return (
    <div className="fixed top-0 right-0 left-0 z-10 flex justify-between brutal py-2 px-2 lg:px-4 mx-4 lg:mx-24 mt-2 lg:mt-4 rounded-xl">
      <Button
        variant="brutal"
        className="text-xl font-semibold bg-main-light"
      >
        AnimeFlix
      </Button>
      <div className='flex items-center gap-4'>
         <Button
        variant="brutal"
        className="text-xl font-semibold bg-secondary-background"
      >
        Give A Star <FaGithub />
      </Button>
      <ThemeToggle />
      </div>
     
    </div>
  )
}

export default Navbar
