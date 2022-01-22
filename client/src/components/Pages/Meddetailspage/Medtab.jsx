import React from "react";
import Graphpage from '../Graphpage/Graphpage';

const Medtab = (props) => {
  const { medGroupObj } = props;
  // console.log(medGroupObj);

  return (
    <div className="Medtab">
      {/* <h3>{medGroupObj.name}</h3> */}
      <br />
      <br />
      <Graphpage
        medGroupObj={medGroupObj}
        complianceTime={medGroupObj.complianceTime}
      />
    </div>
  );
};
export default Medtab;