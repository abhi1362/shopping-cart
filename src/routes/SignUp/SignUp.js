import React, { useState, useEffect } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";

const SignUp = ({ isLogin, setIsLogin }) => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  };
  // const errors = {
  //   firstName: {
  //     errorText: "",
  //     errorMessage: "First Name is required !"
  //   },
  //   lastName: {
  //     errorText: "",
  //     errorMessage: "Last Name is required !"
  //   },
  //   email: {
  //     errorText: "",
  //     errorMessage: "Email is required !",
  //     errorMessageEmail: "This is not a valid email format !",
  //     regex: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
  //   },
  //   password: {
  //     errorText: "",
  //     errorMessage: "Password is required !",
  //     errorPasswordMinLength: "Password must be more than 6 characters !"
  //   },
  //   confirmPassword: {
  //     errorText: "",
  //     errorMessage: "Confirm Password is required !",
  //     errorConfirmPasswordMatch: "Password and Confirm Passord should be same !"
  //   },
  // }
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSumitClicked, setIsSumitClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  let navigate = useNavigate();
  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [navigate, isLogin]);
  useEffect(()=>{
    if(Object.keys(formErrors).length === 0 && isSumitClicked){
      fetch('http://localhost:3001/users',
        {
          method: "POST",
          body: JSON.stringify({
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            email: formValues.email,
            password: formValues.password,
            confirmPassword: formValues.confirmPassword
          }),
          headers: {
              "Content-type": "application/json; charset=UTF-8"
          }
        })
        .then(res => {
          res.json();
          localStorage.setItem(
            "sabkaBazaarLogin",
            JSON.stringify({
              userLogin: true
            })
          );
          setIsLogin(true);
          setErrorMessage('');
          navigate("/");
        })
        .catch(err => {
          console.log(err)
          setErrorMessage('Error in Registering user');
        });
    }
  },[formErrors,isSumitClicked,navigate,setIsLogin])

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValues({ ...formValues, [name]: value});
  };

  const handleClick = () => {
    setFormErrors(validate(formValues));
    setIsSumitClicked(true);
  };
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstName) {
      errors.firstName = "First Name is required !";
    }
    if (!values.lastName) {
      errors.lastName = "Last Name is required !";
    }
    if (!values.email) {
      errors.email = "Email is required !";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format !";
    }
    if (!values.password) {
      errors.password = "Password is required !";
    } else if (values.password.length < 6) {
      errors.password = "Password must be more than 6 characters !";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required !";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Password and Confirm Passord should be same !";
    }
    return errors;
  };
  return (
    <div className="container pt-4">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-6 pt-5 singup-heading-col">
          <h1 className="font-weight-bold">Signup</h1>
          <p className="signup-text">
            We do not share your personal details with anyone.
          </p>
        </div>
        <div className="col-lg-4 col-md-5 col-sm-6 ">
          <p className="error-message">{errorMessage}</p>
          <div className="txt_field">
            <input
              type="text"
              name="firstName"
              aria-labelledby="first_name"
              value={formValues.firstName}
              onChange={handleChange}
              
              required
            />
            <label id="first_name">First Name</label>
            <span className="error-text pl-1">{formErrors.firstName}</span>
          </div>
          <div className="txt_field">
            <input
              type="text"
              name="lastName"
              aria-labelledby="last_name"
              value={formValues.lastName}
              onChange={handleChange}
              
              required
            />
            <label id="last_name">Last Name</label>
            <span className="error-text pl-1">{formErrors.lastName}</span>
          </div>
          <div className="txt_field">
            <input
              type="text"
              name="email"
              aria-labelledby="email"
              value={formValues.email}
              onChange={handleChange}
              
              required
            />
            <label id="email">Email</label>
            <span className="error-text pl-1">{formErrors.email}</span>
          </div>
          <div className="txt_field">
            <input
              type="password"
              name="password"
              aria-labelledby="password"
              value={formValues.password}
              onChange={handleChange}
              
              required
            />
            <label id="password">Password</label>
            <span className="error-text pl-1">{formErrors.password}</span>
          </div>
          <div className="txt_field">
            <input
              type="password"
              name="confirmPassword"
              aria-labelledby="confirm_password"
              value={formValues.confirmPassword}
              onChange={handleChange}
              
              required
            />
            <label id="confirm_password">Confirm Password</label>
            <span className="error-text pl-1">
              {formErrors.confirmPassword}
            </span>
          </div>
          <button
            className="signup-btn mb-4"
            type="submit"
            onClick={handleClick}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
