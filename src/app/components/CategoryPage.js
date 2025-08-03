import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { SliderCategories } from "./SliderCategories";
import { ProductsGalery } from "./ProductsGalery";
import { Navbar } from "../UI-components/Navbar";



function CategoryPage () {  
  
  const [data, setData] = useState([])
  const {id} = useParams()

    useEffect(() => {

      fetch(`/api/v1/categories/get-products/${id}`)
      .then(res => res.json())
      .then((resParsed) => {
        console.log(resParsed)
        setData(resParsed.myProduct)
      })
      
    }, [id])

    return (<>
        <Navbar/>
        <SliderCategories/>
        <ProductsGalery values={{data}}/>
    </>
    );
  }

  export {CategoryPage}