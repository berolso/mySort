import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { visuallyHidden } from "@mui/utils";

function descendingComparator(a, b, orderBy) {
  // compare by value key
  if (b[orderBy].value < a[orderBy].value) {
    return -1;
  }
  if (b[orderBy].value > a[orderBy].value) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead({
  order,
  orderBy,
  onRequestSort,
  headCells,
  ratings,
}) {
  const [displayHeads, setDisplayHeads] = useState([]);

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  useEffect(
    function addRatingsToHeader() {
      const ratingsHeader = {
        id: "1",
        numeric: true,
        disablePadding: false,
        label: "Ratings",
      };
      const withRatings = [headCells[0], ratingsHeader, ...headCells.slice(1)];
      setDisplayHeads(withRatings);
    },
    [headCells]
  );

  const ratingPercentage = (adjustment) => {
    return (
      <span
        style={{
          color: `hsl(${adjustment * 100},  100%, 30%)`,
          fontSize: "0.75em",
        }}
      >
        {Math.round(adjustment * 100)}%&nbsp;
      </span>
    );
  };

  return (
    <TableHead>
      <TableRow>
        {displayHeads.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {headCell.id > 1
                ? ratingPercentage(ratings[headCell.id - 2][0].adjustment)
                : null}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable({
  headCells,
  rows,
  displayRows,
  ratings,
}) {
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("1");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = displayRows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    displayRows && (
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                headCells={headCells}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={displayRows.length}
                ratings={ratings}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(displayRows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    // const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow key={labelId} hover>
                        {Object.values(row).map((e, i) =>
                          i === 0 ? (
                            <TableCell
                              component="th"
                              id={labelId + i}
                              scope="row"
                              // padding="5px"
                              key={labelId + i}
                            >
                              {e.value}
                            </TableCell>
                          ) : (
                            <TableCell
                              align="right"
                              id={labelId + i}
                              key={labelId + i}
                              style={{
                                color: `hsl(${e.rating * 1}, 100%, 35%)`,
                                // color: "black",
                              }}
                            >
                              <span
                                style={{
                                  // color: `hsl(${e.rating * 1},  100%, 40%)`,
                                  // color: "black",
                                  fontSize: "0.5em",
                                }}
                              >
                                {/* {e.rating}&nbsp; */}
                              </span>

                              <span>{e.value}</span>
                            </TableCell>
                          )
                        )}
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100, 250]}
            component="div"
            count={displayRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
    )
  );
}
