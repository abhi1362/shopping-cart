import "./App.css";
import { useState } from "react";
import Header from "./components/Header/Header";
import Home from './routes/Home/Home'
import Products from './routes/Products/Products'
import SignIn from './routes/SignIn/SignIn'
import SignUp from './routes/SignUp/SignUp'
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import CartModal from "./modals/CartModal/CartModal";

function App() {
  const [openCartModal, setOpenCartModal] = useState(false)
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="App">
      <Header setOpenCartModal={setOpenCartModal} isLogin={isLogin} setIsLogin={setIsLogin}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/sign-in" element={<SignIn isLogin={isLogin} setIsLogin={setIsLogin}/>} />
        <Route path="/sign-up" element={<SignUp isLogin={isLogin} setIsLogin={setIsLogin}/>} />
      </Routes>
      <Footer />
      <CartModal openCartModal={openCartModal} setOpenCartModal={setOpenCartModal}/>
    </div>
  );
}

export default App;
