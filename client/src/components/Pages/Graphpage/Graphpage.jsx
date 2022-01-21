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
for (let i = 1; i <= 10; i++) {
  chartDataArr.push({ name: `Day ${i}` });
}


const Graphpage = (props) => {
  const { medGroupId, complianceTime, tab } = props;
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



  return (
    <ResponsiveContainer width="100%" aspect={3} /* height="100%" {300} */>
      <LineChart width={730} height={250} data={datastate}
        margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" padding={{ left: 20, right: 20 }} />
        <YAxis domain={['auto', 'auto']} reversed label={{ value: 'Time in Hours', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend /* verticalAlign="top" */ />
        <ReferenceLine y={complianceTime} label="Compliance Time" stroke="red" strokeWidth={1.5} strokeDasharray="3 3" />
        {userMedGroupArr.map((medGroupItem, i) => (
          <Line
            key={medGroupItem.id}
            connectNulls
            type="monotone"
            dataKey={medGroupItem.name}
            dot={{ stroke: color[i], strokeWidth: 2 }}
            stroke={color[i]}
            strokeWidth={2}
            activeDot={medGroupId === medGroupItem.id ? { r: 8 } : false}
            fillOpacity={10}
            fill="url(#colorUv)"
          />
        ))}

      </LineChart>
    </ResponsiveContainer>
  )

};

export default Graphpage;