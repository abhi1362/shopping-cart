import React, { useState, useEffect } from 'react'
import CategoryCard from '../CategoryCard/CategoryCard';

const Categories = () => {

  const [categoryData, setCategoryData] = useState([]);

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
      {categoryData.map((item) => (
        <CategoryCard
          key={item.key}
          id ={item.id}
          name={item.name}
          description={item.description}
          imageUrl={item.imageUrl}
          buttonName={item.key}
        />
      ))}
    </div>
  )
}

export default Categories