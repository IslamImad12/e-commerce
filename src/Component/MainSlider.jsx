import React from 'react'
import Slider from "react-slick";
import slide1 from '../Component/finalProject assets/images/image1.jpg'
import slide2 from '../Component/finalProject assets/images/image2.jpg'
import slide3 from '../Component/finalProject assets/images/image3.jpg'
import blog1 from '../Component/finalProject assets/images/image4.jpg'
import blog2 from '../Component/finalProject assets/images/image5.jpg'
export default function MainSlider() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 100,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
      };
    return (
    <header className='container'>
        <div className="row g-0">
            <div className="col-md-9">
                <Slider {...settings}>
                    <img src={slide1} className='w-50' height={400} alt="" />
                    <img src={slide2} className='w-50' height={400} alt="" />
                    <img src={slide3} className='w-100' height={400} alt="" />
                </Slider>
            </div>
            <div className="col-md-3">
                <img src={blog1} className='w-100' height={200} alt="" />
                <img src={blog2} className='w-100' height={200} alt="" />
            </div>
        </div>
    </header>
  )
}
