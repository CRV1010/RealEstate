import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import stateData from "./../json/State_City.json";
import "./sell.css";

export default function () {
  const params = useParams();
  var id = params.id;

  const [pd, setPd] = useState({});
  const [city, setCity] = useState([]);

  const StateId = stateData.find((state) => state.state_name === pd.State)?.state_id || ''; // return state_id
  const CityId = city.find((getcity) => getcity.city_name === pd.City)?.city_id || '';

  const [stateid, setStateid] = useState("");
  const [cityid, setCityid] = useState("");

  const [propertyFor, setPropertyFor] = useState("");
  const [society, setSociety] = useState(pd.society);
  const [zone, setZone] = useState(pd.zone);
  const [pincode, setPincode] = useState(pd.pincode);
  const [area, setArea] = useState(pd.area);
  const [price, setPrice] = useState(pd.price);

  const navigate = useNavigate();

  useEffect(() => {
    if (!pd) {
      navigate("/sell");
    }
    getProperty();
  }, [id]);

  useEffect(() => {
    if (pd) {
      setStateid(StateId);
      setCityid(CityId);
      setPropertyFor(pd.propertyFor);
      setSociety(pd.society);
      setZone(pd.zone);
      setPincode(pd.pincode);
      setArea(pd.area);
      setPrice(pd.price);
    }
  }, [pd, StateId, CityId]);

  const handleState = (e) => {
    const getStateId = e.target.value;
    setStateid(getStateId);
    const getCitydata = stateData.find(
      (state) => state.state_id === getStateId
    ).cities;
    setCity(getCitydata);
  };

  const handleCity = (e) => {
    const cityid = e.target.value;
    setCityid(cityid);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (StateId !== "") {
      const getCitydata =
        stateData.find((state) => state.state_id === StateId)?.cities || [];
      setCity(getCitydata);
    }
  }, [StateId]);

  const [disable, setDisable] = useState(true);

  const getProperty = async () => {
    const result = await fetch(`http://localhost:5000/getPropertyDetails`, {
      method: "post",
      body: JSON.stringify({ _id: id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    var data = await result.json();
    let pd = data[0];
    setPd(pd);

    if (pd.propertyFor === "Sell")
      document.getElementById("sellFor1").checked = pd.propertyFor;
    else if (pd.propertyFor === "Rent")
      document.getElementById("sellFor2").checked = pd.propertyFor;
    else
      document.getElementById("sellFor3").checked = pd.propertyFor;

    document.getElementById("type").value = pd.type;
    document.getElementById("rooms").value = pd.rooms;

    localStorage.setItem("propDetails", JSON.stringify(pd));
  };

  const clickHandler = async (e) => {
    var propertyFor = document.querySelector(
      'input[name="propertyFor"]:checked'
    );
    var selectedValue = null;
    if (propertyFor) {
      selectedValue = propertyFor.value;
    }

    let State = document.getElementById("State").value; // return id as value
    let City = document.getElementById("City").value; // return id as value
    let type = document.getElementById("type").value; // return name as value
    let rooms = document.getElementById("rooms").value; // return name as value
    let seller = JSON.parse(localStorage.getItem("user")) || {};
    let sellerId = seller._id;

    if (
      selectedValue !== "" &&
      type !== "" &&
      State !== "" &&
      City !== "" &&
      society !== "" &&
      zone !== "" &&
      pincode !== "" &&
      area !== "" &&
      price !== "" &&
      rooms !== ""
    ) {
      // we should convert _id's to _name's for storing local storge bcoz we get _id's.
      const selectedStateName =
        stateData.find((state) => state.state_id === State)?.state_name || "";
      const selectedCityName =
        city.find((getcity) => getcity.city_id === City)?.city_name || "";

      localStorage.setItem(
        "PropertyDetails",
        JSON.stringify({
          selectedValue,
          type,
          State: selectedStateName,
          City: selectedCityName,
          society,
          zone,
          pincode,
          area,
          price,
          rooms,
          sellerId,
        })
      );

      setDisable(false);

      toast.success("Congratulations! Information Stored...", {
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
    } else if (
      selectedValue === "" ||
      type === "" ||
      State === "" ||
      City === "" ||
      society === "" ||
      zone === "" ||
      pincode === "" ||
      area === "" ||
      price === "" ||
      rooms === ""
    ) {
      toast.warning("Attention! Information not Sufficient...", {
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
    } else {
      toast.error("Oops! Information Crashed...", {
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
    <div id="mainDiv" className="bg-center bg-no-repeat bg-cover">
      <div className="main-block">
        <div className="left-part">
          <i className="fa fa-house-laptop text-[7em] text-sellIcon"></i> <br />{" "}
          <br />
          <h1 id="leftHeading"> Sell Your Property</h1> <br /> <br />
          <p className="sellText">
            {" "}
            With this platform you can sell your precious property virtually.
            Save your time and get high amount of money...
          </p>
          <div>
            <Link className="btn-item" to="/about">
              Explore Us
            </Link>
          </div>
        </div>

        <form id="sellForm" onSubmit={handleSubmit(clickHandler)}>
          <div className="title">
            <i className="fas fa-pencil-alt text-[1.8em] text-sellIcon"></i>{" "}
            &ensp;
            <h2 id="rightHeading">Property Info And Location</h2>
          </div>
          <br />
          <div className="information">
            <div>
              <div>
                <label id="radio">
                  {" "}
                  Property For :<span className="red">*</span>{" "}
                </label>{" "}
                &emsp;
                <label id="radio">
                  {" "}
                  <input
                    type="radio"
                    id="sellFor1"
                    name="propertyFor"
                    value="Sell"
                    className="sellField"
                    {...register("propertyFor", {
                      required: {
                        value: true,
                        message: "Property for is required",
                      },
                    })}
                    onChange={() =>
                      setPropertyFor("Sell")
                    }
                  />{" "}
                  Sell{" "}
                </label>{" "}
                &emsp;
                <label id="radio">
                  {" "}
                  <input
                    type="radio"
                    id="sellFor2"
                    name="propertyFor"
                    value="Rent"
                    className="sellField"
                    {...register("propertyFor", {
                      required: {
                        value: true,
                        message: "Property for is required",
                      },
                    })}
                    onChange={() =>
                      setPropertyFor("Rent")
                    }
                  />{" "}
                  Rent{" "}
                </label>{" "}
                &emsp;
                <label id="radio">
                  {" "}
                  <input
                    type="radio"
                    id="sellFor3"
                    name="propertyFor"
                    value="PG"
                    className="sellField"
                    {...register("propertyFor", {
                      required: {
                        value: true,
                        message: "Property for is required",
                      },
                    })}
                    onChange={() =>
                      setPropertyFor("PG")
                    }
                  />{" "}
                  PG{" "}
                </label>
              </div>
              <p className="text-sm text-red-500">
                {errors.propertyFor?.message}
              </p>
            </div>
            <div>
              <div>
                <label>
                  {" "}
                  Type of Property :<span className="red">*</span>{" "}
                </label>
                <select
                  id="type"
                  style={{ 'width': '40%' }}
                  {...register("type", {
                    value: true,
                    required: 'Type of property is required'
                  })}
                >
                  <option id="propOpt" value="">
                    Select Type
                  </option>
                  <option id="propOpt" value="Flats/Apartments">
                    Flats/Apartments
                  </option>
                  <option id="propOpt" value="Residential Plot">
                    Residential Plot
                  </option>
                  <option id="propOpt" value="Office Space">
                    Office Space
                  </option>
                  <option id="propOpt" value="Farm House">
                    Farm House
                  </option>
                  <option id="propOpt" value="Commercial plots">
                    Commercial plots
                  </option>
                </select>
              </div>
              <p className="text-sm text-red-500">{errors.type?.message}</p>
            </div>
            <br />
            <h1 id="markLabel"> --- Landmark --- </h1> <br />
            <div>
              <div className="text-dark">
                <label className="form-label">
                  State :<span className="red">*</span> &ensp;
                </label>
                <select
                  name="State"
                  className="sellField form-control"
                  id="State"
                  value={stateid}
                  {...register("State", {
                    value: true,
                    required: "State is required"
                  })}
                  onChange={(e) => handleState(e)}
                >
                  <option
                    className='propOtp bg-black'
                    value=""
                  >
                    Select State
                  </option>
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
              <div className="text-dark">
                <label className="form-label">
                  City :<span className="red">*</span> &ensp;
                </label>
                <select
                  name='City'
                  className='sellField form-control ml-2'
                  style={{ 'width': '45%' }}
                  id='City'
                  {...register("City", {
                    value: true,
                    required: "City is required"
                  })}
                  onChange={(e) => handleCity(e)}
                  value={cityid}
                >
                  <option className="propOtp bg-black" value="">
                    Select City
                  </option>
                  {city &&
                    city.map((getcity, index) => (
                      <option
                        className="bg-black"
                        value={getcity.city_id}
                        key={index}
                      >
                        {getcity.city_name}
                      </option>
                    ))}
                </select>
              </div>
              <p className="text-sm text-red-500">{errors.City?.message}</p>
            </div>
            <div>
              <label>
                Area/Society :<span className="red">*</span> &ensp;
              </label>
              <input
                type="text"
                name="zone"
                className="sellField"
                id="zone"
                placeholder="Enter Area & Society"
                value={zone}
                {...register("zone", {
                  value: true,
                  required: "Area & Society is required"
                })}
                onChange={(e) => {
                  setZone(e.target.value);
                }}
              />
              <p className="text-sm text-red-500">{errors.zone?.message}</p>
            </div>
            <div>
              <label>
                Flat no./Apartment/Street no. :<span className="red">*</span>{" "}
                &ensp;
              </label>
              <input
                type="text"
                name="society"
                className="sellField"
                id="society"
                placeholder="Enter Flat/Apartment/Street"
                style={{ width: "40%" }}
                value={society}
                {...register("society", {
                  value: true,
                  required: "Flat/Apartment/Street is required"
                })}
                onChange={(e) => {
                  setSociety(e.target.value);
                }}
              />
              <p className="text-sm text-red-500">{errors.society?.message}</p>
            </div>
            <div>
              <label>
                {" "}
                Pincode :<span className="red">*</span> &ensp;{" "}
              </label>
              <input
                type="text"
                name="pincode"
                className="sellField"
                id="pincode"
                placeholder="Enter 6 digit Pincode"
                value={pincode}
                {...register("pincode", {
                  value: true,
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
                    message: "Pincode is not valid",
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
            <h1 id="markLabel"> --- Property Feature & Price --- </h1> <br />
            <div>
              <label>
                {" "}
                Plot/Land Area (in m<sup>2</sup>) :
                <span className="red">*</span> &ensp;{" "}
              </label>
              <input
                type="text"
                name="area"
                className="sellField"
                id="area"
                placeholder="Plot/Land Area in Sq.meter"
                style={{ width: "40%" }}
                value={area}
                {...register("area", {
                  value: true,
                  required: "Plot/Land Area is required",
                  pattern: {
                    value: /^\d+(?:[.,]\d+)*$/,
                    message: "Area contains digits only",
                  },
                  validate: {
                    notZero: (value) => value !== "0" || "Area is not zero",
                    // greaterThan50: (value) => parseFloat(value) > 50 || "Area must be greater than 50 sqmtr",
                    // lessThan10000: (value) => parseFloat(value) < 10000 || "Area must be less than 10000 sqmtr",
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
                  No. of Bedrooms :<span className="red">*</span> &ensp;
                </label>
                <select
                  id="rooms"
                  {...register("rooms", {
                    value: true,
                    required: 'No. of rooms is required'
                  })}
                >
                  <option id="room" value="">
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
                Expected Price (&#8377;) :<span className="red">*</span> &ensp;
              </label>
              <input
                type="text"
                name="price"
                className="sellField"
                id="price"
                placeholder="Enter Total Price in INR"
                style={{ width: "40%" }}
                value={price}
                {...register("price", {
                  value: true,
                  required: "Expected Price is required",
                  pattern: {
                    value: /^\d+(?:[.,]\d+)*$/,
                    message: "Price contains digits only",
                  },
                  validate: {
                    notZero: (value) => value !== "0" || "Price is not zero",
                    // greaterThan5000: (value) => parseFloat(value) >= 5000 || "Price must be greater than 5000.",
                    // lessThan10000000: (value) => parseFloat(value) <= 10000000 || "Price must be less than 1,00,00,000.",
                    priceBasedOnProperty: (value) => {
                      if (propertyFor === "Sell") {
                        return parseFloat(value) >= 100000 &&
                          parseFloat(value) <= 10000000
                          ? true
                          : "Price must be greater than 1,00,000 and less than 1,00,00,000 for Selling.";
                      } else if (propertyFor === "Rent") {
                        return parseFloat(value) >= 5000 &&
                          parseFloat(value) <= 100000
                          ? true
                          : "Price must be greater than 5,000 and less than 1,00,000 for Renting.";
                      } else if (propertyFor === "PG") {
                        return parseFloat(value) >= 5000 &&
                          parseFloat(value) <= 20000
                          ? true
                          : "Price must be greater than 5,000 and less than 20,000 for PG.";
                      }
                    },
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

          <button id="saveBtn"> Save </button>

          <Link to="/updateProperty2">
            <button
              id="btn"
              className={disable ? "notCon" : "con"}
              disabled={disable}
            >
              {" "}
              Continue{" "}
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

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useForm } from "react-hook-form";
// import stateData from './../json/State_City.json';
// import "./sell.css";

// export default function () {
//   const [stateid, setStateid] = useState("");
//   const [city, setCity] = useState([]);
//   const [cityid, setCityid] = useState("");

//   const params = useParams();
//   var id = params.id;
//   console.log("upcid",id);
//   const auth = JSON.parse(localStorage.getItem("PropertyDetails"));

//   //  console.log(CityId);
//    var StateId;
//    var CityId;
//   const [society, setSociety] = useState("");
//   const [zone, setZone] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [area, setArea] = useState("");
//   const [price, setPrice] = useState("");

//   const navigate = useNavigate();

//   const handleState = (e) => {
//     const getStateId = e.target.value;
//     setStateid(getStateId);
//     const getCitydata = stateData.find(state => state.state_id === getStateId).cities;
//     setCity(getCitydata);
//   }

//   const handleCity = (e) => {
//     const cityid = e.target.value;
//     setCityid(cityid);
//   }

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     if (StateId !== '') {
//       const getCitydata = stateData.find((state) => state.state_id === StateId)?.cities || [];
//       setCity(getCitydata);
//     }
//   }, [StateId]);

//   useEffect(() => {
//     if (!auth) {
//       navigate("/sell");
//     }
//     getProperty();
//   }, []);

//   const [disable, setDisable] = useState(true);

//   const getProperty = async () => {
//     console.log("gid",id);
//     const result = await fetch(`http://localhost:5000/getPropertyDetails`, {
//       method: "post",
//       body: JSON.stringify({ _id: id }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     var data = await result.json();
//     let pd = data[0];
//     console.log(pd);

//     if (pd.propertyFor === 'Sell')
//       document.getElementById('sellFor1').checked = pd.propertyFor;
//     else if (pd.propertyFor === 'Rent')
//       document.getElementById("sellFor2").checked = pd.propertyFor;
//     else
//       document.getElementById("sellFor3").checked = pd.propertyFor;

//     document.getElementById("type").value = pd.type;
//     document.getElementById("rooms").value = pd.rooms;
//     // document.getElementById("society").value = pd.society;
//     // document.getElementById("zone").value = pd.zone;
//     // document.getElementById("pincode").value = pd.pincode;
//     // document.getElementById("area").value = pd.area;
//     // document.getElementById("price").value = pd.price;
//     setSociety(pd.society);
//     setZone(pd.zone)
//     setPincode(pd.pincode)
//     setArea(pd.area)
//     setPrice(pd.price);
//     console.log(pd.State,pd.City);
//     StateId =
//       stateData.find((state) => state.state_name === pd.State)?.state_id ||
//       ""; // return state_id
//     CityId =
//       city.find((getcity) => getcity.city_name === pd.City)?.city_id || "";
//     console.log(StateId,CityId,"loc");
//     setStateid(StateId);
//     setCityid(CityId);

//     localStorage.setItem("propDetails", JSON.stringify(pd));
//   }

//   const clickHandler = async (e) => {
//     var propertyFor = document.querySelector('input[name="propertyFor"]:checked');
//     var selectedValue = null;
//     if (propertyFor) {
//       selectedValue = propertyFor.value;
//     }

//     let State = document.getElementById('State').value; // return id as value
//     let City = document.getElementById('City').value; // return id as value
//     let type = document.getElementById('type').value; // return name as value
//     let rooms = document.getElementById('rooms').value; // return name as value
//     let seller = JSON.parse(localStorage.getItem("user")) || {};
//     let sellerId = seller._id;

//     if (selectedValue !== '' && type !== '' && State !== '' && City !== '' && society !== '' && zone !== '' && pincode !== '' && area !== '' && price !== '' && rooms !== '') {

//       // we should convert _id's to _name's for storing local storge bcoz we get _id's.
//       const selectedStateName = stateData.find((state) => state.state_id === State)?.state_name || '';
//       const selectedCityName = city.find((getcity) => getcity.city_id === City)?.city_name || '';

//       localStorage.setItem('PropertyDetails',
//         JSON.stringify({
//           selectedValue, type, State: selectedStateName, City: selectedCityName, society, zone, pincode, area, price, rooms, sellerId
//         })
//       );

//       setDisable(false)
//       toast.success('Congratulations! Information Stored...', {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         rtl: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//     }
//     else if (selectedValue === '' || type === '' || State === '' || City === '' || society === '' || zone === '' || pincode === '' || area === '' || price === '' || rooms === '') {
//       toast.warning('Attention! Information not Sufficient...', {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         rtl: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//     }
//     else {
//       toast.error('Oops! Information Crashed...', {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         rtl: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//     }
//   }

//   return (
//     <div id="mainDiv" className="bg-center bg-no-repeat bg-cover">
//       <div className="main-block">
//         <div className="left-part">
//           <i className="fa fa-house-laptop text-[7em] text-sellIcon"></i> <br />{" "}
//           <br />
//           <h1 id="leftHeading"> Sell Your Property</h1> <br /> <br />
//           <p className="sellText">
//             {" "}
//             With this platform you can sell your precious property virtually.
//             Save your time and get high amount of money...
//           </p>
//           <div>
//             <Link className="btn-item" to="/about">
//               Explore Us
//             </Link>
//           </div>
//         </div>

//         <form id="sellForm" onSubmit={handleSubmit(clickHandler)}>
//           <div className="title">
//             <i className="fas fa-pencil-alt text-[1.8em] text-sellIcon"></i>{" "}
//             &ensp;
//             <h2 id="rightHeading">Property Info And Location</h2>
//           </div>
//           <br />
//           <div className="information">
//             <div>
//               <div>
//                 <label id="radio"> Property For :<span className='red'>*</span> </label> &emsp;
//                 <label id="radio">
//                   {" "}
//                   <input
//                     type="radio"
//                     id="sellFor1"
//                     name="propertyFor"
//                     value="Sell"
//                     className="sellField"
//                     {...register("propertyFor", {
//                       required: {
//                         value: true,
//                         message: "Property for is required"
//                       },
//                     })}
//                   />{" "}
//                   Sell{" "}
//                 </label>{" "} &emsp;
//                 <label id="radio">
//                   {" "}
//                   <input
//                     type="radio"
//                     id="sellFor2"
//                     name="propertyFor"
//                     value="Rent"
//                     className="sellField"
//                     {...register("propertyFor", {
//                       required: {
//                         value: true,
//                         message: "Property for is required"
//                       },
//                     })}
//                   />{" "}
//                   Rent{" "}
//                 </label>{" "} &emsp;
//                 <label id="radio">
//                   {" "}
//                   <input
//                     type="radio"
//                     id="sellFor3"
//                     name="propertyFor"
//                     value="PG"
//                     className="sellField"
//                     {...register("propertyFor", {
//                       required: {
//                         value: true,
//                         message: "Property for is required"
//                       },
//                     })}
//                   />{" "}
//                   PG{" "}
//                 </label>
//               </div>
//               <p className="text-sm text-red-500">{errors.propertyFor?.message}</p>
//             </div>

//             <div>
//               <div>
//                 <label> Type of Property :<span className='red'>*</span> </label>
//                 <select
//                   id="type"
//                   style={{ 'width': '40%' }}
//                 // {...register("type", {
//                 //   required: 'Type of property is required'
//                 // })}
//                 >
//                   <option id='propOpt' value=''>
//                     Select Type
//                   </option>
//                   <option id='propOpt' value="Flats/Apartments">
//                     Flats/Apartments
//                   </option>
//                   <option id='propOpt' value="Residential Plot">
//                     Residential Plot
//                   </option>
//                   <option id='propOpt' value="Office Space">
//                     Office Space
//                   </option>
//                   <option id='propOpt' value="Farm House">
//                     Farm House
//                   </option>
//                   <option id='propOpt' value="Commercial plots">
//                     Commercial plots
//                   </option>
//                 </select>
//               </div>
//               <p className="text-sm text-red-500">{errors.type?.message}</p>
//             </div>
//             <br />

//             <h1 id="markLabel"> --- Landmark --- </h1> <br />
//             <div>
//               <div className='text-dark'>
//                 <label className="form-label">
//                   State :<span className='red'>*</span> &ensp;
//                 </label>
//                 <select
//                   name='State'
//                   className='sellField form-control'
//                   id="State"
//                   // defaultValue={StateId}
//                   value={stateid}
//                   {...register("State", {
//                     required: "State is required"
//                   })}
//                   onChange={(e) => handleState(e)}
//                 >
//                   <option
//                     className='propOtp bg-black'
//                     value=""> Select State </option>
//                   {
//                     stateData.map((getstate, index) => (
//                       <option
//                         className='bg-black'
//                         value={getstate.state_id}
//                         key={index}
//                       >
//                         {
//                           getstate.state_name
//                         }
//                       </option>
//                     ))
//                   }
//                 </select>
//               </div>
//               <p className="text-sm text-red-500">{errors.State?.message}</p>
//             </div>

//             <div>
//               <div className='text-dark'>
//                 <label className="form-label">
//                   City :<span className='red'>*</span> &ensp;
//                 </label>
//                 <select
//                   name='City'
//                   className='sellField form-control ml-2'
//                   style={{ 'width': '45%' }}
//                   id='City'
//                   value={cityid}
//                   {...register("City", {
//                     required: "City is required"
//                   })}
//                   onChange={(e) => handleCity(e)}
//                 >
//                   <option
//                     className='propOtp bg-black'
//                     value=""
//                   >
//                     Select City
//                   </option>
//                   {city &&
//                     city.map((getcity, index) => (
//                       <option
//                         className='bg-black'
//                         value={getcity.city_id}
//                         key={index}
//                       >
//                         {
//                           getcity.city_name
//                         }
//                       </option>
//                     ))
//                   }
//                 </select>

//               </div>
//               <p className="text-sm text-red-500">{errors.City?.message}</p>
//             </div>

//             <div>
//               <label>
//                 Area/Society :<span className='red'>*</span> &ensp;
//               </label>
//               <input
//                 type="text"
//                 name="zone"
//                 className="sellField"
//                 id="zone"
//                 placeholder="Enter Area & Society"
//                 value={zone}
//                 {...register("zone", {
//                   required: "Area & Society is required"
//                 })}
//                 onChange={(e) => {
//                   setZone(e.target.value);
//                 }}
//               />
//               <p className="text-sm text-red-500">{errors.zone?.message}</p>
//             </div>

//             <div>
//               <label>
//                 Flat no./Apartment/Street no. :<span className='red'>*</span> &ensp;
//               </label>
//               <input
//                 type="text"
//                 name="society"
//                 className='sellField'
//                 id="society"
//                 placeholder='Enter Flat/Apartment/Street'
//                 style={{ 'width': '40%' }}
//                 value={society}
//                 {...register("society", {
//                   required: "Flat/Apartment/Street is required"
//                 })}
//                 onChange={(e) => {
//                   setSociety(e.target.value);
//                 }}
//               />
//               <p className="text-sm text-red-500">{errors.society?.message}</p>
//             </div>

//             <div>
//               <label> Pincode :<span className='red'>*</span> &ensp; </label>
//               <input
//                 type="text"
//                 name='pincode'
//                 className='sellField'
//                 id="pincode"
//                 placeholder='Enter 6 digit Pincode'
//                 value={pincode}
//                 {...register("pincode", {
//                   required: "Pincode is required",
//                   maxLength: {
//                     value: 6,
//                     message: "Pincode no. exceed only 6 digits"
//                   },
//                   pattern: {
//                     value: /^\d+(?:[.,]\d+)*$/,
//                     message: "Pincode contains digits only",
//                   },
//                   pattern: {
//                     value: /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/,
//                     message: "Pincode is not valid"
//                   },
//                 })}
//                 onChange={(e) => {
//                   setPincode(e.target.value);
//                 }}
//               />
//               <p className="text-sm text-red-500">{errors.pincode?.message}</p>
//             </div>
//             <br />
//             <br />

//             <h1 id="markLabel"> --- Property Feature & Price --- </h1> <br />
//             <div>
//               <label> Plot/Land Area (in m<sup>2</sup>) :<span className='red'>*</span>  &ensp; </label>
//               <input
//                 type="text"
//                 name='area'
//                 className='sellField'
//                 id="area"
//                 placeholder='Plot/Land Area in Sq.meter'
//                 style={{ 'width': '40%' }}
//                 value={area}
//                 {...register("area", {
//                   required: "Plot/Land Area is required",
//                   pattern: {
//                     value: /^\d+(?:[.,]\d+)*$/,
//                     message: "Area contains digits only",
//                   },
//                 })}
//                 onChange={(e) => {
//                   setArea(e.target.value);
//                 }}
//               />
//               <p className="text-sm text-red-500">{errors.area?.message}</p>
//             </div>

//             <div>
//               <div>
//                 <label>
//                   No. of Bedrooms :<span className='red'>*</span> &ensp;
//                 </label>
//                 <select
//                   id="rooms"
//                 // {...register("rooms", {
//                 //   required: 'No. of rooms is required'
//                 // })}
//                 >
//                   <option id='room' value=''>
//                     Select
//                   </option>
//                   <option id="room" value="1">
//                     1
//                   </option>
//                   <option id="room" value="2">
//                     2
//                   </option>
//                   <option id="room" value="3">
//                     3
//                   </option>
//                   <option id="room" value="4">
//                     More
//                   </option>
//                 </select>
//               </div>
//               <p className="text-sm text-red-500">{errors.rooms?.message}</p>
//             </div>

//             <div>
//               <label>
//                 Expected Price (&#8377;) :<span className='red'>*</span> &ensp;
//               </label>
//               <input
//                 type="text"
//                 name='price'
//                 className='sellField'
//                 id="price"
//                 placeholder='Enter Total Price in INR'
//                 style={{ 'width': '40%' }}
//                 value={price}
//                 {...register("price", {
//                   required: "Expected Price is required",
//                   pattern: {
//                     value: /^\d+(?:[.,]\d+)*$/,
//                     message: "Price contains digits only",
//                   },
//                 })}
//                 onChange={(e) => {
//                   setPrice(e.target.value);
//                 }}
//               />
//               <p className="text-sm text-red-500">{errors.price?.message}</p>
//             </div>
//             <br />
//           </div>

//           <button id="saveBtn">
//             {" "}
//             Save{" "}
//           </button>

//           <Link to="/updateProperty2">
//             <button
//               id="btn"
//               className={disable ? "notCon" : "con"}
//               disabled={disable}
//             >
//               {" "}
//               Continue{" "}
//             </button>
//           </Link>

//           <ToastContainer
//             position="top-right"
//             autoClose={5000}
//             hideProgressBar={false}
//             newestOnTop={false}
//             closeOnClick
//             rtl={false}
//             pauseOnFocusLoss
//             draggable
//             pauseOnHover
//             theme="light"
//           />
//         </form>
//       </div>
//     </div>
//   );
// };
