import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './sidebar'
import AdminHeader from './header'
import { useState } from 'react'
function Adminlayout() {
  const [opensidebar, setOpensidebar] = useState(false)

  return (
    <div className='flex min-h-screen w-full'>
         {/* admin sidebar */}
         <AdminSidebar open={opensidebar} setOpen = {setOpensidebar}/>
         <div className='flex flex-1 flex-col'>
             {/* admin header */}
             <AdminHeader  setOpen = {setOpensidebar}/>
             <main className='flex-1 flex bg-muted/40 p-4 md:p-6'>
                 <Outlet/>
            </main> 
         </div>
    </div>
  )
}

export default Adminlayout
