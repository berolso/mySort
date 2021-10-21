import { useState } from "react";

export default function useCalculateRatings() {
  const [ratings, setRatings] = useState([]);

  function calculateRatings(columns, percents, headCells, preferHigher) {
    function convertToRating(n, max, min, higher = true) {
      const rating = (((n - min) / (max - min)) * 100).toFixed(2);
      if (higher) {
        return rating;
      } else {
        return 100 - rating;
      }
    }

    function calculateAdjustment(obj) {
      const totalComparisons = columns.length - 2;

      const percentageArray = new Array(totalComparisons).fill(
        1 / totalComparisons
      );
      for (let i = 0; i < percentageArray.length; i++) {
        if (obj && obj[i] >= 0) {
          percentageArray[i] = obj[i] / 2;
        }
      }
      return percentageArray.reduce((prev, curr) => prev + curr);
    }

    let categoriesArray = [];
    if (categoriesArray.length === 0 && columns.length > 0) {
      categoriesArray = new Array(columns.length - 1).fill(1);
    }

    for (let [key, obj] of Object.entries(percents)) {
      categoriesArray[key - 1] = calculateAdjustment(Object.values(obj));
    }

    const ratingsArray = [];
    for (let [idx, col] of Object.entries(columns.slice(1))) {
      const max = Math.max(...col);
      const min = Math.min(...col);
      const arr = [];
      for (let item of col) {
        const rating = convertToRating(
          item,
          max,
          min,
          preferHigher[headCells[+idx+1+''].label]
        );
        arr.push({
          value: item,
          rating: +rating,
          adjustment: categoriesArray[idx],
        });
      }
      ratingsArray.push(arr);
    }
    setRatings(ratingsArray);
  }

  return [ratings, calculateRatings];
}
