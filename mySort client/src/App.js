
import React, { useState } from 'react'

import "./App.css";

import Input from "./Input";
import Table from "./Table";
import Alert from './Alert'
import Calibrate from './Calibrate'


function App() {
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false);

  return (
    <div className="App">
      <h1>mySort</h1>
      {<Alert message={data.message} alertSeverity={data.alertSeverity} open={open} setOpen={setOpen}/>}
      <Input setData={setData} setOpen={setOpen}/>
      <Calibrate/>

      {data.data ? <Table data={data.data}/> : 'load sheets url'}
    </div>
  );
}

export default App;
