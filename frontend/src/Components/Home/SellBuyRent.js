import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';

const SellBuyRent = () => {
  //Buy Properties
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [modal3Open, setModal3Open] = useState(false);

  const openModal = () => {
    setModal1Open(true);
  };

  const closeModal1 = () => {
    setModal1Open(false);
    setModal3Open(false);
    setModal2Open(true);

  };

  const onlycloseModal1 = () => {
    setModal1Open(false);
  };

  const onlycloseModal2 = () => {
    setModal2Open(false);
  };

  const closeModal2 = () => {
    setModal2Open(false);
    setModal3Open(true);
    setModal1Open(false);
  };

  const closeModal3 = () => {
    setModal3Open(false);
  };

  // Rent Properties
  const [rentModal1Open, setRentModal1Open] = useState(false);
  const [rentModal2Open, setRentModal2Open] = useState(false);
  const [rentModal3Open, setRentModal3Open] = useState(false);

  const rentOpenModal = () => {
    setRentModal1Open(true);
  };

  const rentCloseModal1 = () => {
    setRentModal1Open(false);
    setRentModal3Open(false);
    setRentModal2Open(true);

  };

  const rentOnlycloseModal1 = () => {
    setRentModal1Open(false);
  };

  const rentOnlycloseModal2 = () => {
    setRentModal2Open(false);
  };

  const rentCloseModal2 = () => {
    setRentModal2Open(false);
    setRentModal3Open(true);
    setRentModal1Open(false);
  };

  const rentCloseModal3 = () => {
    setRentModal3Open(false);
  };


  const handleDropdownChange = (event) => {
    let state = event.target.value;
      console.log(state)
      localStorage.setItem('State', JSON.stringify(state ));
  };

  const handleDropdownChange1 = (event) => { 
    let cities = event.target.value;
    console.log(cities)
    localStorage.setItem('Cities', JSON.stringify( cities ));
  };

  const handleDropdownChange2 = (event) => { 
    let area = event.target.value;
    console.log(area)
    localStorage.setItem('Area', JSON.stringify( area ));
  };


  const handleDropdownChange3 = (event) => {
    let propertyType = event.target.value;
      console.log(propertyType)
      localStorage.setItem('Property', JSON.stringify( propertyType ));
  };

  const handleDropdownChange4 = (event) => { 
    let type = event.target.value;
    console.log(type)
    localStorage.setItem('Type', JSON.stringify( type ));
  };

  const handleDropdownChange5 = (event) => { 
    let budget = event.target.value;
    console.log(budget)
    localStorage.setItem('Budget', JSON.stringify(budget ));
  };

const stateData = JSON.parse(localStorage.getItem('State'));
const citiesData = JSON.parse(localStorage.getItem('Cities'));
const areaData = JSON.parse(localStorage.getItem('Area'));
const propertyData = JSON.parse(localStorage.getItem('Property'));
const typeData = JSON.parse(localStorage.getItem('Type'));
const budgetData = JSON.parse(localStorage.getItem('Budget'));

// Combine them into one object
const combinedObject = {
  state: stateData,
  cities: citiesData,
  area: areaData,
  property: propertyData,
  type: typeData,
  budget: budgetData
};

// Store the combined object back in localStorage
localStorage.setItem('CombinedData', JSON.stringify(combinedObject));



const rentHandleDropdownChange = (event) => {
  let state = event.target.value;
    console.log(state)
    localStorage.setItem('RentState', JSON.stringify(state ));
};

const rentHandleDropdownChange1 = (event) => { 
  let cities = event.target.value;
  console.log(cities)
  localStorage.setItem('RentCities', JSON.stringify( cities ));
};

const rentHandleDropdownChange2 = (event) => { 
  let area = event.target.value;
  console.log(area)
  localStorage.setItem('RentArea', JSON.stringify( area ));
};


const rentHandleDropdownChange3 = (event) => {
  let propertyType = event.target.value;
    console.log(propertyType)
    localStorage.setItem('RentProperty', JSON.stringify( propertyType ));
};

const rentHandleDropdownChange4 = (event) => { 
  let type = event.target.value;
  console.log(type)
  localStorage.setItem('RentType', JSON.stringify( type ));
};

const rentHandleDropdownChange5 = (event) => { 
  let budget = event.target.value;
  console.log(budget)
  localStorage.setItem('RentBudget', JSON.stringify(budget ));
};


const rentStateData = JSON.parse(localStorage.getItem('RentState'));
const rentCitiesData = JSON.parse(localStorage.getItem('RentCities'));
const rentAreaData = JSON.parse(localStorage.getItem('RentArea'));
const rentPropertyData = JSON.parse(localStorage.getItem('RentProperty'));
const rentTypeData = JSON.parse(localStorage.getItem('RentType'));
const rentBudgetData = JSON.parse(localStorage.getItem('RentBudget'));

// Combine them into one object
const rentCombinedObject = {
  rentState: rentStateData,
  rentCities: rentCitiesData,
  rentArea: rentAreaData,
  rentProperty: rentPropertyData,
  rentType: rentTypeData,
  rentBudget: rentBudgetData
};

// Store the combined object back in localStorage
localStorage.setItem('RentCombinedData', JSON.stringify(rentCombinedObject));


  return (
    <section className="text-gray-600 body-font">

      <div className="container px-4 py-6 mx-auto">
        <div className="lg:w-1/2 w-full mb-6">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Sell Buy Rent Properties</h1>
          <div className="h-1 w-20 bg-indigo-500 rounded"></div>
        </div>
        <div className="flex flex-wrap justify-center align-middle">
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
            <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              <div className=" h-96   rounded-lg imgBox">
                <img src={"BuyRentSell/buy-7.png"} alt="Slide 1" className="object-cover w-full h-full rounded-lg" />
              </div>
              <div className="content">
                <h2>
                  Buy Properties
                </h2>
              </div>
            </button>
            {modal1Open && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                  <div className="bg-white  rounded-lg w-1/3">
                    <div className="mb-4 py-2  flex bg-indigo-400 rounded">
                      <span className="text-2xl text-white flex px-12 justify-center font-medium flex-grow">Select State And Cities</span>
                      <button onClick={onlycloseModal1} className="text-white font-bold text-xl px-3">
                      ✕
                    </button>
                    </div>
                    <div className="justify-center px-20 py-6">
                      <div className="mb-4">
                        <div className="sm:col-span-3">
                          <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                            State
                          </label>
                          <div className="mt-2">
                            <select
                              id="state"
                              name="state"
                              autoComplete="state-name"
                              onChange={handleDropdownChange}
                              className="block w-full rounded-md  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option>Gujarat</option>
                              <option>Delhi</option>
                              <option>Goa</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="sm:col-span-3">
                          <label htmlFor="cities" className="block text-sm font-medium leading-6 text-gray-900">
                            Cities
                          </label>
                          <div className="mt-2">
                            <select
                              id="cities"
                              name="cities"
                              autoComplete="cities-name"
                              onChange={handleDropdownChange1}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option>Vadodara</option>
                              <option>Surat</option>
                              <option>Rajkot</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="sm:col-span-3">
                          <label htmlFor="area" className="block text-sm font-medium leading-6 text-gray-900">
                            Area
                          </label>
                          <div className="mt-2">
                            <select
                              id="area"
                              name="area"
                              autoComplete="area-name"
                              onChange={handleDropdownChange2}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option>Samta</option>
                              <option>Laxmipura</option>
                              <option>Akota</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-20 pb-6">
                    <button onClick={closeModal1} className="bg-indigo-500 text-white font-semibold px-5 mr-6 py-2 rounded hover:bg-indigo-700">
                      Next
                    </button>
                    </div>
                   
                  </div>
                </div>
            )}
            {modal2Open && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg w-1/3">
                <div className="mb-4 py-2  flex bg-indigo-400 rounded">
                      <span className="text-2xl text-white flex px-12 justify-center font-medium flex-grow">Select Properties</span>
                      <button onClick={onlycloseModal2} className="text-white font-bold text-xl px-3">
                      ✕
                    </button>
                    </div>
                  <div className="align-middle justify-center px-20 py-6">
                    <div className="mb-4">
                      <div className="sm:col-span-3">
                        <label htmlFor="propertyType" className="block text-sm font-medium leading-6 text-gray-900">
                          Property Types
                        </label>
                        <div className="mt-2">
                          <select
                            id="propertyType"
                            name="propertyType"
                            autoComplete="propertyType-name"
                            onChange={handleDropdownChange3}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option>House</option>
                            <option>Flats</option>
                            <option>Duplex</option>
                            <option>Shop</option>
                            <option>Farm House</option>
                            <option>Villa</option>
                            <option>Plot</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="sm:col-span-3">
                        <label htmlFor="types" className="block text-sm font-medium leading-6 text-gray-900">
                          selct Type
                        </label>
                        <div className="mt-2">
                          <select
                            id="types"
                            name="types"
                            autoComplete="types-name"
                            onChange={handleDropdownChange4}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option>1 BHK</option>
                            <option>2 BHK</option>
                            <option>3 BHK</option>
                            <option>4 BHK</option>
                            <option>5 BHK</option>
                            <option>5+ BHK</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                    <div className="px-20 pb-6">
                    <button onClick={closeModal2} className="bg-indigo-500 text-white font-semibold px-5 mr-6 py-2 rounded hover:bg-indigo-700">
                      Next
                    </button>
                    </div>
                </div>
              </div>
            )}
            {modal3Open && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white  rounded-lg w-1/3">
                <div className="mb-4 py-2  flex bg-indigo-400 rounded">
                      <span className="text-2xl text-white flex px-12 justify-center font-medium flex-grow">Select Budget</span>
                      <button onClick={closeModal3} className="text-white font-bold text-xl px-3">
                      ✕
                    </button>
                    </div>
                  <div className="align-middle justify-center px-20 py-6">
                    <div className="mb-4">
                      <div className="sm:col-span-3">
                        <label htmlFor="budget" className="block text-sm font-medium leading-6 text-gray-900">
                          Budget
                        </label>
                        <div className="mt-2">
                          <select
                            id="budget"
                            name="budget"
                            autoComplete="budget-name"
                            onChange={handleDropdownChange5}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option>less than 5 Lac</option>
                            <option>5 Lac - 10 Lac</option>
                            <option>10 Lac - 20 Lac</option>
                            <option>20 Lac - 30 Lac</option>
                            <option>30 Lac - 40 Lac</option>
                            <option>40 Lac - 50 Lac</option>
                            <option>50 Lac - 70 Lac</option>
                            <option>70 Lac - 90 Lac</option>
                            <option>90 Lac - 100 Lac</option>
                            <option>more than 100 Lac</option>
                          </select>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="px-20 pb-6">
                  <Link to={"/explore"} className="bg-indigo-500 text-white px-4 mr-6 py-2 rounded hover:bg-indigo-700">
                    submit
                  </Link>
                    </div>

            
                </div>
              </div>
            )}
          </div>
          <div className="p-4 lg:w-1/3 box">
            <button onClick={rentOpenModal} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              <div className=" h-96 rounded-lg imgBox">
                <img src={"BuyRentSell/rent-5.png"} alt="Slide 1" className="object-cover w-full h-full rounded-lg" />
              </div>
              <div className="content">
                <h2>
                  Rent Properties
                </h2>
              </div>
            </button>
            {rentModal1Open && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white  rounded-lg w-1/3">
                <div className="mb-4 py-2  flex bg-indigo-400 rounded">
                      <span className="text-2xl text-white flex px-12 justify-center font-medium flex-grow">Select State And Cities</span>
                      <button onClick={rentOnlycloseModal1} className="text-white font-bold text-xl px-3">
                      ✕
                    </button>
                    </div>
            
                  <div className="align-middle px-20 py-6 justify-center">
                    <div className="mb-4">
                      <div className="sm:col-span-3">
                        <label htmlFor="rentState" className="block text-sm font-medium leading-6 text-gray-900">
                          State
                        </label>
                        <div className="mt-2">
                          <select
                            id="rentState"
                            name="rentState"
                            autoComplete="rentState-name"
                            onChange={rentHandleDropdownChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option>Gujarat</option>
                            <option>Delhi</option>
                            <option>Goa</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="sm:col-span-3">
                        <label htmlFor="rentCities" className="block text-sm font-medium leading-6 text-gray-900">
                          Cities
                        </label>
                        <div className="mt-2">
                          <select
                            id="rentCities"
                            name="rentCities"
                            autoComplete="rentCities-name"
                            onChange={rentHandleDropdownChange1}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option>Vadodara</option>
                            <option>Surat</option>
                            <option>Rajkot</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="sm:col-span-3">
                        <label htmlFor="rentArea" className="block text-sm font-medium leading-6 text-gray-900">
                          Area
                        </label>
                        <div className="mt-2">
                          <select
                            id="rentArea"
                            name="rentArea"
                            autoComplete="rentArea-name"
                            onChange={rentHandleDropdownChange2}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option>Samta</option>
                            <option>Laxmipura</option>
                            <option>Akota</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
       
                  <div className="px-20 pb-6">
                    <button onClick={rentCloseModal1} className="bg-indigo-500 text-white font-semibold px-5 mr-6 py-2 rounded hover:bg-indigo-700">
                      Next
                    </button>
                    </div>

              
                </div>
              </div>
            )}
            {rentModal2Open && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white  rounded-lg w-1/3">
                <div className="mb-4 py-2  flex bg-indigo-400 rounded">
                      <span className="text-2xl text-white flex px-12 justify-center font-medium flex-grow">Select Properties</span>
                      <button onClick={rentOnlycloseModal2} className="text-white font-bold text-xl px-3">
                      ✕
                    </button>
                    </div>
      
                  <div className="align-middle px-20 py-6 justify-center">
                    <div className="mb-4">
                      <div className="sm:col-span-3">
                        <label htmlFor="rentPropertyType" className="block text-sm font-medium leading-6 text-gray-900">
                          Property Types
                        </label>
                        <div className="mt-2">
                          <select
                            id="rentPropertyType"
                            name="rentPropertyType"
                            autoComplete="rentPropertyType-name"
                            onChange={rentHandleDropdownChange3}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option>House</option>
                            <option>Flats</option>
                            <option>Duplex</option>
                            <option>Shop</option>
                            <option>Farm House</option>
                            <option>Villa</option>
                            <option>Plot</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="sm:col-span-3">
                        <label htmlFor="rentTypes" className="block text-sm font-medium leading-6 text-gray-900">
                          selct Type
                        </label>
                        <div className="mt-2">
                          <select
                            id="rentTypes"
                            name="rentTypes"
                            autoComplete="rentTypes-name"
                            onChange={rentHandleDropdownChange4}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option>1 BHK</option>
                            <option>2 BHK</option>
                            <option>3 BHK</option>
                            <option>4 BHK</option>
                            <option>5 BHK</option>
                            <option>5+ BHK</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
  

                  <div className="px-20 pb-6">
                    <button onClick={rentCloseModal2} className="bg-indigo-500 text-white font-semibold px-5 mr-6 py-2 rounded hover:bg-indigo-700">
                      Next
                    </button>
                    </div>

  
                </div>
              </div>
            )}
            {rentModal3Open && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg w-1/3">
                <div className="mb-4 py-2  flex bg-indigo-400 rounded">
                      <span className="text-2xl text-white flex px-12 justify-center font-medium flex-grow">Select Budget</span>
                      <button onClick={rentCloseModal3} className="text-white font-bold text-xl px-3">
                      ✕
                    </button>
                    </div>
                  <div className="align-middle px-20 py-6  justify-center">
                    <div className="mb-4">
                      <div className="sm:col-span-3">
                        <label htmlFor="rentBudget" className="block text-sm font-medium leading-6 text-gray-900">
                          Budget
                        </label>
                        <div className="mt-2">
                          <select
                            id="rentBudget"
                            name="rentBudget"
                            autoComplete="rentBudget-name"
                            onChange={rentHandleDropdownChange5}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option>less than 5,000 </option>
                            <option>5,000 - 10,000 </option>
                            <option>10,000 - 15,000 </option>
                            <option>20,000  - 25,000 </option>
                            <option>25,000 - 40,000</option>
                            <option>40,000 - 50,000</option>
                            <option>50,000 - 70,000</option>
                            <option>70,000 - 1 Lac</option>
                            <option>more than 1 Lac</option>
                          </select>
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className="px-20 pb-6">
                  <Link to={"/explore"} className="bg-indigo-500 text-white px-4 mr-6 py-2 rounded hover:bg-indigo-700">
                    submit
                  </Link>
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellBuyRent;

