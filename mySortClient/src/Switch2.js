import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";

const MaterialUISwitch = styled(Switch)(({ theme }) => {
  return {
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      color: theme.palette.primary.main,
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb": {
          backgroundColor: theme.palette.primary.main,
          "&:before": {
            content: "'High'",
          },
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.primary.light,
      width: 32,
      height: 32,
      color: "#fff",
      fontSize: "75%",
      "&:before": {
        content: "'Low'",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 4,
        top: 8,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2,
    },
  };
});

export default function CustomizedSwitches({
  headCell,
  setPreferHigher,
  preferHigher,
}) {
  const [isChecked, setIsChecked] = useState(
    preferHigher[headCell.label] === false ? preferHigher[headCell.label] : true
  );

  const toggleCheck = (e) => {
    setIsChecked(e.target.checked);
    setPreferHigher((obj) => ({
      ...obj,
      [headCell.label]: !isChecked,
    }));
  };

  return (
    <FormGroup>
      <Stack direction="row" spacing={1} alignItems="center">
        <FormControlLabel
          control={
            <MaterialUISwitch
              sx={{ m: 1 }}
              checked={isChecked}
              onChange={toggleCheck}
            />
          }
          label={headCell.label}
        />
      </Stack>
    </FormGroup>
  );
}
