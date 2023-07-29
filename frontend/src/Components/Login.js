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
    <div>
      <h1>Login</h1>
      <label>Email : </label>
      <input
        type="text"
        placeholder="Enter email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <div></div>
      <label>Password : </label>
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <div></div>
      <button onClick={clickHandler}>Login</button>
      <p> Don`t have account? <Link to={"/signup"}>Register here</Link> </p>
      
      <GoogleOAuthProvider clientId="851512856123-qb0a10uhcbtoemkhq7ma6i34lr79s0r4.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            const decode = jwt_decode(credentialResponse.credential);
            let name = decode.name
            let gmail = decode.email
            console.log(name,gmail)
            
            let data = await fetch("http://localhost:5000/google-login", {
              method: "post",
              body: JSON.stringify({ username : name,email : gmail }),
              headers: {
                "Content-Type": "application/json",
              },
            });

            data = await data.json();
            console.log(data)
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
  );
};

export default Login;
