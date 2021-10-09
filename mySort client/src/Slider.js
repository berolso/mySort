import React, {useState} from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const min = 0;
const max = 100;

function marks(value) {
  if (value < 50) {
    return [
      {
        value: 10,
        label: `${max - value*2}% More Important`,
      },
    ];
  } else if (value === 50) {
    return [
      {
        value: 50,
        label: `Equal Importance`,
      },
    ];
  } else {
    return [
      {
        value: 80,
        label: `${value*2 - max }% More Important`,
      },
    ];
  }
}

function valuetext(value) {
  return `${value}%`;
}

function valueLabelFormat(value) {
  return `${max - value}% / ${value - min}%`;
}

function calculateValue(value) {
  return value;
}

export default function DiscreteSliderMarks() {
  const [value, setValue] = useState(50);
  const handleChange = (event, newValue) => {
    if (typeof newValue === "number") {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Custom marks"
        // defaultValue={50}
        getAriaValueText={valuetext}
        // step={.5}
        valueLabelDisplay={"auto"}
        marks={marks(value)}
        min={min}
        max={max}
        scale={calculateValue}
        valueLabelFormat={valueLabelFormat}
        onChange={handleChange}
        value={value}
      />
    </Box>
  );
}
