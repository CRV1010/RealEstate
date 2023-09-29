import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SellBuyRent = () => {
  return (
    <section className="text-gray-600 body-font">
       
      <div className="container px-4 py-6 mx-auto">
      <div className="lg:w-1/2 w-full mb-6">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Sell Buy Rent Properties</h1>
            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
        </div>
        <div className="flex flex-wrap">
          <div className="p-4 lg:w-1/3 box">
            <Link to="/sell">
              <div className=" h-96  bg-blue-500 rounded-lg imgBox">
                <img src={"BuyRentSell/sale-1.jpg"} alt="Slide 1" className="object-cover w-full h-full rounded-lg" />
              </div>
              <div className="content">
                <h2>
                  Sell Properties
                </h2>
              </div>
            </Link>
          </div>
          <div className="p-4 lg:w-1/3 box">
            <Link to="/explore">
              <div className=" h-96   rounded-lg imgBox">
                <img src={"BuyRentSell/buy-7.png"} alt="Slide 1" className="object-cover w-full h-full rounded-lg" />
              </div>
              <div className="content">
                <h2>
                  Buy Properties
                </h2>
              </div>
            </Link>
          </div>
          <div className="p-4 lg:w-1/3 box">
            <Link to="/explore">
              <div className=" h-96 rounded-lg imgBox">
                <img src={"BuyRentSell/rent-5.png"} alt="Slide 1" className="object-cover w-full h-full rounded-lg" />
              </div>
              <div className="content">
                <h2>
                  Rent Properties
                </h2>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellBuyRent;

