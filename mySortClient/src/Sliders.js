import React from "react";
import Slider from "./Slider";
import Typography from "@mui/material/Typography";

export default function Sliders({
  comparisons,
  comparisonValues,
  setComparisonValues,
  calculatePercents,
}) {
  return (
    <div>
      <Typography id="transition-modal-title" variant="h6" component="h2">
        Add wight to direct 1:1 comparisons
      </Typography>
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
            leftHeadIndex={e.left.headIndex}
            rightHeadIndex={e.right.headIndex}
          />
          <h4>{e.right.label}</h4>
        </div>
      ))}
    </div>
  );
}
