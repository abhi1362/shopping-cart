import React from "react";
import "./ProductCard.css";
import { useDispatch } from "react-redux";
import { getTotal, addToCart } from "../../store/slices/cartSlice";

const ProductCard = ({ id, name, imageURL, description, price }) => {
  const dispatch = useDispatch();
  return (
    <div className="productcard-container">
      <h3 className="productcard-heading">{name}</h3>
      <div className="productcard-image">
        <img src={imageURL} alt={name} />
      </div>
      <div className="productcard-description mx-2">
        <p className="my-1">{description}</p>
      </div>
      <div className="productcard-mrp">
        <div className="font-weight-bold productcard-price">
          <p>MRP Rs.{price}</p>
        </div>
        <div className="productcard-btn">
          <button onClick={() => {
            dispatch(addToCart({id,name,imageURL,price}));
            dispatch(getTotal());
          }}
          >
            Buy Now <span className="productcard-btn-mrp">@ {price} </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
