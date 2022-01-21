import React, { useRef, useState, useContext, useEffect } from 'react';
import ReactFrappeChart from "react-frappe-charts";
import { StateContext } from '../../../context/StateProvider';
import axios from 'axios';

import './graphpage.scss';

const data = {
  labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  datasets: /* [], */
  [
    {
      name: "Med group 1",
      chartType: "line",
      values: [null, 11, 13, null, 10, 9, 13, 13, 9, 10] // [0,0,0,0,0,0,0,0,0,0] 
    },
    {
      name: "Med group 2",
      chartType: "line",
      values: [3, 11, 12, 14, 12, 13, null, 6] // [0,0,0,0,0,0,0,0,0,0] 
    }
  //   {
  //     name: "Med group 2",
  //     chartType: "line",
  //     values: [14, 7, 11, 11, 12, 14, 12, 13, 14, 6] // [0,0,0,0,0,0,0,0,0,0] 
  //   }
  ],
  
  yMarkers: [
    { label: "Compliance Time", value: 10, options: { labelPos: "left" } }
  ],
  yRegions: [
    { label: "Regular Time Region", start: 7, end: 22, options: { labelPos: "right" } }
  ]
};

const Graphpage = () => {
  const { userMedGroupArr } = useContext(StateContext);
  const chartRef = useRef();
  const [datastate, setDatastate] = useState(data);
  
  useEffect(() => {
    const promises = userMedGroupArr.map(medGroupItem => {
      const medGroupUrl = `/med_groups/${medGroupItem.id}`;
      return axios.get(medGroupUrl);
    })
    Promise.all(promises)
      .then(resultsArr => {
        // console.log(resultsArr);
        const formatHistory = resultsArr.map(obj => ({
          medGroupName: obj.data.medGroup.name,
          historyTenDays: obj.data.historyTenDays.map(obj => Number(obj.created_at.substring(11, 13)))
        }));
        // console.log(formatHistory);
        const filterHistory = formatHistory.map(obj => ({
          historyTenDays: obj.historyTenDays
        }));
        console.log(filterHistory);
        // const formatFilter = filterHistory


        const chartDataArr = resultsArr.map(obj => ({
          name: obj.data.medGroup.name,
          chartType: "line",
          values: obj.data.historyTenDays.map(obj => Number(obj.created_at.substring(11, 13)))
        }));
        // console.log(chartDataArr); // => correct output check

        setDatastate(prev => (
          {...prev, datasets: [...chartDataArr]}
        ));
      })
      .catch(err => console.log(err.response.data.error));
  }, [userMedGroupArr]);


  const exportChart = () => {
    if (chartRef && chartRef.current) {
      chartRef.current.export();
    }
  };
  return (
    <div className='graphpage'>Graph Page

      {!datastate.datasets.length ? null :
      <>
        <ReactFrappeChart
          ref={chartRef}
          title={"Compliance Data Chart"}
          type='axis-mixed' // 'axis-mixed', 'bar', 'line', 'scatter', 'pie', 'percentage'
          colors={['#21ba45', '#7cd6fd'/*, 'purple' */]}
          axisOptions={{
            xAxisMode: "tick",
            yAxisMode: "tick",
            xIsSeries: 1
          }}
          height={350}
          data={datastate}
          tooltipOptions={{
            formatTooltipX: (d) => ("day " + d).toUpperCase(),
            formatTooltipY: (d) => d + ":00 hours"
          }}

          lineOptions={{
            // regionFill: 1, // default: 0
            // hideDots: 1, // default: 0
            // heatline: 1, // default: 0
            // spline: 1 // default: 0
          }} 
        
        />
        <button onClick={exportChart} type="button">
          Export
        </button>
      </>
      }
  </div>
  );


};

export default Graphpage;
