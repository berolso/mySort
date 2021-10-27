import { useState } from "react";

export default function useCalculateAvgRatings() {
  const [avgRatings, setAvgRatings] = useState([]);
  const scale = 100;

  function resetAvgRatings() {
    setAvgRatings([]);
  }

  function calculateAvgRatings(ratings) {
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
  return [avgRatings, calculateAvgRatings, resetAvgRatings];
}
