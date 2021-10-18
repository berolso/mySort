import React, { useState } from "react";

import { axiosPost } from "./helpers";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import AddLinkIcon from "@mui/icons-material/AddLink";

export default function CustomizedInputBase({ setResponse, setOpen }) {
  const [sheetUrl, setSheetUrl] = useState(
    "https://docs.google.com/spreadsheets/d/1uaIp8Dz__jJe3uU4dFXgp8kiv-3CxCYB48lFBGolor4/edit#gid=0"
  );

  const handleChange = (evt) => {
    setSheetUrl(evt.target.value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const res = await axiosPost(sheetUrl);
    // const res = await fetchPost(sheetUrl)
    // console.log(res.data)
    // const data = localStorage.mySorts
    // const res = JSON.parse(data)
    setResponse(res);
    setOpen(true);
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton> */}
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        label="Required"
        required
        placeholder="Google Sheets url"
        inputProps={{ "aria-label": "Google sheets url" }}
        value={sheetUrl}
        onChange={handleChange}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="link">
        <AddLinkIcon />
      </IconButton>
    </Paper>
  );
}
