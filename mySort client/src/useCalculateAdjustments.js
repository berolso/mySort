import { useState } from "react";

export default function useCalculateAdjustments() {
  const [adjustments, setAdjustments] = useState([]);

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
      { adjustment: 1, rating: 10, value: 10 },
      { adjustment: 1, rating: 10, value: 8.16 },
      { adjustment: 1, rating: 10, value: 2.87 },
      { adjustment: 1, rating: 10, value: 0 },
      { adjustment: 1, rating: 10, value: 5.49 },
    ],
  ];

  function calculateAdjustments(ratings) {
  }
  // setAdjustments();

  return [adjustments, calculateAdjustments];
}
