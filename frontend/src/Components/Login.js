import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clickHandler = async () => {
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
      console.log(data);
    }
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md: mx-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5 text-center">
            Login
          </h2>

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
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
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
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            onClick={clickHandler}
          >
            Login
          </button>
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
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  const decode = jwt_decode(credentialResponse.credential);
                  let name = decode.name;
                  let gmail = decode.email;
                  console.log(name, gmail);

                  let data = await fetch("http://localhost:5000/google-login", {
                    method: "post",
                    body: JSON.stringify({ username: name, email: gmail }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });

                  data = await data.json();
                  console.log(data);
                  if (data.token) {
                    localStorage.setItem("user", JSON.stringify(data.result));
                    localStorage.setItem("token", JSON.stringify(data.token));
                  }
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
