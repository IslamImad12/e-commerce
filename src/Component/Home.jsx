import React, { useContext, useState } from 'react'
import { counterContext } from './CounterContext'
import { getFeaturedProducts, useProduct } from './useProduct'
import Products from './Products'
import MainSlider from './MainSlider'
import CategorySlider from './CategorySlider'

export default function Home() {
  let {data , isLoading , error , isError} = useProduct('product' , getFeaturedProducts)
  if(isError){
    return <h2>{error.message}</h2>
  }
  return (
    <div className='container py-5'>
        <title>Home component</title>
        <meta name="description" content="Helmet application" />
      <div className='py-2 my-2'>
      <MainSlider />  <br />
      <CategorySlider />
      </div>
      <div className="row">
        {data?.map((prod) => <Products key={prod._id} prod={prod}></Products>)}
      </div>
    </div>
  )
  
}
