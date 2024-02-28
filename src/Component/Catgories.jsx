import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { addToCart, useCartCrud } from './useCart'

export default function Catgories() {
  async function getFeaturedBrands(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  let {data} = useQuery('fraturedBrands' ,getFeaturedBrands )
  return <>
    <div className="container py-2  text-center my-3 min-vh-100">
      <div className="row gy-4">
        {data?.data.data.map((Brand, index) => (
  <div 
    className='col-md-4 text-center d-flex justify-content-center flex-column brand  overflow-hidden'
    style={{'margin':'12px', 'width':'30.3%'}}
    key={index}>
    <img src={Brand.image} alt="" width={'100%'} height={330}/>
    <h3 className='text-main'>{Brand.name}</h3>
  </div>
))}

      </div>
    </div>
  </>
}
