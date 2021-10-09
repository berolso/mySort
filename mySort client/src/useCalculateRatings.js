import { useState } from "react";

export default function useCalculateRatings() {
  const [ratings, setRatings] = useState([]);

  function calculateRatings(columns) {
    function convertToRating(n, max, min) {
      return (((n - min) / (max - min)) * 100).toFixed(2);
    }

    const ratingsArray = [];

    for (let col of columns) {
      const max = Math.max(...col);
      const min = Math.min(...col);
      const arr = [];
      for (let item of col) {
        const rating = convertToRating(item, max, min);
        arr.push({ value: item, rating: +rating, adjustment: 1 });
      }
      ratingsArray.push(arr);
    }
    setRatings(ratingsArray);
  }

  return [ratings, calculateRatings];
}
