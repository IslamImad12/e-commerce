import React from 'react'
import { useParams } from 'react-router-dom'
import { featuredSingleProducts, useProduct } from './useProduct'
import { addToCart, useCartCrud } from './useCart'

export default function ProductDetails() {
    
    let {mutate} = useCartCrud(addToCart)
    let { id } = useParams()
    let { isLoading, isError, error, data } = useProduct('productdetails', () => featuredSingleProducts(id))

    if (isError)
        return <h2>{error.message}</h2>

    return (
      <div className="container">
                <div className='row align-items-center'>
            <div className="col-md-4">
                <img src={data?.imageCover} className='w-100' alt="" />
            </div>
            <div className="col-md-8">
                <h3>{data?.title}</h3>
                <p>{data?.description}</p>
                
                    <span className='text-main'>{data?.category?.name}</span>
                
                <div className="box d-flex justify-content-between">
                    <span>{data?.price} EGP</span>
                    <span>{data?.ratingsAverage} <i className='fa-solid fa-star rating-color'></i> </span>
                </div>
                    <button className='btn btn-success form-control my-4' onClick={()=>{mutate(data?._id)}}>Add to Cart</button> 
            </div>
        </div>
      </div>
    )
}
