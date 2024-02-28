import React from 'react'

export default function ResetCode() {
    return <>
  <div className="container py-5">
    <div className="row">
    <h1 className='py-3'>reset your account password</h1>
    <input type="text" placeholder='code' className='form-control' />
    </div>
    <button className='btn bg-main text-white my-3'>Vertify</button>
  </div>
  </>
}
