"use client"
import React from 'react'
import ThemeToggle from '../ThemeToggle'
import { Button } from '../ui/button'
import { FaGithub } from "react-icons/fa";
import Link from 'next/link';
const Navbar = () => {
  return (
    <div className="fixed top-0 right-0 left-0 z-10 flex justify-between brutal py-4 px- lg:px-8 mx-4 lg:mx-24 mt-2 lg:mt-4 rounded-xl bg-secondary-background">
      <Button
        variant="brutal"
        className="text-xl font-semibold bg-main-light"
      >
        AnimeFlix
      </Button>
      <div className='flex items-center gap-6'>
        <div className='flex gap-3 font-medium'>
          <Link href={"/"} className='text-xl'>Popular</Link>
          <Link href={'/'} className='text-xl tracking-tighter'> Latest </Link>
        </div>
         <Button
        variant="brutal"
        className="text-xl font-semibold bg-secondary-background"
      >
        Give a Star <FaGithub />
      </Button>
      <ThemeToggle />
      </div>
     
    </div>
  )
}

export default Navbar
