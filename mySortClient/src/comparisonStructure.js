const headCells = [
  {
    id: "[i]",
    numeric: false,
    disablePadding: true,
    label: "Dessert (100g serving)",
  },
  //  ...
];

const rows = [
  {
    0: "Cupcake",
    1: "rank",
    2: 305,
    3: 3.7,
    4: 67,
    5: 4.3,
  },
  //  ...
];

const columns = [
  ["..."],
  [
    "305",
    "452",
    "262",
    "159",
    "356",
    "408",
    "237",
    "375",
    "518",
    "392",
    "318",
    "360",
    "437",
  ],
];

const combinations = [["Calories", "Fat (g)"], ["..."]];

const comparisonValues = {0: 33, 2: 77, 3: 27, 4: 22, 5: 31}

const ratings = [
  [
    { value: 305, rating: 40.67, adjustment: 1 },
    { value: 305, rating: 40.67, adjustment: 1 },
    // all rows...
  ],
  // all columns...
];

const avgRatings = [
  33, 67.64, 31.33, 16.81, 41.04, 44.04, 26.55, 31.14, 63.03, 39.8, 32.79,
  52.48, 50.3,
];

// for local storage
const mySorts = {
  sheetID: {
    headCells: [],
    rows: [],
    columns: [],
    combinations: [],
    sortRank: {},
  },
};

const displayRows = {
  0: { value: "Cupcake" },
  1: { value: 25.99 },
  2: { value: 305, rating: 33.11, adjustment: 1 },
  3: { value: 3.7, rating: 12.33, adjustment: 1 },
  4: { value: 67, rating: 63.74, adjustment: 1 },
  5: { value: 4.3, rating: 10.75, adjustment: 1 },
  6: { value: 1, rating: 10, adjustment: 1 },
};

const oldDisplayRows = {
  0: "Cupcake",
  1: 25.99,
  2: 305,
  3: 3.7,
  4: 67,
  5: 4.3,
  6: 1,
};
