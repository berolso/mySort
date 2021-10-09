import React from "react";
import Slider from "./Slider";

export default function Sliders({ combinations }) {
  return (
    <div>
      {combinations.map((e, i) => (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridGap: "5%",
          }}
          key={e+i}
        >
          <h4>{e[0]}</h4>
          <Slider combination={e}/>
          <h4>{e[1]}</h4>
        </div>
      ))}
    </div>
  );
}
