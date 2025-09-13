import HeroSection from '@/components/home/HeroSection'
import List from '@/components/home/List'
import Separator from '@/components/Separator'
import React from 'react'

const page = () => {
  return (
    <div >
      <HeroSection />
      <Separator/>
      <List />
    </div>

  )
}

export default page