import React from "react";
import Graphpage from '../Graphpage/Graphpage';

const Medtab = (props) => {
  const { medGroupObj, tab } = props;
  // console.log(medGroupObj);

  return (
    <div className="Medtab">
      <h3>{medGroupObj.name}</h3>
      <br />
      hello from the otherside...
      <br />
      <br />
      <br />
      <Graphpage
        medGroupId={medGroupObj.id}
        complianceTime={medGroupObj.complianceTime}
        tab={tab}
      />
    </div>
  );
};
export default Medtab;