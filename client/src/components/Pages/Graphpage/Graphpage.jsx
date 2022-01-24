import React, { useContext, useState, useEffect }  from 'react';
import { StateContext } from '../../../context/StateProvider';
import axios from 'axios';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';

// Chart data template
// const data = [
//   { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
//   { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
//   ...
// ];

// Create dynamic Arr of past 10 days => ['2022-01-10', '2022-01-11', ...]
var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
const d = new Date(Date.now() - tzoffset);
d.setDate(d.getDate() - 9); // # days ago
const today = new Date(Date.now() - tzoffset);
const dayArr = [];
for (let i = d; i <= today; i.setDate(i.getDate() + 1)) {
  dayArr.push(i.toISOString().substring(0,10));
}

const chartDataArr = [];
for (let i = 0; i < 10; i++) {
  let dayNum = dayArr[i].substring(8, 10)
  chartDataArr.push({ name: dayNum });
}



const Graphpage = (props) => {
  const { medGroupObj, complianceTime } = props;
  const { userMedGroupArr } = useContext(StateContext);
  const [datastate, setDatastate] = useState([]);
  const color = ["#3BAFE5", "#FE7701", "#8884d8", "#82ca9d"] // blue, orange, purple, green

  useEffect(() => {
    const promises = userMedGroupArr.map(medGroupItem => {
      const medGroupUrl = `/med_groups/${medGroupItem.id}`;
      return axios.get(medGroupUrl);
    })
    Promise.all(promises)
      .then(resultsArr => {
        
        const dayMatcher = (hArr) => {
          const dayHistoryArr = hArr.map(obj => obj.created_at.substring(0, 13));
          const newData = [];
          dayArr.forEach((day, i) => {
            newData[i] = null;
            for (const e of dayHistoryArr) {
              if (day === e.substring(0,10)) {
                newData[i] = Number(e.substring(11,13));
                break;
              }
            }
          })
          return newData;
        };
        
        for (const obj of resultsArr) { // create chartDataArr
          const historyArr = dayMatcher(obj.data.historyTenDays);
          for (let i = 0; i < 10; i++) {
            chartDataArr[i][obj.data.medGroup.name] = historyArr[i];
          }
        }
        // console.log(chartDataArr); // => correct output check

        setDatastate(prev => ([...chartDataArr]));
      })
      .catch(err => console.log(err.response.data.error));
  }, [userMedGroupArr]);

  // medGroupId (index) determines which tab is active; so 

  // const currMedGroupName = userMedGroupArr[medGroupId].name;
  // console.log(currMedGroupName); // working => Hypertension Medications

  // const gradientOffset = (currMedGroupName) => {
  //   const dataMax = Math.max(...datastate.map((i) => i[currMedGroupName]));
  //   const dataMin = Math.min(...datastate.map((i) => i[currMedGroupName]));
  
  //   if (dataMax <= 0) {
  //     return 0;
  //   }
  //   if (dataMin >= 0) {
  //     return 1;
  //   }
  
  //   return dataMax / (dataMax - dataMin);
  // };
  // const off = gradientOffset();


  return (
    <ResponsiveContainer
      width="100%"
      // height="100%" // height={300}
      aspect={3}
    >
      <LineChart
        data={datastate}
        margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
      >

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          type="category"
          padding={{ left: 10, right: 10 }}
          label={{ value: "Day of Month", position: 'insideBottom', dy: 25}}
        />
        <YAxis
          domain={['auto', 'auto']}// {[6, 20]}
          type="number"
          label={{ value: 'Time (24-hr)', angle: -90, position: 'insideLeft', dy: 35, dx: -10}}
          unit={":00"}
          tickLine={false}
          reversed
          dx={5}
        />

        <ReferenceLine y={complianceTime} label="Compliance Time" stroke="red" strokeWidth={1} strokeDasharray="10 10" />
        {/* <Legend verticalAlign="top" /> */}
        <Tooltip />

        {/* <defs>
          <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset={off} stopColor="green" stopOpacity={1} />
            <stop offset={off} stopColor="red" stopOpacity={1} />
          </linearGradient>
        </defs> */}

        {userMedGroupArr.map((medGroupItem, i) => (
          <Line
            key={medGroupItem.id}
            type="monotone"
            dataKey={medGroupItem.name}

            stroke={color[i]}
            connectNulls
            dot={{ stroke: color[i], strokeWidth: 2 }}
            
            strokeWidth={medGroupObj && medGroupObj.id === medGroupItem.id ? 3 : 0.5}
            activeDot={medGroupObj && medGroupObj.id === medGroupItem.id ? { r: 8 } : false}
            fillOpacity={10}
            fill="url(#colorUv)"
          />
        ))}

      </LineChart>
    </ResponsiveContainer>
  )

};

export default Graphpage; // test