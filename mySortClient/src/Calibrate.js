import React, { useState, useEffect, useRef } from "react";
import Sliders from "./Sliders";
import Switches from "./Switches";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function SlidersDialog({
  headCells,
  comparisons,
  comparisonValues,
  setComparisonValues,
  calculatePercents,
  preferHigher,
  setPreferHigher,
}) {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Button onClick={handleClickOpen("paper")}>Calibrate Rating</Button>
      {/* <Button onClick={handleClickOpen("body")}>scroll=body</Button> */}
      <Dialog
        PaperProps={{
          style: {
            // position: 'absolute',
            // left: '10%',
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            // boxShadow: "none",
          },
        }}
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title"> Direct Comparisons</DialogTitle>

        {headCells.length > 0 && (
          <DialogContent dividers={scroll === "paper"}>
            <Switches
              headCells={headCells}
              comparisons={comparisons}
              comparisonValues={comparisonValues}
              setComparisonValues={setComparisonValues}
              calculatePercents={calculatePercents}
              preferHigher={preferHigher}
              setPreferHigher={setPreferHigher}
            />
            <br />
            <Sliders
              comparisons={comparisons}
              comparisonValues={comparisonValues}
              setComparisonValues={setComparisonValues}
              calculatePercents={calculatePercents}
            />
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
