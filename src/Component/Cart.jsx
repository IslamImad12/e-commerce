import React, { useContext, useState } from 'react'
import { userContext } from '../UserContext'
import { checkOut, deleteCart, getCart, updateCart, useCart, useCartCrud } from './useCart'



export default function Cart() {
    let [details , setdetails] = useState('')
    let [phone , setphone] = useState('')
    let [city , setcity] = useState('')

    let { isOpen, setOpen } = useContext(userContext)
    let { data, isLoading, isError, error } = useCart('getCart', getCart)
    let {mutate:deletedMutate,data:deleteddata} = useCartCrud(deleteCart)
    let {mutate,data:updateddata} = useCartCrud(updateCart)
    let {mutate:mutateonline,data:dataonline} = useCartCrud(checkOut)

    function addAddress(e){
        e.preventDefault()
        let shippingAddress = {
            details,phone,city
        }
        mutateonline({id:data?.data?.data._id , shippingAddress})
        if(dataonline?.data?.status == 'success') {
            window.location.href = dataonline?.data?.session?.url
        }
    }
    
  if(isError)
  return <h2>{error.message}</h2>

  return (
      <aside className='right min-vh-100' style={isOpen ? { right: 0, transition: 'right 1s' } : { right: '-100%', transition: 'right 1s' }}>
          <i className='fa-solid fa-close p-3 fa-2x cursor-pointer' onClick={() => { setOpen(false) }}></i>

         <div className="container">
           { (data?.data.numOfCartItems) ? <>
              <h3 className='text-main'>Number of Cart items{data?.data.numOfCartItems}</h3>
          <p>total cart price <span className='fw-bolder mx-3'>{data?.data?.data?.totalCartPrice}</span> </p>
          {data?.data?.data?.products.map((prod) => <div  className='row gy-2 justify-content-between align-items-center' key={prod.product._id}>
              <div className="col-md-8">

                  <div className="row gy-3 align-items-center">
                      <div className="col-md-2">
                          <img src={prod.product.imageCover} className='w-100 my-3' alt="" />
                      </div>
                      <div className="col-md-10">
                         <p>{prod.product.title}</p>
                         <p className='text-main'>{prod.price} EGP</p>
                         <p className='cursor-pointer' onClick={()=>{deletedMutate(prod.product._id)}}><i className='fa-solid fa-trash text-main '></i>Remove</p>
                      </div>
                  </div>

              </div>
              <div className="col-md-4 d-flex justify-content-end">
                  <div>
                  <button className='btn btn-brdr p-1' onClick={()=>{mutate({id:prod.product._id,count:prod.count+1})}}>+</button>
                  <span className='mx-2'>{prod.count}</span>
                  <button className='btn btn-brdr p-1'  onClick={()=>{mutate(prod.product._id,prod.count-1)}}>-</button>
                  </div>
              </div>
          </div>)
          
          }
            <button 
            className='btn btn-success' data-bs-toggle="modal"
            data-bs-target="#modalId">Check out</button>
{/* Modal */}
          <div
    class="modal fade"
    id="modalId"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    
    role="dialog"
    aria-labelledby="modalTitleId"
    aria-hidden="true">
    <div
        class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm"
        role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalTitleId">
                    Modal title
                </h5>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
            </div>
            <div class="modal-body">
                <form action="">
                    <input type="text" onChange={(e)=>{setdetails(e.target.value)}} className='form-control' placeholder='details' />
                    <input type="text" onChange={(e)=>{setphone(e.target.value)}}  className='form-control' placeholder='phone' />
                    <input type="text" onChange={(e)=>{setcity(e.target.value)}}  className='form-control' placeholder='City' />
                    <button className='btn btn-danger' type='submit' onClick={addAddress}>add addresss</button>
                </form>
            </div>
            <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal">
                    Close
                </button>
                <button type="button" class="btn btn-primary">Save</button>
            </div>
        </div>
    </div>
</div>

           </>:<h2 className='text-main'>Cart is Empty</h2>}
            
         </div>
      </aside>

  )





}





