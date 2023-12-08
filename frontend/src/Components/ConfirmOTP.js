import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";

const ConfirmOTP = () => {
  const params = useParams();
  const [otp_user, setOtp_user] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const clickHandler = () => {
    if (otp_user !== "") {
      const otp = localStorage.getItem("otp");
      if (otp === otp_user) {
        navigate("/changepass");
      } else {
        toast.warning("Attention! Please provide correct Otp...", {
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
    } else {
      console.log("Otp is not a valid");
    }
  };

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5  md:py-24 sm:py-15 mx-auto flex flex-wrap items-center justify-center">

        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 items-center mr-5 justify-center rounded-lg flex flex-col w-full mt-10 md:mt-0">
          <img alt="ecommerce" class="w-full object-cover object-center rounded" src="../loginSignup/otp2.jpg" />
        </div>

          <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 font-medium  text-2xl title-font mb-5 text-center"></h2>
            <form onSubmit={handleSubmit(clickHandler)}>
              <div className="relative mb-4">
                <label
                  for="otp_user"
                  className="leading-7 text-sm text-gray-600"
                >
                  Enter OTP :<span className="red text-lg">*</span>
                </label>
                <input
                  type="text"
                  id="otp-user"
                  name="otp-user"
                  placeholder="Enter OTP"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={otp_user}
                  {...register("otp_user", {
                    required: "Otp is required",
                    minLength: {
                      value: 6,
                      message: "Otp is of 6 digits",
                    },
                    pattern: {
                      value: /^[0-9]{6}$/,
                      message: "Invalid otp",
                    },
                    maxLength: {
                      value: 6,
                      message: "Otp is of 6 digits", //^\d+$
                    },
                  })}
                  onChange={(e) => {
                    setOtp_user(e.target.value);
                  }}
                />
                <p className="text-sm text-red-500">
                  {errors.otp_user?.message}
                </p>
              </div>

              <button
                className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                // onClick={clickHandler}
              >
                Confirm OTP
              </button>

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
      </section>
    </div>
  );
};

export default ConfirmOTP;
