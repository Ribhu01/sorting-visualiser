import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./SortingVisualizer.css";

const rootElement = document.getElementById("sorting-visualizer");

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
}
