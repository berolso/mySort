import { useState } from "react";

export default function useSetComparisonValues() {
  // get comparisons from local  or || default in component value..
  const [comparisonValues, setValues] = useState({});

  const setComparisonValues = (evt) => {
    const { name, value } = evt.target;
    setValues((comps) => ({
      ...comps,
      [name]: value,
    }));
  };

  return [comparisonValues, setComparisonValues];
}
