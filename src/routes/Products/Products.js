import React, { useState, useEffect } from "react";
import "./Products.css";
import ProductList from "../../components/ProductList/ProductList";
import SideMenu from "../../components/SideMenu/SideMenu";
import { useLocation } from "react-router-dom";

const Products = () => {
  const location = useLocation();
  const [productData, setproductData] = useState([]);
  const [categoryValue, setCategoryValue] = useState(location.state !== null ? location.state.id : "");
  
  useEffect(() => {
    fetch("http://localhost:3001/products")
    .then((res) => res.json())
    .then((data) => {
      setproductData(data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);
  const filteredProductData = productData.filter(data=>{
    if(categoryValue === 'categories'){
      return data;
    }
    else return data.category.includes(categoryValue); 
  });
  return (
    <div className="container pt-1">
      <div className="row">
        <div className="col-lg-3 col-md-3 col-sm-4 col-12 product-container-col">
          <SideMenu
            categoryValue={categoryValue}
            setCategoryValue={setCategoryValue}
            filteredProductData={filteredProductData}
          />
        </div>
        <div className="col-lg-9 col-md-9 col-sm-8 col-12 product-container-col">
          <ProductList filteredProductData={filteredProductData} />
        </div>
      </div>
    </div>
  );
};

export default Products;
