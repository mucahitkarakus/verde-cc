import React from 'react'
import Card from '../components/Card/Card'

const Home = () => {
  return (
    <div>
         <div className='bg-slate-100 mt-10 w-full grid grid-cols-3 ' >
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
         </div>
    </div>
  )
}

export default Home