import React from 'react'
import { Outlet } from 'react-router-dom'
import ShoppingHeader from './header'
function ShoppignLayout() {
  return (
    <div className='flex flex-col bg-white overflow-hidden'>
        {/* common Header Component */}
        <ShoppingHeader/>
        <main className='flex flex-col w-full'>
            <Outlet/>
           
        </main>
    </div>
  )
}

export default ShoppignLayout
