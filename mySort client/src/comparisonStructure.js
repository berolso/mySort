const headCells = [
  {
    id: "[i]",
    numeric: false,
    disablePadding: true,
    label: "Dessert (100g serving)",
  },
  //  ...
];

const rows = [["Cupcake", 305, 3.7, 67, 4.3],['...']];

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
  ["each item in column, ..."],
  // all columns...
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
