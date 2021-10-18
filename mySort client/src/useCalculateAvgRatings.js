import { useState } from "react";

export default function useCalculateAvgRatings() {
  const [avgRatings, setAvgRatings] = useState([]);
  const scale = 100;
  const sample = [
    [
      { adjustment: 1, rating: 10, value: 10 },
      { adjustment: 1, rating: 10, value: 8.16 },
      { adjustment: 1, rating: 10, value: 2.87 },
      { adjustment: 1, rating: 10, value: 0 },
      { adjustment: 1, rating: 10, value: 5.49 },
    ],
    [
      { adjustment: 1, rating: 10, value: 10 },
      { adjustment: 1, rating: 10, value: 8.16 },
      { adjustment: 1, rating: 10, value: 2.87 },
      { adjustment: 1, rating: 10, value: 0 },
      { adjustment: 1, rating: 10, value: 5.49 },
    ],
    [
      { adjustment: 1, rating: 10, value: 10 },
      { adjustment: 1, rating: 10, value: 8.16 },
      { adjustment: 1, rating: 10, value: 2.87 },
      { adjustment: 1, rating: 10, value: 0 },
      { adjustment: 1, rating: 10, value: 5.49 },
    ],
    [
      { adjustment: 1, rating: 10, value: 10 },
      { adjustment: 1, rating: 10, value: 8.16 },
      { adjustment: 1, rating: 10, value: 2.87 },
      { adjustment: 1, rating: 10, value: 0 },
      { adjustment: 1, rating: 10, value: 5.49 },
    ],
    [
      { adjustment: 1, rating: 10, value: 10 },
      { adjustment: 1, rating: 10, value: 8.16 },
      { adjustment: 1, rating: 10, value: 2.87 },
      { adjustment: 1, rating: 10, value: 0 },
      { adjustment: 1, rating: 10, value: 5.49 },
    ],
    [
      { adjustment: 0.5, rating: 5, value: 5 },
      { adjustment: 1, rating: 10, value: 8.16 },
      { adjustment: 1, rating: 10, value: 2.87 },
      { adjustment: 1, rating: 10, value: 0 },
      { adjustment: 1, rating: 10, value: 5.49 },
    ],
  ];

  function calculateAvgRatings(ratings = sample) {
    const avgs = [];
    for (let row = 0; row < ratings[0].length; row++) {
      let sum = 0;
      let pot = 0;
      for (let col = 0; col < ratings.length; col++) {
        let adjustment = ratings[col][row].adjustment;
        sum += ratings[col][row].rating * adjustment;
        pot += scale * adjustment;
      }
      avgs.push(+((sum / pot) * scale).toFixed(2));
    }
    setAvgRatings(avgs);
  }

  return [avgRatings, calculateAvgRatings];
}
