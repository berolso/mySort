import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const min = 0;
const max = 100;
const defaultValue = 50;

function marks(value) {
  if (value < 50) {
    return [
      {
        value: 10,
        label: `${max - value * 2}% More Important`,
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
        label: `${value * 2 - max}% More Important`,
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

export default function DiscreteSliderMarks({
  idx,
  comparisonValues,
  setComparisonValues,
  calculatePercents,
  leftHeadIndex,
  rightHeadIndex,
}) {
  const [sliderValue, setSliderValue] = useState(
    comparisonValues[idx] >= 0 ? comparisonValues[idx] : defaultValue
  );
  const [evtObj, setEvtObj] = useState({});

  const handleChange = (evt) => {
    setSliderValue(evt.target.value);
    setEvtObj(evt);
  };

  const handleCommit = () => {
    setComparisonValues(evtObj);
    calculatePercents({
      ...evtObj.target,
      leftHeadIndex,
      rightHeadIndex,
      leftPercent: (max - sliderValue) / 100,
      rightPercent: sliderValue / 100,
    });
  };
  return (
    // <Box sx={{ width: 300 }}>
    <Box sx={{ width: '100%' }}>
      <Slider
        aria-label="Custom marks"
        getAriaValueText={valuetext}
        // step={.5}
        valueLabelDisplay={"auto"}
        marks={marks(sliderValue)}
        min={min}
        max={max}
        scale={calculateValue}
        valueLabelFormat={valueLabelFormat}
        name={idx.toString()}
        value={sliderValue}
        onChangeCommitted={handleCommit}
        onChange={handleChange}
      />
    </Box>
  );
}
