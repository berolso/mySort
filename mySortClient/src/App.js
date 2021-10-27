import React, { useState, useEffect } from "react";

import "./App.css";

import Input from "./Input";
import Table from "./Table";
import Alert from "./Alert";
import Calibrate from "./Calibrate";
import Spinner from "./Spinner";
import useMakeComparisons from "./useMakeComparisons";
import useCalculateRatings from "./useCalculateRatings";
import useCalculateAvgRating from "./useCalculateAvgRatings";
import useSetComparisonValues from "./useSetComparisonValues";
import useCalculatePercents from "./useCalculatePercents";

function App() {
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState([]);
  const [dataReady, setDataReady] = useState(false);
  const [displaySpinner, setDisplaySpinner] = useState(false);

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
  const [comparisonValues, setComparisonValues, resetComparisonValues] =
    useSetComparisonValues(comparisons);
  const [percents, calculatePercents] = useCalculatePercents();
  const [preferHigher, setPreferHigher] = useState({});

  useEffect(() => {
    calculateRatings(columns, percents, headCells, preferHigher);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, percents, headCells, preferHigher]);

  const [ratings, calculateRatings, resetRatings] = useCalculateRatings();
  useEffect(() => {
    ratings.length && calculateAvgRatings(ratings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ratings]);

  const [avgRatings, calculateAvgRatings, resetAvgRatings] =
    useCalculateAvgRating();
  useEffect(
    function addRatingsToRows() {
      if (avgRatings.length) {
        const ratingAddedRows = [];
        for (let i = 0; i < rows.length; i++) {
          const ratingAddedRow = {
            ...[rows[i][0], avgRatings[i], ...rows[i].slice(1)],
          };
          ratingAddedRows.push(ratingAddedRow);
        }

        const testarr = [...ratingAddedRows];
        for (let row = 0; row < rows.length; row++) {
          for (let col = 0; col < ratings.length + 2; col++) {
            // format first column
            if (col === 0) {
              testarr[row] = {
                ...testarr[row],
                [col]: { value: rows[row][col] },
              };
              // format second column (overall rating)
            } else if (col === 1) {
              testarr[row] = {
                ...testarr[row],
                [col]: { value: ratingAddedRows[row][col] },
              };
              // format all columns
            } else if (col > 1) {
              testarr[row] = {
                ...testarr[row],
                [col]: ratings[col - 2][row],
              };
            }
          }
        }
        setDisplayRows(testarr);
        setDataReady(true);
      }
    },
    [avgRatings, ratings, rows]
  );

  const [displayRows, setDisplayRows] = useState([]);

  console.log("ResData", response.data);
  // console.log("head", headCells);
  // console.log("row", rows);
  // console.log("comparisons", comparisons);
  // console.log("col", columns);
  // console.log("comparisonvalues", comparisonValues);
  // console.log("ratings", ratings);
  // console.log("avg ratings", avgRatings);
  // console.log("percents", percents);
  // console.log("preferHigher", preferHigher);
  console.log("displayRows", displayRows);

  const clearData = () => {
    setDataReady(false);
    setResponse([]);
    setHeadCells([]);
    setRows([]);
    makeComparisons([]);
    setColumns([]);
    resetComparisonValues();
    resetRatings();
    resetAvgRatings([]);
    setDisplayRows([]);
    calculatePercents("clear");
  };

  return (
    <div className="App">
      <h1>mySort</h1>
      <h5>Comparative analysis tool for google sheets data sets</h5>
      {
        <Alert
          message={response.message}
          alertSeverity={response.alertSeverity}
          open={open}
          setOpen={setOpen}
        />
      }
      <div style={{ justifyContent: "center", display: "flex" }}>
        <Input
          setResponse={setResponse}
          setOpen={setOpen}
          clearData={clearData}
          setDisplaySpinner={setDisplaySpinner}
        />
      </div>
      {/* {headCells.length && rows.length && ratings.length ? ( */}
      {dataReady && columns.length ? (
        <div style={{ margin: "1%" }}>
          <Calibrate
            headCells={headCells}
            comparisons={comparisons}
            comparisonValues={comparisonValues}
            setComparisonValues={setComparisonValues}
            calculatePercents={calculatePercents}
            preferHigher={preferHigher}
            setPreferHigher={setPreferHigher}
          />
          <Table
            headCells={headCells}
            rows={rows}
            ratings={ratings}
            displayRows={displayRows}
          />
        </div>
      ) : (
        displaySpinner && <Spinner />
      )}
    </div>
  );
}

export default App;
