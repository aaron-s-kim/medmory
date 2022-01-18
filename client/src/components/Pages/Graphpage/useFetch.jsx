import { useState, useEffect } from "react";
    
const data = {
  labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  datasets: [],
  // [
  //   {
  //     name: "Med group 1",
  //     chartType: "line",
  //     values: [8, 11, 13, 9, 10, 9, 13, 13, 9, 10] // [0,0,0,0,0,0,0,0,0,0] 
  //   },
  //   {
  //     name: "Med group 2",
  //     chartType: "line",
  //     values: [14, 7, 11, 11, 12, 14, 12, 13, 14, 6] // [0,0,0,0,0,0,0,0,0,0] 
  //   },
  //   {
  //     name: "Med group 3",
  //     chartType: "line",
  //     values: [16, 7, 14, 13, 8, 12, 15, 9] // [0,0,0,0,0,0,0,0,0,0]
  //   }
  // ],
  
  yMarkers: [
    { label: "Compliance Time", value: 10, options: { labelPos: "left" } }
  ],
  yRegions: [
    { label: "Regular Time Region", start: 6, end: 20, options: { labelPos: "right" } }
  ]
};

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  
  
  async function fetchUrl() {
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
    setLoading(false);
 }
 
 useEffect(() => {
   fetchUrl();
 }, []);
 
   return [data, loading];
 }


 export { useFetch };
