import React, { useEffect, useState } from "react";
import styles from "./SliderCategories.module.css";
import { Link } from "react-router-dom";
import {
    Shirt,
    Tv,
    Sofa,
    ShoppingBag,
    Watch,
    Home,
    Dumbbell,
    BookOpen,
    Puzzle,
    Box,
    CircleQuestionMark,
} from "lucide-react";

const categoryIcons = {
    Clothes: Shirt,
    Electronics: Tv,
    Furniture: Sofa,
    Shoes: ShoppingBag,
    Accessories: Watch,
    Home: Home,
    Sports: Dumbbell,
    Books: BookOpen,
    Toys: Puzzle,
    Other: Box,
    Undefined: CircleQuestionMark
};

function SliderCategories() {
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        const res = await fetch(`api/v1/categories/all`);
        const data = await res.json();
        setCategories(data);
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className={styles.sliderContainer}>
            <div className={styles.slider}>
                {categories.map((category, index) => {

                    const IconComponent = categoryIcons[category.category] || categoryIcons.Undefined;

                    return(<Link key={index} to={`/categories/${category.id}`}>
                        <div className={styles.category}>
                            <IconComponent fill="#ccc" stroke="#000"/>
                            {category.category}
                        </div>
                    </Link>)
                })}
            </div>
        </div>
    );
}

export { SliderCategories };