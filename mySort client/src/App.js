import React, { useState, useEffect } from "react";

import "./App.css";

import Input from "./Input";
import Table from "./Table";
import Alert from "./Alert";
import Calibrate from "./Calibrate";
import useMakeCombos from "./useMakeCombos";
import useCalculateRatings from "./useCalculateRatings";
import useCalculateAvgRating from "./useCalculateAvgRatings";
import useCalculateAdjustments from "./useCalculateAdjustments";

function App() {
  const [response, setResponse] = useState([]);
  const [open, setOpen] = useState(false);
  const [headCells, setHeadCells] = useState([]);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [combinations, makeCombos] = useMakeCombos();
  const [ratings, calculateRatings] = useCalculateRatings();
  const [displayRows, setDisplayRows] = useState([]);
  const [avgRatings, calculateAvgRatings] = useCalculateAvgRating();
  const [adjustments, calculateAdjustments] = useCalculateAdjustments();

  useEffect(
    function parseAPIdata() {
      const parseHeadCells = (data) => {
        return data
          .find((e) => e.values)
          .values.filter((e) => e.formattedValue)
          .map((e, i) => {
            // space for ratings column to be added later
            if (i > 0) i++;
            return {
              id: i.toString(),
              numeric: i > 0,
              disablePadding: i === 0,
              label: e.formattedValue,
            };
          });
      };

      const parseTableCells = (data) => {
        return data
          .filter((e) => e.values)
          .slice(1)
          .map((e) => e.values.filter((e) => e.formattedValue))
          .map((e) =>
            e.map((e) => {
              let entry = e.formattedValue;
              return isNaN(+entry) ? entry : +entry;
            })
          );
      };

      if (response.data) {
        setHeadCells(parseHeadCells(response.data));
        setRows(parseTableCells(response.data));
      }
    },
    [response]
  );

  useEffect(
    function createColumns() {
      const parseColumns = (headCells, rows) => {
        let cols = [];
        for (let idx in headCells) {
          const arr = (cols[idx] = []);
          for (let row of rows) {
            arr.push(+row[idx]);
          }
        }
        return cols;
      };
      setColumns(parseColumns(headCells, rows));
    },
    [headCells, rows]
  );

  useEffect(() => {
    makeCombos(headCells);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headCells]);

  useEffect(() => {
    calculateRatings(columns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns]);

  useEffect(() => {
    // calculateAvgRatings();
    ratings.length && calculateAvgRatings(ratings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ratings]);

  useEffect(
    function addRatingsToRows() {
      const ratingAddedRows = [];
      for (let i = 0; i < rows.length; i++) {
        const ratingAddedRow = {
          ...[rows[i][0], avgRatings[i], ...rows[i].slice(1)],
        };
        ratingAddedRows.push(ratingAddedRow);
      }
      setDisplayRows(ratingAddedRows);
    },
    [rows, avgRatings]
  );

  useEffect(() => {
    calculateAdjustments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adjustments]);

  // console.log("head", headCells);
  console.log("row", rows);
  // console.log("col", columns);
  console.log("ratings", ratings);
  console.log("avg ratings", avgRatings);
  // console.log("combinations", combinations);
  console.log("displayRows", displayRows);

  return (
    <div className="App">
      <h1>mySort</h1>
      {
        <Alert
          message={response.message}
          alertSeverity={response.alertSeverity}
          open={open}
          setOpen={setOpen}
        />
      }
      <Input setResponse={setResponse} setOpen={setOpen} />
      <Calibrate combinations={combinations} />
      {headCells.length && rows.length && ratings.length ? (
        <Table
          headCells={headCells}
          rows={rows}
          ratings={ratings}
          displayRows={displayRows}
        />
      ) : (
        "load sheets url"
      )}
    </div>
  );
}

export default App;
