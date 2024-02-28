import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import Slider from "react-slick"; 

export default function CategorySlider() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 100,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows:true,
        autoplay:false,
      };

    function getCategory(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }
    let {data} = useQuery('category' , getCategory) //data?.data?.data
    return (
        <header className='container'>
        <div className="row">
                <Slider {...settings}>
                    {data?.data?.data.map((ele)=><img key={ele._id} src={ele.image} className='w-100' height={300}></img>)}
                </Slider>
                <Slider {...settings}>
                    {data?.data?.data.map((ele)=><h3 key={ele._id} className='w-100' height={300}>{ele.name}</h3>)}
                </Slider>
        </div>
        </header>
  )
}
