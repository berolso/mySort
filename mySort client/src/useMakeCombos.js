import { useState } from "react";

export default function useMakeCombos() {
  const [combinations, setCombinations] = useState([]);

  function makeCombos(headCells) {
    const combos = new Set()
    for(let i = 1; i < headCells.length; i++){
      for(let j = i+1; j < headCells.length; j++){
        combos.add([headCells[i].label, headCells[j].label])
      }
    }
  
    setCombinations([...combos])
  }

  return [combinations, makeCombos];
}
