import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { ReactComponent as SheetsLogo } from "./sheetsLogo.svg";

export default function CircularIndeterminate() {
  return (
    <Box sx={{ position: "relative", display: "inline-flex", mt: '5%' }}>
      <CircularProgress variant={"indeterminate"} color={'success'}/>
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SheetsLogo />
      </Box>
    </Box>
  );
}

