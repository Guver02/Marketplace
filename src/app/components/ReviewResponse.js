import React from "react";
import './ReviewResponse.css'

function ReviewResponse({values, children}) {
    const {createComponent} = values
    return (
        <div className="review-container" id="review-component">

        </div>
    );
}

export {ReviewResponse}