import React from 'react'

export default function RatingStars({ rating }) {
    // Convert the rating to a rounded number between 0 and 5
    const roundedRating = Math.round(rating / 4);

    // Create an array of star icons based on the rounded rating
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= roundedRating) {
            stars.push(<span key={i}>&#9733;</span>); // Full star
        } else {
            stars.push(<span key={i}>&#9734;</span>); // Empty star
        }
    }

    return <div className='text-xl text-yellow-300'>{stars}</div>;
}
