import React, { useState, useEffect, useRef } from "react";
import Sliders from "./Sliders";
import Switches from "./Switches";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

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
      <Button
        style={{ margin: 5 }}
        variant="contained"
        size="large"
        onClick={handleClickOpen("paper")}
      >
        Calibrate Rating
      </Button>
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
        <DialogTitle id="scroll-dialog-title">
          Adjust weight for rating calculations
        </DialogTitle>
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
        <DialogContent sx={{ pb: 0 }} dividers={scroll === "paper"}>
          <Typography variant="body1" gutterBottom component="div">
            Ratings are calculated by assigning a range of 0-100 to each column.
            The highest value in each column is set to 100 and the lowest set to
            0. Every value per column is calculated to that range.
          </Typography>
          <Typography variant="caption" gutterBottom component="div">
            rating = (((n - min) / (max - min)) * 100).toFixed(2)
          </Typography>
          <Typography variant="caption" gutterBottom component="div">
            for lower value preference (100 - rating)
          </Typography>
          <Typography variant="body1" gutterBottom component="div">
            The overall Rating column is the mean average of each rating value
            per respective row.
          </Typography>
          <Typography variant="body1" gutterBottom component="div">
            Each column can be weighted by adjusting it's relationship to any
            other column. For example, adjusting every comparison value to 0%
            for a particular column will completely remove that columns weight
            from the overall rating.
          </Typography>
        </DialogContent>
        <Button onClick={handleClose}>close</Button>
        <DialogActions>
          <Button onClick={handleClose} disabled>
            Reset
          </Button>
          <Button onClick={handleClose} disabled>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
