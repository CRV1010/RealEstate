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

  const StateId =
    stateData.find((state) => state.state_name === pd.State)?.state_id || ""; // return state_id
  const CityId =
    city.find((getcity) => getcity.city_name === pd.City)?.city_id || "";

  const [stateid, setStateid] = useState("");
  const [cityid, setCityid] = useState("");

  const [propertyFor, setPropertyFor] = useState("");
  const [society, setSociety] = useState(pd.society);
  const [zone, setZone] = useState(pd.zone);
  const [pincode, setPincode] = useState(pd.pincode);
  const [area, setArea] = useState(pd.area);
  const [build, setBuild] = useState("");
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
      setBuild(pd.build);
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
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });

    var data = await result.json();
    if (!data) {
      console.log("Something went Wrong");
      toast.error("Your Token has expired... login again", {
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
      setTimeout(() => {
        localStorage.clear();
        navigate("/login");
      }, 7000);
    } else {
      let pd = data[0];
      setPd(pd);

      if (pd.propertyFor === "Sell")
        document.getElementById("sellFor1").checked = pd.propertyFor;
      else if (pd.propertyFor === "Rent")
        document.getElementById("sellFor2").checked = pd.propertyFor;
      else document.getElementById("sellFor3").checked = pd.propertyFor;

      document.getElementById("type").value = pd.type;
      document.getElementById("rooms").value = pd.rooms;
      document.getElementById("build").value = pd.build;
      localStorage.setItem("propDetails", JSON.stringify(pd));
    }
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
    let build = document.getElementById("build").value;

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
      rooms !== "" &&
      build !== ""
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
          build,
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
      rooms === "" ||
      build === ""
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
                    onChange={() => setPropertyFor("Sell")}
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
                    onChange={() => setPropertyFor("Rent")}
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
                    onChange={() => setPropertyFor("PG")}
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
                  style={{ width: "40%" }}
                  {...register("type", {
                    value: true,
                    required: "Type of property is required",
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
                    required: "State is required",
                  })}
                  onChange={(e) => handleState(e)}
                >
                  <option className="propOtp bg-black" value="">
                    Select State
                  </option>
                  {stateData.map((getstate, index) => (
                    <option
                      className="bg-black"
                      value={getstate.state_id}
                      key={index}
                    >
                      {getstate.state_name}
                    </option>
                  ))}
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
                  name="City"
                  className="sellField form-control ml-2"
                  style={{ width: "45%" }}
                  id="City"
                  {...register("City", {
                    value: true,
                    required: "City is required",
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
                Area/Street No. :<span className="red">*</span> &ensp;
              </label>
              <input
                type="text"
                name="zone"
                className="sellField"
                id="zone"
                placeholder="Enter Area & Street No."
                value={zone}
                {...register("zone", {
                  value: true,
                  required: "Area & Street No. is required",
                })}
                onChange={(e) => {
                  setZone(e.target.value);
                }}
              />
              <p className="text-sm text-red-500">{errors.zone?.message}</p>
            </div>
            <div>
              <label>
                Flat no./Apartment/Society :<span className="red">*</span>{" "}
                &ensp;
              </label>
              <input
                type="text"
                name="society"
                className="sellField"
                id="society"
                placeholder="Enter Flat/Apartment/Society"
                style={{ width: "40%" }}
                value={society}
                {...register("society", {
                  value: true,
                  required: "Flat/Apartment/Society is required",
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
                  pattern: {
                    value: /^(^\d{6}$)|(^[1-9][0-9]{2}\s?[0-9]{3}$)/,
                    message:
                      "Pincode must be 6 digits or follow the 3-3 format (e.g., 123456 or 123 456).",
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
                    value:
                      /^(5[1-9]\d{0,3}|[1-9]\d{0,3}|10000)$|^\d+(?:[.,]\d+)*$/,
                    message:
                      "Area must be greater than 50 and less than 10,000 and contain digits only",
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
                    required: "No. of rooms is required",
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
                    4
                  </option>
                </select>
              </div>
              <p className="text-sm text-red-500">{errors.rooms?.message}</p>
            </div>
            <div>
              <div>
                <label>
                  Build In (Year):<span className="red">*</span> &ensp;
                </label>
                <input
                  className="sellField"
                  id="build"
                  name="build"
                  type="text"
                  placeholder="Enter Year in YYYY Format"
                  style={{ width: "40%" }}
                  value={build}
                  {...register("build", {
                    value: true,
                    required: "Build In year is required",
                    pattern: {
                      value: new RegExp(
                        `^(19[5-9]\\d|20[0-2]\\d|202[0-3]|20[0-${new Date()
                          .getFullYear()
                          .toString()
                          .substring(2)}]\\d)$`
                      ),
                      message: `Build Year between 1950 and ${new Date().getFullYear()}.`,
                    },
                    // pattern: {
                    //   value: /^\d{4}$/,
                    //   message: "Year in 4 digit only as format specified",
                    // },
                    // validate: (value) => {
                    //   const year = parseInt(value, 10);
                    //   const ctyear = new Date().getFullYear();
                    //   if (year <= ctyear) {
                    //     return true;
                    //   }
                    //   return "Built in year must be less then the current year.";
                    // },
                  })}
                  onChange={(e) => {
                    setBuild(e.target.value);
                  }}
                />
              </div>
              <p className="text-sm text-red-500">{errors.build?.message}</p>
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
                  value: { price },
                  required: "Expected Price is required",
                  pattern: {
                    value: /^(?!0+$)\d+(?:[.,]\d+)*$/,
                    message:
                      "Price must be a non-zero number and contain digits only.",
                  },
                  validate: {
                    priceBasedOnProperty: (value) => {
                      // console.log(value);

                      if (propertyFor === "Sell") {
                        return parseFloat(value.price) >= 100000 &&
                          parseFloat(value.price) <= 10000000
                          ? true
                          : "Price must be greater than 1,00,000 and less than 1,00,00,000 for Selling.";
                      } else if (propertyFor === "Rent") {
                        return parseFloat(value.price) >= 5000 &&
                          parseFloat(value.price) <= 100000
                          ? true
                          : "Price must be greater than 5,000 and less than 1,00,000 for Renting.";
                      } else if (propertyFor === "PG") {
                        return parseFloat(value.price) >= 5000 &&
                          parseFloat(value.price) <= 20000
                          ? true
                          : "Price must be greater than 5,000 and less than 20,000 for PG.";
                      }
                      return "Invalid price error message.";
                    },
                  },
                })}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
              <p className="text-sm text-red-500">
                {errors.price && errors.price.message}
              </p>
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
}
