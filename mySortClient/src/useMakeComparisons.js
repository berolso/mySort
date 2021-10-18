import { useState } from "react";

export default function useMakeComparisons() {
  const [comparisons, setComparisons] = useState([]);

  function makeComparisons(headCells) {
    const comparisonList = new Set();
    for (let i = 1; i < headCells.length; i++) {
      for (let j = i + 1; j < headCells.length; j++) {
        comparisonList.add({
          left: { label: headCells[i].label, headIndex: i },
          right: { label: headCells[j].label, headIndex: j },
        });
      }
    }

    setComparisons([...comparisonList]);
  }

  return [comparisons, makeComparisons];
}
