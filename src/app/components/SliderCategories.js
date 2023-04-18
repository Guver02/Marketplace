import React, { useEffect, useState } from "react";
import "./SliderCategories.css";
import { Link } from "react-router-dom";

function SliderCategories() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch(`api/v1/categories/all`)
      const data = await res.json()

      setCategories(data)
    }

    getCategories()
  }, [])

  return (
    <div className="slider-container">
      <div className="slider">
        {categories.map((category, index) => (
          <Link key={index} to={`/categories/${category.id}`}>
          <div  className="category">
            {category.category}
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export {SliderCategories};
