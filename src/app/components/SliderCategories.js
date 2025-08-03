import React, { useEffect, useRef, useState } from "react";
import "./SliderCategories.css";
import { Link } from "react-router-dom";
import { useIntersection } from "../custom-hooks/useIntersection";

function SliderCategories({setIsIntersecting }) {
    const [categories, setCategories] = useState([])

    const getCategories = async () => {
        const res = await fetch(`api/v1/categories/all`)
        const data = await res.json()
        setCategories(data)
    }

    const [sliderElem, sliderIsIntersecting] = useIntersection({
        root: null,
        rootMargin: '0px',
        threshold: 1.0 //el 100% del elemento
    })

    useEffect(() => {
        getCategories()
    }, [])

    useEffect(() => {
        if(sliderIsIntersecting) setIsIntersecting(true)
    }, [sliderIsIntersecting])

    

    return (
        <div className="slider-container"
            ref={sliderElem}>
            <div className="slider">
                {categories.map((category, index) => (
                    <Link key={index} to={`/categories/${category.id}`}>
                        <div className="category">
                            {category.category}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export { SliderCategories };
