import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const ConfirmOTP = () => {
     const params = useParams();
     const [otp_user, setOtp_user] = useState("")
    const navigate = useNavigate();
    const clickHandler = () => {
        const otp = localStorage.getItem("otp")
        if(otp === otp_user){
            
            navigate("/changepass")
        }
        else{
            alert("wrong otp")
        }
    }

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5  md:py-24 sm:py-15 mx-auto flex flex-wrap items-center">
          <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md: mx-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium  text-2xl title-font mb-5 text-center"></h2>

            <div className="relative mb-4">
              <label for="otp_user" className="leading-7 text-sm text-gray-600">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp-user"
                name="otp-user"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={otp_user}
                onChange={(e) => {
                  setOtp_user(e.target.value);
                }}
              />
            </div>

            <button
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              onClick={clickHandler}
            >
              Confirm OTP
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ConfirmOTP
