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

const ratings = [
  [
    { value: 305, rating: 40.67, adjustment: 1 },
    { value: 305, rating: 40.67, adjustment: 1 },
    // all rows...
  ],
  // all columns...
];

const avgRatings = [
  330.03999999999996, 676.4000000000001, 313.26, 168.14, 410.43999999999994,
  440.41999999999996, 265.52, 311.36, 630.34, 398, 327.86, 524.8,
  502.96000000000004,
];

const mySorts = {
  sheetID: {
    headCells: [],
    rows: [],
    columns: [],
    combinations: [],
    sortRank: {},
  },
};
