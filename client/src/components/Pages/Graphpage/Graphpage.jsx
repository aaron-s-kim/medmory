import React, { useRef, useState, useContext, useEffect } from 'react';
import ReactFrappeChart from "react-frappe-charts";
import { StateContext } from '../../../context/StateProvider';
import axios from 'axios';

import './graphpage.scss';



const data = {
  labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  datasets:
  [
    {
      name: "Med group 1",
      chartType: "line",
      values: [8, 11, 13, 9, 10, 9, 13, 13, 9, 10] // [0,0,0,0,0,0,0,0,0,0] 
    },
    {
      name: "Med group 2",
      chartType: "line",
      values: [14, 7, 11, 11, 12, 14, 12, 13, 14, 6] // [0,0,0,0,0,0,0,0,0,0] 
    },
    {
      name: "Med group 3",
      chartType: "line",
      values: [16, 7, 14, 13, 8, 12, 15, 9] // [0,0,0,0,0,0,0,0,0,0]
    }
  ],
  
  yMarkers: [
    { label: "Compliance Time", value: 10, options: { labelPos: "left" } }
  ],
  yRegions: [
    { label: "Regular Time Region", start: 6, end: 20, options: { labelPos: "right" } }
  ]
};



const Graphpage = () => {
  const { userMedGroupArr } = useContext(StateContext);
  const chartRef = useRef();
  const [historystate, setHistorystate] = useState([]);
  // const [datastate, setDatastate] = useState(data);
  // console.log(userMedGroupArr); // => [{id, name, detail, complianceTime, ...}, {}]
  
  // useEffect(() => {
  //   // iterate userMedGroupArr > axios req for each
  //   userMedGroupArr.forEach(medGroupItem => (
  //     axios
  //       .get('/med_groups/' + medGroupItem.id)
  //       .then(resultsArr => {
  //         const historyArr = resultsArr.data.historyTenDays;
  //         const timeArr = historyArr.map(obj =>
  //           Number(obj.created_at.substring(11, 13))
  //         );
  //         setHistorystate(prev => [...prev, { name: medGroupItem.name, timeArr: timeArr }]);
  //       })
  //     .catch(err => console.log(err.response.data.error))
  //   ));

  //   const timeDataSets = historystate.map(obj => (
  //     {
  //       name: obj.name,
  //       chartType: "line",
  //       values: obj.timeArr
  //     }
  //   ));
  //   console.log(timeDataSets);
  //   data.datasets = timeDataSets;
  //   // setDatastate(prev => ({...prev, datasets: }))

  // }, []);
  // console.log(JSON.stringify(historystate)); 



  const exportChart = () => {
    if (chartRef && chartRef.current) {
      chartRef.current.export();
    }
  };

  return (
    <div className='graphpage'>Graph Page
      <ReactFrappeChart
        ref={chartRef}
        title={"Compliance Data Chart"}
        type='axis-mixed' // 'axis-mixed', 'bar', 'line', 'scatter', 'pie', 'percentage'
        colors={['#21ba45', '#7cd6fd'/* , 'purple' */]}
        axisOptions={{
          xAxisMode: "tick",
          yAxisMode: "tick",
          xIsSeries: 1
        }}
        height={350}
        data={data}
        tooltipOptions={{
          formatTooltipX: (d) => ("day " + d).toUpperCase(),
          formatTooltipY: (d) => d + "00 hours"
        }}
      />
    <button onClick={exportChart} type="button">
      Export
    </button>
    </div>
  );
};

export default Graphpage;
