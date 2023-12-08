import React from "react";
import { Link, useNavigate } from "react-router-dom";
import StateData from "../../json/State_City.json";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const SellBuyRent = () => {
  const [database, setdatabase] = useState([]);
  const [city, setCity] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function getData() {
    const result = await fetch("http://localhost:5000/getData", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    var data = await result.json();
    setdatabase(data);
  }

  //Buy Properties
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [modal3Open, setModal3Open] = useState(false);

  const openModal = (propertyFor) => {
    localStorage.setItem("propertyFor", propertyFor);
    setModal1Open(true);
  };

  const onlycloseModal1 = () => {
    setModal1Open(false);
  };

  const onlycloseModal2 = () => {
    setModal2Open(false);
  };

  const closeModal3 = () => {
    setModal3Open(false);
  };

  const handleState = (e) => {
    const getStateId = e.target.value;
    const getCitydata = StateData.find(
      (state) => state.state_id === getStateId
    ).cities;
    setCity(getCitydata);
  };

  const [cd, setcd] = useState();
  const handleCity = (e) => {
    let City = document.getElementById("cities").value;
    const selectedCityName =
      city.find((getcity) => getcity.city_id === City)?.city_name || "";
    setcd(selectedCityName);
  };

  const clickHandler1 = async () => {
    let State = document.getElementById("state").value;
    let City = document.getElementById("cities").value;
    let area = document.getElementById("area").value;

    if (State !== "" && City !== "" && area !== "") {
      const selectedStateName =
        StateData.find((state) => state.state_id === State)?.state_name || "";
      const selectedCityName =
        city.find((getcity) => getcity.city_id === City)?.city_name || "";

      localStorage.setItem("State", JSON.stringify(selectedStateName));
      localStorage.setItem("Cities", JSON.stringify(selectedCityName));
      localStorage.setItem("Area", JSON.stringify(area));
    }

    setModal1Open(false);
    setModal2Open(true);
    setModal3Open(false);
  };

  const clickHandler2 = async () => {
    let propertyType = document.getElementById("propertyType").value;
    let type = document.getElementById("types").value;

    if (propertyType !== "" && type !== "") {
      localStorage.setItem("Property", JSON.stringify(propertyType));
      localStorage.setItem("Type", JSON.stringify(type));
    }

    setModal1Open(false);
    setModal2Open(false);
    setModal3Open(true);
  };

  const clickHandler3 = async () => {
    let budget = document.getElementById("budget").value;

    if (budget !== "") {
      localStorage.setItem("Budget", JSON.stringify(budget));
      navigate("/searchProperty");
    }
  };

  const stateData = JSON.parse(localStorage.getItem("State"));
  const citiesData = JSON.parse(localStorage.getItem("Cities"));
  const areaData = JSON.parse(localStorage.getItem("Area"));
  const propertyData = JSON.parse(localStorage.getItem("Property"));
  const typeData = JSON.parse(localStorage.getItem("Type"));
  const budgetData = JSON.parse(localStorage.getItem("Budget"));

  // Combine them into one object
  const combinedObject = {
    state: stateData,
    cities: citiesData,
    area: areaData,
    property: propertyData,
    type: typeData,
    budget: budgetData,
  };

  // Store the combined object back in localStorage
  localStorage.setItem("CombinedData", JSON.stringify(combinedObject));

  // Rent Properties
  const [rentModal1Open, setRentModal1Open] = useState(false);
  const [rentModal2Open, setRentModal2Open] = useState(false);
  const [rentModal3Open, setRentModal3Open] = useState(false);

  const rentOpenModal = (propertyFor) => {
    localStorage.setItem("propertyFor", propertyFor);
    setRentModal1Open(true);
  };

  const rentOnlycloseModal1 = () => {
    setRentModal1Open(false);
  };

  const rentOnlycloseModal2 = () => {
    setRentModal2Open(false);
  };

  const rentCloseModal3 = () => {
    setRentModal3Open(false);
  };

  const handleRentState = (e) => {
    const getStateId = e.target.value;
    const getCitydata = StateData.find(
      (state) => state.state_id === getStateId
    ).cities;
    setCity(getCitydata);
  };

  const [rcd, setrcd] = useState();
  const handleRentCity = (e) => {
    let City = document.getElementById("rentCities").value;
    const selectedCityName =
      city.find((getcity) => getcity.city_id === City)?.city_name || "";
    setrcd(selectedCityName);
  };

  const clickHandler4 = async () => {
    let State = document.getElementById("rentState").value;
    let City = document.getElementById("rentCities").value;
    let area = document.getElementById("rentArea").value;

    if (State !== "" && City !== "" && area !== "") {
      const selectedStateName =
        StateData.find((state) => state.state_id === State)?.state_name || "";
      const selectedCityName =
        city.find((getcity) => getcity.city_id === City)?.city_name || "";

      localStorage.setItem("RentState", JSON.stringify(selectedStateName));
      localStorage.setItem("RentCities", JSON.stringify(selectedCityName));
      localStorage.setItem("RentArea", JSON.stringify(area));
    }

    setRentModal1Open(false);
    setRentModal3Open(false);
    setRentModal2Open(true);
  };

  const clickHandler5 = async () => {
    let propertyType = document.getElementById("rentPropertyType").value;
    let type = document.getElementById("rentTypes").value;

    if (propertyType !== "" && type !== "") {
      localStorage.setItem("RentProperty", JSON.stringify(propertyType));
      localStorage.setItem("RentType", JSON.stringify(type));
    }

    setRentModal1Open(false);
    setRentModal2Open(false);
    setRentModal3Open(true);
  };

  const clickHandler6 = async () => {
    let budget = document.getElementById("rentBudget").value;

    if (budget !== "") {
      localStorage.setItem("RentBudget", JSON.stringify(budget));
      navigate("/searchProperty");
    }
  };

  const rentStateData = JSON.parse(localStorage.getItem("RentState"));
  const rentCitiesData = JSON.parse(localStorage.getItem("RentCities"));
  const rentAreaData = JSON.parse(localStorage.getItem("RentArea"));
  const rentPropertyData = JSON.parse(localStorage.getItem("RentProperty"));
  const rentTypeData = JSON.parse(localStorage.getItem("RentType"));
  const rentBudgetData = JSON.parse(localStorage.getItem("RentBudget"));

  // Combine them into one object
  const rentCombinedObject = {
    rentState: rentStateData,
    rentCities: rentCitiesData,
    rentArea: rentAreaData,
    rentProperty: rentPropertyData,
    rentType: rentTypeData,
    rentBudget: rentBudgetData,
  };

  // Store the combined object back in localStorage
  localStorage.setItem("RentCombinedData", JSON.stringify(rentCombinedObject));

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-4 py-6 mx-auto">
        <div className="lg:w-1/2 w-full mb-6">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
            Sell Buy Rent Properties
          </h1>
          <div className="h-1 w-20 bg-indigo-500 rounded"></div>
        </div>
        <div className="flex flex-wrap justify-center align-middle">
          <div className="p-4 lg:w-1/3 box">
            <Link to="/sell">
              <div className=" h-96  bg-blue-500 rounded-lg imgBox">
                <img
                  src={"BuyRentSell/sale-1.jpg"}
                  alt="Slide 1"
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
              <div className="content">
                <h2>Sell Properties</h2>
              </div>
            </Link>
          </div>

          <div className="p-4 lg:w-1/3 box">
            <button
              value="Sell"
              onClick={() => {
                openModal("Sell");
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              <div className=" h-96   rounded-lg imgBox">
                <img
                  src={"BuyRentSell/buy-7.png"}
                  alt="Slide 1"
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
              <div className="content">
                <h2>Buy Properties</h2>
              </div>
            </button>

            {modal1Open && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white  rounded-lg w-1/3">
                  <form onSubmit={handleSubmit(clickHandler1)}>
                    <div className="mb-4 py-2  flex bg-indigo-400 rounded">
                      <span className="text-2xl text-white flex px-12 justify-center font-medium flex-grow">
                        Select State And City
                      </span>
                      <button
                        onClick={onlycloseModal1}
                        className="text-white font-bold text-xl px-3"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="justify-center px-20 py-6">
                      <div className="mb-4">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="state"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            State :<span className="red text-base">*</span>
                          </label>
                          <div className="mt-2">
                            <select
                              id="state"
                              name="state"
                              autoComplete="state-name"
                              {...register("state", {
                                required: "State is required",
                              })}
                              onChange={(e) => handleState(e)}
                              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option value="" className="bg-white">
                                Select State
                              </option>
                              {StateData &&
                                StateData.map((getstate, index) => (
                                  <option
                                    className="bg-white"
                                    value={getstate.state_id}
                                    key={index}
                                  >
                                    {getstate.state_name}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <p className="text-sm text-red-500">
                          {errors.state?.message}
                        </p>
                      </div>

                      <div className="mb-4">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="cities"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            City :<span className="red text-base">*</span>
                          </label>
                          <div className="mt-2">
                            <select
                              id="cities"
                              name="cities"
                              autoComplete="cities-name"
                              {...register("cities", {
                                required: "City is required",
                              })}
                              onChange={(e) => handleCity(e)}
                              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option className="bg-white" value="">
                                Select City
                              </option>
                              {city &&
                                city.map((getcity, index) => (
                                  <option
                                    className="bg-white"
                                    value={getcity.city_id}
                                    key={index}
                                  >
                                    {getcity.city_name}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <p className="text-sm text-red-500">
                          {errors.cities?.message}
                        </p>
                      </div>

                      <div className="mb-4">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="area"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Area :<span className="red text-base">*</span>
                          </label>
                          <div className="mt-2">
                            <select
                              id="area"
                              name="area"
                              autoComplete="area-name"
                              {...register("area", {
                                required: "Area is required",
                              })}
                              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option value="">Select Area</option>
                              {database
                                ? database.map((propertyAreaDetail, index) => {
                                    if (propertyAreaDetail.City === cd) {
                                      return (
                                        <option value={propertyAreaDetail.zone}>
                                          {propertyAreaDetail.zone}
                                        </option>
                                      );
                                    }
                                  })
                                : "No Areas"}
                            </select>
                          </div>
                        </div>
                        <p className="text-sm text-red-500">
                          {errors.area?.message}
                        </p>
                      </div>
                    </div>

                    <div className="px-20 pb-6">
                      <button className="bg-indigo-500 text-white font-semibold px-5 px-2 mr-6 py-2 rounded hover:bg-indigo-700">
                        Next
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {modal2Open && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg w-1/3">
                  <form onSubmit={handleSubmit(clickHandler2)}>
                    <div className="mb-4 py-2  flex bg-indigo-400 rounded">
                      <span className="text-2xl text-white flex px-12 justify-center font-medium flex-grow">
                        Select Properties
                      </span>
                      <button
                        onClick={onlycloseModal2}
                        className="text-white font-bold text-xl px-3"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="align-middle justify-center px-20 py-6">
                      <div className="mb-4">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="propertyType"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Property Type :
                            <span className="red text-base">*</span>
                          </label>
                          <div className="mt-2">
                            <select
                              id="propertyType"
                              name="propertyType"
                              autoComplete="propertyType-name"
                              {...register("propertyType", {
                                required: "Property Type is required",
                              })}
                              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option value="">Select Type</option>
                              <option value="Flats/Apartments">
                                Flats/Apartments
                              </option>
                              <option value="Residential Plot">
                                Residential Plot
                              </option>
                              <option value="Office Space">Office Space</option>
                              <option value="Farm House">Farm House</option>
                              <option value="Commercial plots">
                                Commercial plots
                              </option>
                            </select>
                          </div>
                        </div>
                        <p className="text-sm text-red-500">
                          {errors.propertyType?.message}
                        </p>
                      </div>

                      <div className="mb-4">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="types"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            House Type :<span className="red text-base">*</span>
                          </label>
                          <div className="mt-2">
                            <select
                              id="types"
                              name="types"
                              autoComplete="types-name"
                              {...register("types", {
                                required: "House type is required",
                              })}
                              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option value="">Select BHK</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </select>
                          </div>
                        </div>
                        <p className="text-sm text-red-500">
                          {errors.types?.message}
                        </p>
                      </div>
                    </div>

                    <div className="px-20 pb-6">
                      <button className="bg-indigo-500 text-white font-semibold px-5 mr-6 py-2 rounded hover:bg-indigo-700">
                        Next
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {modal3Open && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white  rounded-lg w-1/3">
                  <form onSubmit={handleSubmit(clickHandler3)}>
                    <div className="mb-4 py-2  flex bg-indigo-400 rounded">
                      <span className="text-2xl text-white flex px-12 justify-center font-medium flex-grow">
                        Select Budget
                      </span>
                      <button
                        onClick={closeModal3}
                        className="text-white font-bold text-xl px-3"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="align-middle justify-center px-20 py-6">
                      <div className="mb-4">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="budget"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Budget :<span className="red text-base">*</span>
                          </label>
                          <div className="mt-2">
                            <select
                              id="budget"
                              name="budget"
                              autoComplete="budget-name"
                              {...register("budget", {
                                required: "Budget is required",
                              })}
                              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option value="">Select Budget</option>
                              <option value="500000 - 1000000">
                                500000 - 1000000
                              </option>
                              <option value="1000000 - 2000000">
                                1000000 - 2000000
                              </option>
                              <option value="2000000 - 3000000">
                                2000000 - 3000000
                              </option>
                              <option value="3000000 - 4000000">
                                3000000 - 4000000
                              </option>
                              <option value="4000000 - 5000000">
                                4000000 - 5000000
                              </option>
                              <option value="5000000 - 7000000">
                                5000000 - 7000000
                              </option>
                              <option value="7000000 - 9000000">
                                7000000 - 9000000
                              </option>
                              <option value="9000000 - 10000000">
                                9000000 - 10000000
                              </option>
                            </select>
                          </div>
                        </div>
                        <p className="text-sm text-red-500">
                          {errors.budget?.message}
                        </p>
                      </div>
                    </div>

                    <div className="px-20 pb-6">
                      <button className="bg-indigo-500 text-white px-4 mr-6 py-2 rounded hover:bg-indigo-700">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 lg:w-1/3 box">
            <button
              onClick={() => {
                rentOpenModal("Rent");
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              <div className=" h-96 rounded-lg imgBox">
                <img
                  src={"BuyRentSell/rent-5.png"}
                  alt="Slide 1"
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
              <div className="content">
                <h2>Rent Properties</h2>
              </div>
            </button>

            {rentModal1Open && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white  rounded-lg w-1/3">
                  <form onSubmit={handleSubmit(clickHandler4)}>
                    <div className="mb-4 py-2  flex bg-indigo-400 rounded">
                      <span className="text-2xl text-white flex px-12 justify-center font-medium flex-grow">
                        Select State And City
                      </span>
                      <button
                        onClick={rentOnlycloseModal1}
                        className="text-white font-bold text-xl px-3"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="align-middle px-20 py-6 justify-center">
                      <div className="mb-4">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="rentState"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            State :<span className="red text-base">*</span>
                          </label>
                          <div className="mt-2">
                            <select
                              id="rentState"
                              name="rentState"
                              autoComplete="rentState-name"
                              {...register("rentState", {
                                required: "State is required",
                              })}
                              onChange={(e) => handleRentState(e)}
                              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option value="" className="bg-white">
                                Select State
                              </option>
                              {StateData &&
                                StateData.map((getstate, index) => (
                                  <option
                                    className="bg-white"
                                    value={getstate.state_id}
                                    key={index}
                                  >
                                    {getstate.state_name}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <p className="text-sm text-red-500">
                          {errors.rentState?.message}
                        </p>
                      </div>

                      <div className="mb-4">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="rentCities"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            City :<span className="red text-base">*</span>
                          </label>
                          <div className="mt-2">
                            <select
                              id="rentCities"
                              name="rentCities"
                              autoComplete="rentCities-name"
                              {...register("rentCities", {
                                required: "City is required",
                              })}
                              onChange={(e) => handleRentCity(e)}
                              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option className="bg-white" value="">
                                Select City
                              </option>
                              {city &&
                                city.map((getcity, index) => (
                                  <option
                                    className="bg-white"
                                    value={getcity.city_id}
                                    key={index}
                                  >
                                    {getcity.city_name}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <p className="text-sm text-red-500">
                          {errors.rentCities?.message}
                        </p>
                      </div>

                      <div className="mb-4">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="rentArea"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Area :<span className="red text-base">*</span>
                          </label>
                          <div className="mt-2">
                            <select
                              id="rentArea"
                              name="rentArea"
                              autoComplete="rentArea-name"
                              {...register("rentArea", {
                                required: "Area is required",
                              })}
                              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option value="">Select Area</option>
                              {database
                                ? database.map((propertyAreaDetail, index) => {
                                    if (propertyAreaDetail.City === rcd) {
                                      return (
                                        <option value={propertyAreaDetail.zone}>
                                          {propertyAreaDetail.zone}
                                        </option>
                                      );
                                    }
                                  })
                                : "No Areas"}
                            </select>
                          </div>
                        </div>
                        <p className="text-sm text-red-500">
                          {errors.rentArea?.message}
                        </p>
                      </div>
                    </div>

                    <div className="px-20 pb-6">
                      <button className="bg-indigo-500 text-white font-semibold px-5 mr-6 py-2 rounded hover:bg-indigo-700">
                        Next
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {rentModal2Open && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white  rounded-lg w-1/3">
                  <form onSubmit={handleSubmit(clickHandler5)}>
                    <div className="mb-4 py-2  flex bg-indigo-400 rounded">
                      <span className="text-2xl text-white flex px-12 justify-center font-medium flex-grow">
                        Select Properties
                      </span>
                      <button
                        onClick={rentOnlycloseModal2}
                        className="text-white font-bold text-xl px-3"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="align-middle px-20 py-6 justify-center">
                      <div className="mb-4">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="rentPropertyType"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Property Type :
                            <span className="red text-base">*</span>
                          </label>
                          <div className="mt-2">
                            <select
                              id="rentPropertyType"
                              name="rentPropertyType"
                              autoComplete="rentPropertyType-name"
                              {...register("rentPropertyType", {
                                required: "Property Type is required",
                              })}
                              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option value="">Select Type</option>
                              <option value="Flats/Apartments">
                                Flats/Apartments
                              </option>
                              <option value="Residential Plot">
                                Residential Plot
                              </option>
                              <option value="Office Space">Office Space</option>
                              <option value="Farm House">Farm House</option>
                              <option value="Commercial plots">
                                Commercial plots
                              </option>
                            </select>
                          </div>
                        </div>
                        <p className="text-sm text-red-500">
                          {errors.rentPropertyType?.message}
                        </p>
                      </div>

                      <div className="mb-4">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="rentTypes"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            House Type :<span className="red text-base">*</span>
                          </label>
                          <div className="mt-2">
                            <select
                              id="rentTypes"
                              name="rentTypes"
                              autoComplete="rentTypes-name"
                              {...register("rentTypes", {
                                required: "House type is required",
                              })}
                              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option value="">Select BHK</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </select>
                          </div>
                        </div>
                        <p className="text-sm text-red-500">
                          {errors.rentTypes?.message}
                        </p>
                      </div>
                    </div>

                    <div className="px-20 pb-6">
                      <button className="bg-indigo-500 text-white font-semibold px-5 px-2 mr-6 py-2 rounded hover:bg-indigo-700">
                        Next
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {rentModal3Open && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg w-1/3">
                  <form onSubmit={handleSubmit(clickHandler6)}>
                    <div className="mb-4 py-2  flex bg-indigo-400 rounded">
                      <span className="text-2xl text-white flex px-12 justify-center font-medium flex-grow">
                        Select Budget
                      </span>
                      <button
                        onClick={rentCloseModal3}
                        className="text-white font-bold text-xl px-3"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="align-middle px-20 py-6  justify-center">
                      <div className="mb-4">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="rentBudget"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Budget :<span className="red text-base">*</span>
                          </label>
                          <div className="mt-2">
                            <select
                              id="rentBudget"
                              name="rentBudget"
                              autoComplete="rentBudget-name"
                              {...register("rentBudget", {
                                required: "Budget is required",
                              })}
                              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option value="">Select Budget</option>
                              <option value="3000 - 5000">3000 - 5000</option>
                              <option value="5000 - 10000">5000 - 10000</option>
                              <option value="10000 - 15000">
                                10000 - 15000
                              </option>
                              <option value="15000 - 20000">
                                15000 - 20000
                              </option>
                              <option value="20000 - 25000">
                                20000 - 25000
                              </option>
                              <option value="25000 - 40000">
                                25000 - 40000
                              </option>
                              <option value="40000 - 50000">
                                40000 - 50000
                              </option>
                              <option value="50000 - 70000">
                                50000 - 70000
                              </option>
                              <option value="70000 - 100000">
                                70000 - 100000
                              </option>
                            </select>
                          </div>
                          <p className="text-sm text-red-500">
                            {errors.rentBudget?.message}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="px-20 pb-6">
                      <button className="bg-indigo-500 text-white px-4 mr-6 py-2 px-2 rounded hover:bg-indigo-700">
                        Submit
                      </button>
                    </div>
                  </form>
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
