// src/Carousel.js
import React from 'react';
import Slider from 'react-slick';
import Searchbar from './Searchbar';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (

    <section className="text-gray-600 body-font z-1">
      <div className="container px-5 py-20 mx-auto">
        <div className="flex flex-wrap -m-1">
          <div className="p-4 lg:w-2/3 ">
            <div className='rounded-lg'>
              <Slider {...settings}>
                <div className=" h-96">
                  <img src={"Carousel/House-1.jpg"} alt="Slide 1" className="object-cover w-full h-full rounded-lg" />
                </div>
                <div className="w-full h-96">
                  <img src={"Carousel/House-3.jpg"} alt="Slide 2" className="object-cover w-full h-full rounded-lg" />
                </div>
                <div className="w-full h-96">
                  <img src={"Carousel/House-4.jpg"} alt="Slide 3" className="object-cover w-full h-full rounded-lg" />
                </div>
              </Slider>
            </div>
          </div>
          <div className='absolute justify-center items-center w-11/12 z-100'>
            <Searchbar />
          </div>
          <div className="p-4 lg:w-1/3">
            <div className=' py-20'>
              <span className="title-font sm:text-3xl  font-medium text-3xl text-gray-900 mb-3">Post property Ad to sell or rent online for</span><span className='title-font sm:text-4xl  font-medium text-3xl text-red-700'> Free!</span>

              <div className=' flex'>
                <img src={"Carousel/checked.png"} alt="" className='pt-6 mr-4' width={30} /><span className='title-font sm:text-xl pt-6 font-medium text-xl text-gray-800'>Get Access to 4 Lakh + Buyers</span>
              </div>

              <div className=' flex'>
                <img src={"Carousel/checked.png"} alt="" className='pt-6 mr-4' width={30} /><span className='title-font sm:text-xl pt-6 font-medium text-xl text-gray-800'>Sell Faster with Premium Service</span>
              </div>

              <div className=' flex'>
                <img src={"Carousel/checked.png"} alt="" className='pt-6 mr-4' width={30} /><span className='title-font sm:text-xl pt-6 font-medium text-xl text-gray-800'>Get Expert Advice on Market Trends </span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
