import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import stateData from '../json/State_City.json';
import './sell.css'

export default function () {
  const [stateid, setStateid] = useState("");
  const [city, setCity] = useState([]);
  const [cityid, setCityid] = useState("");

  const [society, setSociety] = useState("");
  const [zone, setZone] = useState("");
  const [pincode, setPincode] = useState("");
  const [area, setArea] = useState("");
  const [price, setPrice] = useState("");

  const handleState = (e) => {
    const getStateId = e.target.value;
    setStateid(getStateId);
    const getCitydata = stateData.find(state => state.state_id === getStateId).cities;
    setCity(getCitydata);
  }

  const handleCity = (e) => {
    const cityid = e.target.value;
    setCityid(cityid);
  }

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    let radBtnDefault = document.getElementById("sellFor1");
    radBtnDefault.checked = true;
    if (!auth) {
      navigate("/login");
    }
  }, []);
  
  const [disable, setDisable] = useState(true);

  const clickHandler = async () => {
    var propertyFor = document.querySelector('input[name="propertyFor"]:checked');
    var selectedValue = null;
    if (propertyFor) {
      selectedValue = propertyFor.value;
    }

    let State = document.getElementById('State').value;
    let City = document.getElementById('City').value;
    let type = document.getElementById('type').value;
    let rooms = document.getElementById('rooms').value;
    let seller = JSON.parse(localStorage.getItem("user")) || {};
    let sellerId = seller._id;
    let owner = seller.username;


    if (selectedValue !== '' && type !== '' && State !== '' && City !== '' && society !== '' && zone !== '' && pincode !== '' && area !== '' && price !== '' && rooms !== '') {
      const selectedStateName = stateData.find((state) => state.state_id === State)?.state_name || '';
      const selectedCityName = city.find((getcity) => getcity.city_id === City)?.city_name || '';

      localStorage.setItem('PropertyDetails',
        JSON.stringify({
          selectedValue, type, State: selectedStateName, City: selectedCityName, society, zone, pincode, area, price, rooms, sellerId,owner
        })
      );

      // setSociety("");
      // setZone("");
      // setPincode("");
      // setArea("");
      // setPrice("");

      setDisable(false)
      toast.success('Congratulations! Information Stored...', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else if (selectedValue === '' || type === '' || State === '' || City === '' || society === '' || zone === '' || pincode === '' || area === '' || price === '' || rooms === '') {
      toast.warning('Attention! Information not Sufficient...', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else {
      toast.error('Oops! Information Crashed...', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  
  return (
    <div id='mainDiv' className='bg-center bg-no-repeat bg-cover'>
      <div className="main-block">
        <div className="left-part">
          <i className="fa fa-house-laptop text-[7em] text-sellIcon"></i> <br /> <br />
          <h1 id="leftHeading"> Sell Your Property</h1> <br /> <br />
          <p className='sellText'> With this platform you can sell your precious property virtually. Save your time and get high amount of money...</p>
          <div>
            <Link className="btn-item" to="/about">Explore Us</Link>
          </div>
        </div>

        <form id='sellForm' onSubmit={handleSubmit(clickHandler)}>
          <div className="title">
            <i className="fas fa-pencil-alt text-[1.8em] text-sellIcon"></i>  &ensp;
            <h2 id='rightHeading'>Property Info And Location</h2>
          </div>
          <br />
          <div className="information">
            <div>
              <div>
                <label id='radio'> Property For:* </label> &emsp;
                <label id='radio'>
                  <input
                    type="radio"
                    id='sellFor1'
                    name="propertyFor"
                    value="Sell"
                    
                    className='sellField'
                    {...register("propertyFor", {
                      required: {
                        value: true,
                        message: "Property for is required"
                      },
                    })}
                  />
                  Sell
                </label> &emsp;
                <label id='radio'>
                  <input
                    type="radio"
                    id='sellFor'
                    name="propertyFor"
                    value="Rent"
                    className='sellField'
                    {...register("propertyFor", {
                      required: {
                        value: true,
                        message: "Property for is required"
                      },
                    })}
                  />
                  Rent
                </label> &emsp;
                <label id='radio'>
                  <input
                    type="radio"
                    id='sellFor'
                    name="propertyFor"
                    value="PG"
                    className='sellField'
                    {...register("propertyFor", {
                      required: {
                        value: true,
                        message: "Property for is required"
                      },
                    })}
                  />
                  PG
                </label>
              </div>
              <p className="text-sm text-red-500">{errors.propertyFor?.message}</p>
            </div>

            <div>
              <div>
                <label> Type of Property:* </label>
                <select
                  id="type"
                  {...register("type", {
                    required: 'Type of property is required'
                  })}
                >
                  <option id='propOpt' value=''>
                    Select Type
                  </option>
                  <option id='propOpt' value="Flats/Apartments">
                    Flats/Apartments
                  </option>
                  <option id='propOpt' value="Residential Plot">
                    Residential Plot
                  </option>
                  <option id='propOpt' value="Office Space">
                    Office Space
                  </option>
                  <option id='propOpt' value="Farm House">
                    Farm House
                  </option>
                  <option id='propOpt' value="Commercial plots">
                    Commercial plots
                  </option>
                </select>
              </div>
              <p className="text-sm text-red-500">{errors.type?.message}</p>
            </div>
            <br />

            <h1 id='markLabel'> --- Landmark --- </h1> <br />
            <div>
              <div className='text-dark'>
                <label className="form-label">
                  State:* &ensp;
                </label>
                <select
                  name='State'
                  className='sellField form-control'
                  id="State"
                  {...register("State", {
                    required: "State is required"
                  })}
                  onChange={(e) => handleState(e)}
                >
                  <option
                    className='propOtp bg-black'
                    value=""> Select State </option>
                  {
                    stateData.map((getstate, index) => (
                      <option
                        className='bg-black'
                        value={getstate.state_id}
                        key={index}
                      >
                        {
                          getstate.state_name
                        }
                      </option>
                    ))
                  }
                </select>
              </div>
              <p className="text-sm text-red-500">{errors.State?.message}</p>
            </div>

            <div>
              <div className='text-dark'>
                <label className="form-label">
                  City:* &ensp;
                </label>
                <select
                  name='City'
                  className='sellField form-control ml-2'
                  id='City'
                  {...register("City", {
                    required: "City is required"
                  })}
                  onChange={(e) => handleCity(e)}
                >
                  <option
                    className='propOtp bg-black'
                    value=""
                  > Select City </option>
                  {city &&
                    city.map((getcity, index) => (
                      <option
                        className='bg-black'
                        value={getcity.city_id}
                        key={index}
                      >
                        {
                          getcity.city_name
                        }
                      </option>
                    ))
                  }
                </select>
              </div>
              <p className="text-sm text-red-500">{errors.City?.message}</p>
            </div>

            <div>
              <label>
                Apartment/Society:* &ensp;
              </label>
              <input
                type="text"
                name="society"
                className='sellField'
                id="society"
                placeholder='Name Of Apartment/Society'
                style={{ 'width': '40%' }}
                value={society}
                {...register("society", {
                  required: "Society/Apartment is required"
                })}
                onChange={(e) => {
                  setSociety(e.target.value);
                }}
              />
              <p className="text-sm text-red-500">{errors.society?.message}</p>
            </div>

            <div>
              <label>
                Area:* &ensp;
              </label>
              <input type="text"
                name="zone"
                className='sellField'
                id="zone"
                placeholder='Enter Area/Landmark'
                value={zone}
                {...register("zone", {
                  required: "Area/Landmark is required"
                })}
                onChange={(e) => {
                  setZone(e.target.value);
                }}
              />
              <p className="text-sm text-red-500">{errors.zone?.message}</p>
            </div>

            <div>
              <label> Pincode:* &ensp; </label>
              <input
                type="text"
                name='pincode'
                className='sellField'
                id="pincode"
                placeholder='Enter 6 digit Pincode'
                value={pincode}
                {...register("pincode", {
                  required: "Pincode is required",
                  maxLength: {
                    value: 6,
                    message: "Pincode no. exceed only 6 digits",
                  },
                  pattern: {
                    value: /^\d+(?:[.,]\d+)*$/,
                    message: "Pincode contains digits only",
                  },
                  pattern: {
                    value: /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/,
                    message: "Pincode is not valid"
                  },
                })}
                onChange={(e) => {
                  setPincode(e.target.value);
                }}
              />
              <p className="text-sm text-red-500">{errors.pincode?.message}</p>
            </div>
            <br />
            <br />

            <h1 id='markLabel'> --- Property Feature & Price --- </h1> <br />
            <div>
              <label> Plot/Land Area (in m<sup>2</sup>):*  &ensp; </label>
              <input
                type="text"
                name='area'
                className='sellField'
                id="area"
                placeholder='Plot/Land Area in Sq.meter'
                style={{ 'width': '40%' }}
                value={area}
                {...register("area", {
                  required: "Plot/Land Area is required",
                  pattern: {
                    value: /^\d+(?:[.,]\d+)*$/,
                    message: "Area contains digits only",
                  },
                })}
                onChange={(e) => {
                  setArea(e.target.value);
                }}
              />
              <p className="text-sm text-red-500">{errors.area?.message}</p>
            </div>

            <div>
              <div>
                <label>
                  No. of Bedrooms:* &ensp;
                </label>
                <select
                  id="rooms"
                  {...register("rooms", {
                    required: 'No. of rooms is required'
                  })}
                >
                  <option id='room' value=''>
                    Select
                  </option>
                  <option id="room" value="1">
                    1
                  </option>
                  <option id="room" value="2">
                    2
                  </option>
                  <option id="room" value="3">
                    3
                  </option>
                  <option id="room" value="4">
                    More
                  </option>
                </select>
              </div>
              <p className="text-sm text-red-500">{errors.rooms?.message}</p>
            </div>

            <div>
              <label>
                Expected Price (&#8377;):* &ensp;
              </label>
              <input
                type="text"
                name='price'
                className='sellField'
                id="price"
                placeholder='Enter Total Price in INR'
                style={{ 'width': '40%' }}
                value={price}
                {...register("price", {
                  required: "Expected Price is required",
                  pattern: {
                    value: /^\d+(?:[.,]\d+)*$/,
                    message: "Price contains digits only",
                  },
                })}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
              <p className="text-sm text-red-500">{errors.price?.message}</p>
            </div>
            <br />
          </div>

          <button id='saveBtn'>
            Save
          </button>

          <Link to="/addProperty">
            <button
              id="btn"
              className={disable ? 'notCon' : 'con'}
              disabled={disable}>
              Continue
            </button>
          </Link>

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </form>
      </div>
    </div>
  );
};