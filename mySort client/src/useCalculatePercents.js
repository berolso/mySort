import { useState } from "react";

export default function useCalculateAdjustments() {
  const [percents, setPercents] = useState({});

  function calculatePercents(sObj) {
    // example sObj {value: 67, name: '3'(index of slider), leftHeadIndex: 1, rightHeadIndex: 5, leftPercent: 0.33, …}
    setPercents((e) => ({
      ...e,
      [sObj.leftHeadIndex]: {
        ...e[sObj.leftHeadIndex],
        [sObj.name]: sObj.leftPercent,
      },
      [sObj.rightHeadIndex]: {
        ...e[sObj.rightHeadIndex],
        [sObj.name]: sObj.rightPercent,
      },
    }));
  }

  return [percents, calculatePercents];
}
