import React from 'react'
import { Link } from 'react-router-dom'

export default function VertifyCode() {
  return <>
  <div className="container py-5">
    <div className="row">
    <h1 className='py-3'>please enter your verification code</h1>
    <input type="email" placeholder='Email' className='form-control' />
    </div>
    <button className='btn bg-main text-white my-3' >
        <Link to='/resetCode'>Vertify</Link></button>
  </div>
  </>
    
  
}
