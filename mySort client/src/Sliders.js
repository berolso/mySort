import React from "react";
import Slider from "./Slider";

export default function Sliders() {
  let count = new Array(3).fill('');
  return (
    <div>
      {console.log(count)}
      {count.map((e, i) => (
        // <h5>{i}</h5>
        <Slider />
      ))}
    </div>
  );
}
