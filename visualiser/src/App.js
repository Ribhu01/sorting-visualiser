import React, { useEffect, useState } from "react";
import SortingVisualizer from "./SortingVisualizer";

function App() {
  const [sortedArray, setSortedArray] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");

  useEffect(() => {
    const storedArray = JSON.parse(localStorage.getItem("sortedArray")) || [];
    const storedAlgorithm = localStorage.getItem("selectedAlgorithm") || "";

    if (storedArray.length === 0 || !storedAlgorithm) {
      alert("No data received! Please go back and generate an array.");
      window.location.href = "index.html";
    } else {
      setSortedArray(storedArray);
      setSelectedAlgorithm(storedAlgorithm);
    }
  }, []);

  return (
    <div className="App">
      <SortingVisualizer array={sortedArray} algorithm={selectedAlgorithm} />
    </div>
  );
}

export default App;
