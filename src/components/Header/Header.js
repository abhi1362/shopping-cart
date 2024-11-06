import React, { useEffect } from "react";
import "./Header.css";
// import logo from "../../static/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";

const Header = ({ setOpenCartModal, isLogin, setIsLogin }) => {
  const location = useLocation();
  useEffect(() => {
    const login = localStorage.getItem("sabkaBazaarLogin");
    if (login) {
      let auth = JSON.parse(localStorage.getItem("sabkaBazaarLogin"));
      if (auth.userLogin) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    } else {
      setIsLogin(false);
    }
  }, [setIsLogin]);
  const handleLogout = ()=>{
    localStorage.removeItem('sabkaBazaarLogin');
    setIsLogin(false);
  }

  const totalCartItem = useSelector((state) => state.cart.cartTotalQuantity);
  return (
    <header className="pt-2 page-header">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-4 col-4 logo-img">
            <img src="logo_2x.png" alt="Sabka Bazaar logo" />
          </div>
          <nav className="col-lg-6 col-md-6 col-sm-4 col-3 cart-nav">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
          </nav>
          <div className="col-lg-3 col-md-3 col-sm-4 col-5 auth-nav pr-4">
            <div className="row auth-nav-row">
              {!isLogin ? (
                <div>
                  <Link to="/sign-in">SignIn</Link>
                  <Link to="/sign-up">Register</Link>
                </div>
              ) : (
                <div className="font-weight-bold">
                  <Link to={location.pathname} onClick={handleLogout}>Logout</Link>
                </div>
              )}
            </div>
            <div className="row fa-cart-icon-row">
              <button
                className="fa-cart-btn"
                onClick={() => setOpenCartModal(true)}
              >
                <FontAwesomeIcon
                  className="fa-cart-shopping"
                  icon={faCartShopping}
                ></FontAwesomeIcon>{" "}
                {totalCartItem} items
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
