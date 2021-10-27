import { useState } from "react";

export default function useSetComparisonValues(comparisons) {
  const initialState = Object.fromEntries(comparisons.map((e, i) => [i, 50]));
  // get comparisons from local  or || default in component value..
  const [comparisonValues, setValues] = useState({});

  function resetComparisonValues() {
    setValues({});
  }

  if (comparisonValues[0] === undefined && comparisons.length) {
    setValues(initialState);
  }

  const setComparisonValues = (target) => {
    const { name, value } = target;
    setValues((comps) => ({
      ...comps,
      [name]: value,
    }));
  };

  return [comparisonValues, setComparisonValues, resetComparisonValues];
}
