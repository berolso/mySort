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
        Add weight to direct 1:1 comparisons
      </Typography>
      {comparisons.map((e, i) => (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "24% 50% 24%",
            gridGap: "1%",
          }}
          key={e + i}
        >
          <h5
            style={{
              marginTop: 5,
              marginLeft: "auto",
            }}
          >
            {e.left.label}
          </h5>
          <Slider
            idx={i}
            comparisonValues={comparisonValues}
            setComparisonValues={setComparisonValues}
            calculatePercents={calculatePercents}
            leftHeadIndex={e.left.headIndex}
            rightHeadIndex={e.right.headIndex}
          />
          <h5
            style={{
              marginTop: 5,
            }}
          >
            {e.right.label}
          </h5>
        </div>
      ))}
    </div>
  );
}
