import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const ChangePassword = () => {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

     const clickHandler = async () => {
      if(password!=="" && confirmPassword!==""){
        if (password === confirmPassword) {
          let email = JSON.parse(localStorage.getItem("email"));
          console.log(email);
          let data = await fetch(
            `http://localhost:5000/update_password/` + email,
            {
              method: "put",
              body: JSON.stringify({ password }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          data = await data.json();
          console.log(data);
          if (data) {
            localStorage.clear();
            alert("Password has changed succesfully click ok to login");
            navigate("/login");
          } else {
            alert("Changing password is failed");
          }
        } else {
          alert("password don't match");
        }
      }
      else{
        console.log("pasword sholud be filled")
      }
     };

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5  md:py-24 sm:py-15 mx-auto flex flex-wrap items-center">
          <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md: mx-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium  text-2xl title-font mb-5 text-center">
              Change Password
            </h2>
            <form onSubmit={handleSubmit(clickHandler)}>
              <div className="relative mb-4">
                <label
                  for="password"
                  className="leading-7 text-sm text-gray-600"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={password}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 4,
                      message: "Password must be more than 4 characters",
                    },
                    maxLength: {
                      value: 10,
                      message: "Password cannot exceed more than 10 characters",
                    },
                  })}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <p class="text-sm text-red-500">{errors.password?.message}</p>
              </div>
              <div className="relative mb-4">
                <label
                  for="confirmPassword"
                  className="leading-7 text-sm text-gray-600"
                >
                  Confirm Password
                </label>
                <input
                  type="Password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={confirmPassword}
                  {...register("confirmPassword", {
                    required: "Password is required",
                    minLength: {
                      value: 4,
                      message: "Password must be more than 4 characters",
                    },
                    maxLength: {
                      value: 10,
                      message: "Password cannot exceed more than 10 characters",
                    },
                  })}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
                <p class="text-sm text-red-500">{errors.confirmPassword?.message}</p>
              </div>
              <button
                className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                // onClick={clickHandler}
              >
                Confirm Password
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChangePassword;
