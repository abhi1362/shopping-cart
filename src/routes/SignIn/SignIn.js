import React, { useState, useEffect } from "react";
import "./SignIn.css";
import { useNavigate } from "react-router-dom";

const SignIn = ({ isLogin, setIsLogin }) => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if(isLogin){
      navigate("/");
    }
  }, [navigate,isLogin]);
  const handleClick = () => {
    if (email === "" || password === "") {
      setErrorMessage("Please Enter Email and Password to proceeed !");
    } else {
      fetch("http://localhost:3001/users")
        .then((res) => res.json())
        .then((data) => {
          let loginStatus =
            data.findIndex(
              (user) => user.email === email && user.password === password
            ) !== -1;
          if (loginStatus) {
            localStorage.setItem(
              "sabkaBazaarLogin",
              JSON.stringify({
                userLogin: true
              })
            );
            setErrorMessage("");
            setIsLogin(true);
            navigate("/");
          } else {
            setErrorMessage("Email or Password is incorrect");
          }
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage("Error in accessing server!");
        });
    }
  };
  return (
    <div className="container pt-4">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-6 pt-5 singup-heading-col">
          <h1 className="font-weight-bold">Login</h1>
          <p className="signup-text">
            Get access to your Orders, Wishlist and Recommendations
          </p>
        </div>
        <div className="col-lg-4 col-md-5 col-sm-6 ">
          <span className="login-error-text pl-1">{errorMessage}</span>

          <div className="txt_field">
            <input
              type="text"
              id="email"
              name="email"
              aria-labelledby="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email</label>
          </div>
          <div className="txt_field">
            <input
              type="password"
              name="Password"
              aria-labelledby="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label id="password">Password</label>
          </div>
          <button
            className="signup-btn mb-4"
            type="submit"
            onClick={handleClick}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
