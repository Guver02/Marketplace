import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ProductsGalery } from "./ProductsGalery";

function CategoryPage() {
    const [data, setData] = useState([])
    const { id } = useParams()

    useEffect(() => {
        fetch(`/api/v1/categories/get-products/${id}`)
            .then(res => res.json())
            .then((resParsed) => {
                console.log(resParsed)
                setData(resParsed.myProduct)
            })

    }, [id])

    return (
        <ProductsGalery values={{ data }} />
    );
}

export { CategoryPage }