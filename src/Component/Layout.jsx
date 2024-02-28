import React, { useContext, useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { userContext } from '../UserContext'

export default function Layout() {
  let {setIsUser} = useContext(userContext)

  useEffect(()=>{
    if(localStorage.getItem('userToken') !== null){
      setIsUser(localStorage.getItem('userToken'))
    }
  },[])
  return ( <>
    <Navbar/>
    <Outlet></Outlet>
    <Footer/>
  </>
  )
}
