import React, { useState, useEffect } from "react";
import "./SideMenu.css";
import { useLocation } from "react-router-dom";

const SideMenu = ({ categoryValue, setCategoryValue }) => {
  const location = useLocation();
  const [categoryData, setCategoryData] = useState([]);
  const [selectedValue, setSelectedValue] = useState(location.state !== null ? location.state.id : 'categories');
  
  const handleChange = (event) => {
    setSelectedValue(event.target.value)
    if (categoryValue !== event.target.value) {
      setCategoryValue(event.target.value);
    } else {
      setCategoryValue("");
    }
  };

  const clickHandler = (event) => {
    if (categoryValue !== event.target.id) {
      setCategoryValue(event.target.id);
    } else {
      setCategoryValue("");
    }
  };
  useEffect(() => {
    fetch("http://localhost:3001/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategoryData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="form-group category-sidemenu-select pt-4">
        <select
          name="categories"
          className="form-control"
          value={selectedValue}
          onChange={handleChange}
        >
          <option value="categories" disabled>
            Categories
          </option>
          {categoryData.map((data) => (
            <option key={data.id} value={data.id}>
              {data.name}
            </option>
          ))}
        </select>
      </div>
      <div className="category-sidemenu">
        {categoryData.map((data) => (
          <button
            name={data.name}
            className={`pl-4 ${categoryValue === data.id ? "focus-button" : ""}`}
            id={data.id}
            key={data.id}
            onClick={clickHandler}
          >
            {data.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
