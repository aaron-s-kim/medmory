import React from "react";
import Graphpage from '../Graphpage/Graphpage';

const Medtab = (props) => {
  const { medGroupObj } = props;
  // console.log(medGroupObj);

  return (
    <div className="Medtab">
      <h3>{medGroupObj.name}</h3>
      <h3>Medications</h3>
      {medGroupObj.meds.map(med => (
        <div key={med.id}>
          <p>Name: {med.name}</p>
        </div>
      ))}
      hello from the otherside...
      <Graphpage />
    </div>
  );
};
export default Medtab;