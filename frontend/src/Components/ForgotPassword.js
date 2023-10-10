import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const params = useParams();
  if (params.email === undefined) {
    params.email = "";
  }
  const [email, setEmail] = useState(`${params.email}`);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // useEffect(()=>{
  //     setEmail(`${params.email}`)
  // },[])

  const clickHandler = async () => {
    if (email !== "") {
      let data = await fetch("http://localhost:5000/otp_auth", {
        method: "post",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      data = await data.json();
      console.log(data);
      if (data) {
        localStorage.setItem("otp", JSON.stringify(data));
        localStorage.setItem("email", JSON.stringify(email));
        navigate("/confirmotp");
      } else {
        alert("Please provide correct email");
      }
    } else {
      console.log("Incorrect email");
    }
  };

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5  md:py-24 sm:py-15 mx-auto flex flex-wrap items-center">
          <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md: mx-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium  text-2xl title-font mb-5 text-center"></h2>
            <form onSubmit={handleSubmit(clickHandler)}>
              <div className="relative mb-4">
                <label for="email" className="leading-7 text-sm text-gray-600">
                  Enter Email to get OTP
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email to get OTP"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={email}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Email is not valid email",
                    },
                  })}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <p className="text-sm text-red-500">{errors.email?.message}</p>
              </div>

              <button
                className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                // onClick={clickHandler}
              >
                Get OTP
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;