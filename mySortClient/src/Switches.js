import React from "react";
import Switch2 from "./Switch2";
import Typography from "@mui/material/Typography";

export default function Switches({
  headCells,
  comparisons,
  comparisonValues,
  setComparisonValues,
  calculatePercents,
  preferHigher,
  setPreferHigher,
}) {
  return (
    <div>
      <Typography id="transition-modal-title" variant="h6" component="h2">
        Prefer higher or lower value
      </Typography>
      {headCells.slice(1).map((e, i) => (
        <div key={e.label + i}>
          <Switch2
            headCell={e}
            setPreferHigher={setPreferHigher}
            preferHigher={preferHigher}
          />
        </div>
      ))}
    </div>
  );
}
