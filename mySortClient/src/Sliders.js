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
            gridTemplateColumns: "15% 50% 25%",
            gridGap: "1%",
          }}
          key={e + i}
        >
          <h4
            style={{
              marginTop: 5,
              marginLeft: "auto",
            }}
          >
            {e.left.label}
          </h4>
          <Slider
            idx={i}
            comparisonValues={comparisonValues}
            setComparisonValues={setComparisonValues}
            calculatePercents={calculatePercents}
            leftHeadIndex={e.left.headIndex}
            rightHeadIndex={e.right.headIndex}
          />
          <h4
            style={{
              marginTop: 5,
            }}
          >
            {e.right.label}
          </h4>
        </div>
      ))}
    </div>
  );
}
