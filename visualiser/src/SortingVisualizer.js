import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import "./SortingVisualizer.css";

const SortingVisualizer = ({ array, algorithm }) => {
  const [sortedArray, setSortedArray] = useState([...array]);
  const [isSorting, setIsSorting] = useState(false);
  const svgRef = useRef(null); // Use useRef for D3 SVG

  useEffect(() => {
    if (array.length > 0 && algorithm && !isSorting) {
      sortArray(algorithm);
    }
  }, [array, algorithm]);

  useEffect(() => {
    if (sortedArray.length > 0) {
      animateBars(sortedArray);
    }
  }, [sortedArray]);

  // Animate Bars using D3.js
  const animateBars = (newArray) => {
    const svg = d3.select(svgRef.current);
    const svgWidth = 600;
    const svgHeight = 400;
    const barWidth = svgWidth / newArray.length - 2;
    const maxValue = Math.max(...newArray);

    svg.attr("width", svgWidth).attr("height", svgHeight);

    const bars = svg.selectAll("rect").data(newArray);

    // ENTER + UPDATE: Add new bars or update existing bars
    bars.enter()
      .append("rect")
      .merge(bars)
      .transition()
      .duration(300)
      .attr("x", (d, i) => i * (barWidth + 2)) // Space bars side by side
      .attr("y", (d) => svgHeight - (d / maxValue) * svgHeight) // Scale height
      .attr("width", barWidth)
      .attr("height", (d) => (d / maxValue) * svgHeight)
      .attr("fill", "steelblue");

    // EXIT: Remove extra bars if needed
    bars.exit().remove();
  };

  // Sort Array Based on Selected Algorithm
  const sortArray = async (algo) => {
    setIsSorting(true);
    let arr = [...array];

    switch (algo) {
      case "bubble":
        await bubbleSort(arr);
        break;
      case "selection":
        await selectionSort(arr);
        break;
      case "insertion":
        await insertionSort(arr);
        break;
      case "quick":
        await quickSort(arr, 0, arr.length - 1);
        break;
      case "merge":
        await mergeSort(arr, 0, arr.length - 1);
        break;
      case "count":
        await countingSort(arr);
        break;
      default:
        console.error("Invalid algorithm selected");
    }

    setSortedArray([...arr]);
    setIsSorting(false);
  };

  // Bubble Sort
  const bubbleSort = async (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
      setSortedArray([...arr]); 
    }
  };

  // Selection Sort
  const selectionSort = async (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) minIndex = j;
      }
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      await new Promise((resolve) => setTimeout(resolve, 100));
      setSortedArray([...arr]);
    }
  };

  // Insertion Sort
  const insertionSort = async (arr) => {
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
      await new Promise((resolve) => setTimeout(resolve, 100));
      setSortedArray([...arr]);
    }
  };

  // Quick Sort
  const quickSort = async (arr, low, high) => {
    if (low < high) {
      let pi = await partition(arr, low, high);
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
  };

  const partition = async (arr, low, high) => {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    await new Promise((resolve) => setTimeout(resolve, 100));
    setSortedArray([...arr]);
    return i + 1;
  };

  // Merge Sort
  const mergeSort = async (arr, left, right) => {
    if (left < right) {
      let mid = Math.floor((left + right) / 2);
      await mergeSort(arr, left, mid);
      await mergeSort(arr, mid + 1, right);
      await merge(arr, left, mid, right);
    }
  };

  const merge = async (arr, left, mid, right) => {
    let leftArr = arr.slice(left, mid + 1);
    let rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      arr[k++] = leftArr[i] <= rightArr[j] ? leftArr[i++] : rightArr[j++];
    }
    while (i < leftArr.length) arr[k++] = leftArr[i++];
    while (j < rightArr.length) arr[k++] = rightArr[j++];
    await new Promise((resolve) => setTimeout(resolve, 100));
    setSortedArray([...arr]);
  };

  // Counting Sort
  const countingSort = async (arr) => {
    let max = Math.max(...arr);
    let min = Math.min(...arr);
    let range = max - min + 1;
    let count = new Array(range).fill(0);
    let output = new Array(arr.length);

    for (let i = 0; i < arr.length; i++) count[arr[i] - min]++;
    for (let i = 1; i < range; i++) count[i] += count[i - 1];
    for (let i = arr.length - 1; i >= 0; i--) {
      output[count[arr[i] - min] - 1] = arr[i];
      count[arr[i] - min]--;
    }

    await new Promise((resolve) => setTimeout(resolve, 100));
    setSortedArray([...output]);
  };

  return (
    <div className="visualizer-container">
      <h2>Sorting Visualization ({algorithm})</h2>
      <svg ref={svgRef}></svg> {/* Use ref for SVG rendering */}
    </div>
  );
};

export default SortingVisualizer;
