import React, { useState, useEffect } from "react";

import "./App.css";

import Input from "./Input";
import Table from "./Table";
import Alert from "./Alert";
import Calibrate from "./Calibrate";
import useMakeComparisons from "./useMakeComparisons";
import useCalculateRatings from "./useCalculateRatings";
import useCalculateAvgRating from "./useCalculateAvgRatings";
import useSetComparisonValues from "./useSetComparisonValues";
import useCalculatePercents from "./useCalculatePercents";

function App() {
  const [open, setOpen] = useState(false);

  const [response, setResponse] = useState([]);
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

  const [headCells, setHeadCells] = useState([]);
  const [rows, setRows] = useState([]);
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
    makeComparisons(headCells);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headCells]);

  const [columns, setColumns] = useState([]);
  const [comparisons, makeComparisons] = useMakeComparisons();
  const [comparisonValues, setComparisonValues] = useSetComparisonValues();
  const [percents, calculatePercents] = useCalculatePercents();
  useEffect(() => {
    calculateRatings(columns, percents);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, percents]);

  const [ratings, calculateRatings] = useCalculateRatings();
  useEffect(() => {
    ratings.length && calculateAvgRatings(ratings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ratings]);

  const [avgRatings, calculateAvgRatings] = useCalculateAvgRating();
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

  const [displayRows, setDisplayRows] = useState([]);

  // console.log("head", headCells);
  // console.log("comparisons", comparisons);
  // console.log("comparisonvalues", comparisonValues);
  // console.log("row", rows);
  // console.log("col", columns);
  // console.log('percents',percents)
  // console.log("ratings", ratings[1]);
  // console.log("avg ratings", avgRatings);
  // console.log("displayRows", displayRows);

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
      <Calibrate
        comparisons={comparisons}
        comparisonValues={comparisonValues}
        setComparisonValues={setComparisonValues}
        calculatePercents={calculatePercents}
      />
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
