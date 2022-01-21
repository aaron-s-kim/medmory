import React, { useContext, useState, useEffect }  from 'react';
import { StateContext } from '../../../context/StateProvider';
import axios from 'axios';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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


const Graphpage = () => {
  const { userMedGroupArr } = useContext(StateContext);
  const [datastate, setDatastate] = useState([]);

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

          // console.log(newData); // => correct output check
          return newData;
        };
        const formatHistoryArr = resultsArr.map(obj => ({
          medGroupName: obj.data.medGroup.name,
          historyTenDays: dayMatcher(obj.data.historyTenDays)
        }));
        // console.log("formatHistoryArr", formatHistoryArr); // => correct output check

        for (const fhObj of formatHistoryArr) { // loop through main Arr of Objs
          for (let i = 0; i < 10; i++) {
            chartDataArr[i][fhObj.medGroupName] = fhObj.historyTenDays[i];
          }
        }
        console.log(chartDataArr); // => correct output check

        setDatastate(prev => ([...chartDataArr]));
      })
      .catch(err => console.log(err.response.data.error));
  }, [userMedGroupArr]);



  return (
    <ResponsiveContainer width="100%" aspect={3} /* height="100%" {300} */>
      <AreaChart width={730} height={250} data={datastate}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="Vitamins" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        <Area type="monotone" dataKey="The Drugs" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
        <Area type="monotone" dataKey="Hypertension Medications" stroke="#83ca9d" fillOpacity={1} fill="url(#colorPv)" />
        {/* <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
        <Area type="monotone" dataKey="amt" stroke="#83ca9d" fillOpacity={1} fill="url(#colorPv)" /> */}
      </AreaChart>
    </ResponsiveContainer>
  )

};

export default Graphpage;