import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

const ProductList = ({ filteredProductData }) => {
  return (
    <div className="pt-2 row">
      {filteredProductData.map((data) => {
        return (
          <div className="col-lg-3 col-md-4 col-sm-6 col-12 product-list-col px-2" key={data.id}>
            <ProductCard
              id={data.id}
              name={data.name}
              imageURL={data.imageURL}
              description={data.description}
              price={data.price}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
