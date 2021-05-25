import React from "react";
import StarRatings from 'react-star-ratings';

function Rating({rating}) {
    return (
        <StarRatings
            starRatedColor="gray"
            rating={rating}
            starDimension="25px"
            starSpacing="0px"
            numberOfStars={10}
        />
    )
}

export default Rating
