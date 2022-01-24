import React from "react";
import Graphpage from '../Graphpage/Graphpage';

const Medtab = (props) => {
  const { medGroupObj } = props;

  return (
    <div className="Medtab">
      <Graphpage
        medGroupObj={medGroupObj}
        complianceTime={medGroupObj.complianceTime}
      />
    </div>
  );
};
export default Medtab; // test