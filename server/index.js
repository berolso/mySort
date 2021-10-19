const express = require("express");
const axios = require("axios");
const path = require('path');

require("dotenv").config();
const SHEETS_API_KEY = process.env.SHEETS_API_KEY;

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, '../mySortClient/build')))

app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/api", async (req, res) => {
  console.log(req.body.sheetsUrl);
  const url = req.body.sheetsUrl;
  // url example
  // "https://docs.google.com/spreadsheets/d/1uaIp8Dz__jJe3uU4dFXgp8kiv-3CxCYB48lFBGolor4/edit#gid=0";

  const spreadsheetID = url.substring(
    url.indexOf("/d/") + 3,
    url.lastIndexOf("/edit#gid")
  );

  console.log("di", spreadsheetID);

  const config = {
    method: "get",
    url: `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetID}?key=${SHEETS_API_KEY}&includeGridData=true`,
  };
  try {
    const response = await axios(config);
    console.log('*response*',response)
    res.json({
      alertSeverity: "success",
      message: url,
      data: response.data.sheets[0].data[0].rowData,
    });
  } catch (e) {
    console.log('*response e *',e)
    res.json({
      alertSeverity: "error",
      message: 'Make sure url is correct and spreadsheet is viewable to public',
      // message: e.response.data.error.message,
    });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../mySortClient/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
