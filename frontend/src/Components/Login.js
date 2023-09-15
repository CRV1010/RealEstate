import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useForm } from "react-hook-form";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/home");
    }
  },[]);
  const clickHandler = async () => {
    if(email!=="" && password!==""){
      let data = await fetch("http://localhost:5000/login", {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      data = await data.json();
      console.log(data);
      if (data.token) {
        localStorage.setItem("user", JSON.stringify(data.result));
        localStorage.setItem("token", JSON.stringify(data.token));
        navigate("/home");
        console.log(data);
      } else {
        alert("pls provide correct details");
      }
    }
    else{
      alert("can`t left field empty")
    }
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5  md:py-24 sm:py-15 mx-auto flex flex-wrap items-center">
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md: mx-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium  text-2xl title-font mb-5 text-center">
            Login
          </h2>
          <form onSubmit={handleSubmit(clickHandler)}>
            <div className="relative mb-4">
              <label for="email" className="leading-7 text-sm text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
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
            <div className="relative mb-4">
              <label for="password" className="leading-7 text-sm text-gray-600">
                Password
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
            <button
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              // onClick={clickHandler}
            >
              Login
            </button>
          </form>
          <p className="mt-3 inline-flex items-center">
            <Link className="text-indigo-500  px-3" to={"/forgotpass/" + email}>
              Forgot Password ?
            </Link>
          </p>
          <p className="mt-3 inline-flex items-center">
            {" "}
            Don`t have account?{" "}
            <Link className="text-indigo-500  px-3" to={"/signup"}>
              Register here
            </Link>
          </p>
          {/* <a href={"login"} >Learn More</a> */}
          {/*  */}
          <div className="my-5">
            <GoogleOAuthProvider clientId="851512856123-qb0a10uhcbtoemkhq7ma6i34lr79s0r4.apps.googleusercontent.com">
              <p className="my-5 flex items-center justify-between">
                <span className=" border-b-2  w-32  text-gray-950 bg-gray-950"></span>
                OR
                <span className=" border-b-2 w-32 text-gray-950 bg-gray-950"></span>
              </p>
              <div className="mx-auto  text-lg">
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    const decode = jwt_decode(credentialResponse.credential);
                    let name = decode.name;
                    let gmail = decode.email;
                    console.log(name, gmail);

                    let data = await fetch(
                      "http://localhost:5000/google-check",
                      {
                        method: "post",
                        body: JSON.stringify({
                          username: name,
                          email: gmail,
                        }),
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    );

                    console.log("result :", data);
                    data = await data.json();
                    if (!data) {
                      data = await fetch("http://localhost:5000/google-login", {
                        method: "post",
                        body: JSON.stringify({
                          username: name,
                          email: gmail,
                        }),
                        headers: {
                          "Content-Type": "application/json",
                        },
                      });

                      data = await data.json();
                    }
                    console.log(data);
                    if (data.token) {
                      localStorage.setItem("user", JSON.stringify(data.result));
                      localStorage.setItem("token", JSON.stringify(data.token));
                      navigate("/home");
                    }
                  }}
                  onError={() => {
                    console.log("Login Failed");
                    alert("something went wrong");
                  }}
                />
              </div>
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
