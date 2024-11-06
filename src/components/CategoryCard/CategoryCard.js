import React from 'react'
import './CategoryCard.css';
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ id, name, description, imageUrl, buttonName }) => {
  const navigate = useNavigate();
  return (
    <div className="category-card-container category-card-shadow">
      <div className="category-card-image">
        <img src={`${imageUrl}`} alt="" />
      </div>
      <div className="category-card-content">
          <h3 className='font-weight-bold'>{name}</h3>
        <div>
          <p>{description}</p>
        </div>
        <div className="category-card-button">
          <button type="submit" id={id} onClick={(event)=>navigate("/products", {state:{ id : event.target.id}})}>
            Explore {buttonName}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CategoryCard