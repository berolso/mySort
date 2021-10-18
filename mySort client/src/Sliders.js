import React from "react";
import Slider from "./Slider";

export default function Sliders({
  comparisons,
  comparisonValues,
  setComparisonValues,
  calculatePercents,
}) {
  return (
    <div>
      {comparisons.map((e, i) => (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridGap: "5%",
          }}
          key={e + i}
        >
          <h4>{e.left.label}</h4>
          <Slider
            idx={i}
            comparisonValues={comparisonValues}
            setComparisonValues={setComparisonValues}
            calculatePercents={calculatePercents}
            leftHeadIndex = {e.left.headIndex}
            rightHeadIndex = {e.right.headIndex}
          />
          <h4>{e.right.label}</h4>
        </div>
      ))}
    </div>
  );
}
