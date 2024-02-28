import React, { useContext, useState } from 'react'
import { checkOut, deleteWhish, getWhish, updateWhish, useWhish, useWhishCrud } from './Component/useWishlest'
import { userContext } from './UserContext'

export default function Whish() {
    let [details , setdetails] = useState('')
    let [phone , setphone] = useState('')
    let [city , setcity] = useState('')

    let { isOpen, setOpen } = useContext(userContext)
    let { data, isLoading, isError, error , mutate:mutateTwo} = useWhish('getWhish', getWhish)
    let {mutate:deletedMutate,data:deleteddata} = useWhishCrud(deleteWhish)
    let {mutate,data:updateddata} = useWhishCrud(updateWhish)
    let {mutate:mutateonline,data:dataonline} = useWhishCrud(checkOut)

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
                  <button className='btn btn-brdr p-1' onClick={()=>{mutateTwo({id:prod.product._id,count:prod.count+1})}}>+</button>
                  <span className='mx-2'>{prod.count}</span>
                  <button className='btn btn-brdr p-1'  onClick={()=>{mutateTwo(prod.product._id,prod.count-1)}}>-</button>
                  </div>
              </div>
          </div>)}
           </>:<h2 className='text-main'>Cart is Empty</h2>}
            
         </div>
      </aside>

  )





}
