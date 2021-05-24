import React from "react";
import StarRatings from 'react-star-ratings';

function Rating({rating}) {
    return(
        <StarRatings
            starRatedColor="gray"
            rating={rating}
            starDimension="25px"
            starSpacing="2px"
            numberOfStars={5}
        />
    )
}
export default Rating
