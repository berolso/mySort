import React, { useState, useEffect, useRef } from "react";
import Sliders from "./Sliders";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function SlidersDialog({
  comparisons,
  comparisonValues,
  setComparisonValues,
  calculatePercents,
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
      <Button onClick={handleClickOpen("paper")}>
        Calibrate Rating
      </Button>
      {/* <Button onClick={handleClickOpen("body")}>scroll=body</Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title"> Direct Comparisons</DialogTitle>
        <DialogContent dividers={scroll === "paper"}> ''
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h2"
          ></Typography>
          <Sliders
            comparisons={comparisons}
            comparisonValues={comparisonValues}
            setComparisonValues={setComparisonValues}
            calculatePercents={calculatePercents}
          />
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
