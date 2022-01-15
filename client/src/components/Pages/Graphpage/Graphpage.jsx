import React from 'react';
import ReactFrappeChart from "react-frappe-charts";


import './graphpage.scss';

const Graphpage = () => {

  
  return (
    <div className='graphpage'>Graph Page - Test
      <ReactFrappeChart
      type="bar"
      colors={["#21ba45"]}
      axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
      height={250}
      data={{
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{ values: [18, 40, 30, 35, 8, 52, 17, 4] }],
      }}
    />
    </div>
  );
};

export default Graphpage;
