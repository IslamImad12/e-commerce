import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { addToCart, useCartCrud } from './useCart'
import { addToWhish, useWhishCrud } from './useWishlest'
import { whishContext } from './WhishContext'


export default function Products() {

  async function getFeaturedProducts()
  {
    return await axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }
  let {isLoading , isError , data , isFetched} = useQuery('fraturedProducts' , getFeaturedProducts ) 
  
  let {mutate} = useCartCrud(addToCart)
  let {mutate:mutateTwo} = useWhishCrud(addToWhish)
  // let {addToWhish} = useContext(whishContext)
  const [clicked, setClicked] = useState(false);

  const toggleHeart = () => {
    setClicked(!clicked);
  };
  console.log(data?.data.data);

  async  function addProductWish(productId){
    let response = await addToWhish(productId);
  }

  return (
  <>
    <div className='container py-2'>
      <h2>Featured Products</h2> <br />
      <div className="row gy-4">
        {data?.data.data.map((Product) => <div key={Product.id} 
        className='col-md-3 mx-auto m-2  p-2 text-center d-flex justify-content-center flex-column product cursor-pointer overflow-hidden'>
          <Link to={`/productsDetails/${Product._id}`}>
          <img src={Product.imageCover} alt={Product.title} width={150} className=''/>
          <div className=' text-start'>
          <span className='text-main  fw-bolder '>{Product.category.name}</span>
          <p className=' font-sm  '>{Product.title.split(' ').slice(0,2).join(' ')}</p>
          </div>
          <div className='d-flex justify-content-between mt-3'>
            <span>{Product.price} EGP</span>
            <span><i className='fas fa-star rating-color'></i>{Product.ratingsAverage}</span>
          </div>
          </Link>
          <div className='d-flex justify-content-between align-items-center'>
          <button className='btn bg-main text-white w-75' onClick={()=>{mutate(Product._id)}}>Add to cart</button>
          <span>
          <i
            className={`fa-solid fa-heart fs-3 ${clicked ? 'text-danger' : ''}`}
            onClick={()=>{mutateTwo(Product._id)}}
            style={{ cursor: 'pointer'}}></i>
            </span>
          </div>
        </div>)}
      </div>
    </div>
  </>
  )
}
