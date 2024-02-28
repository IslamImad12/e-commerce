import React, { useContext, useState } from 'react'
import { counterContext } from './CounterContext'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

export default function Brands() {
  async function getFeaturedBrands(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }
  let {data} = useQuery('fraturedBrands' ,getFeaturedBrands )
  return <>
    <div className="container py-2 min-vh-100">
      <div className="row gy-4">
        <h2 className='text-center text-main fs-1' style={{'font-weight':'bold'}}>All Brands</h2>
        {data?.data.data.map((Brand, index) => (
  <div 
    className='col-md-3 text-center d-flex justify-content-center flex-column brand  overflow-hidden'
    style={{'margin':'5px', 'width':'24%'}}
    key={index}
  >
    <img src={Brand.image} alt="" width={240}/>
    <button className="btn  my-4" data-bs-toggle="modal" data-bs-target={`#exampleModal${index}`} 
    style={{'zIndex':'99' , }}>
      {Brand.name}
    </button>


    <div className="modal fade" id={`exampleModal${index}`} tabIndex="-1" aria-labelledby={`exampleModalLabel${index}`} aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body d-flex align-items-center justify-content-between">
          <div>
          <p className='text-main fs-2 px-2'>{Brand.name}</p>
          <p className=''>{Brand.slug}</p>
          </div>
            <img src={Brand.image} alt="" width={240}/>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
))}

      </div>
    </div>
  </>
}


