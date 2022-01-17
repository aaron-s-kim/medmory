import React, { useContext, useState, useEffect } from "react";
import { StateContext } from '../../../context/StateProvider';
import './popup.css';
import axios from "axios";

const Popup = props => {
  const { isAuth, user, userMedGroupArr } = useContext(StateContext);
  const { medGroupObj, togglePopup } = props;
  const [medstate, setMedstate] = useState([]);

  useEffect(() => {
    // update state after changes
    Promise.all([
      axios.get('/med_groups/' + medGroupObj.id)
    ])
      .then((resultsArr) => {
        // console.log("resultsArr[0].data", resultsArr[0].data); // medGroup, meds, isCompliedToday, historyTenDays
        // console.log("resultsArr[0].data.meds", resultsArr[0].data.meds);
        const medsArr = resultsArr[0].data.meds;
        setMedstate(medsArr);
    });
  }, [])

  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={() => togglePopup(medGroupObj.id)}>x</span>
        <h3>Medication Group</h3>
        <h4>{medGroupObj.name}</h4>
        <ul>
          <li>Frequency: {medGroupObj.detail}</li>
          <li>Compliance Time: {medGroupObj.complianceTime}</li>
          <li>Medication Taken Today: {medGroupObj.isCompliedToday ? "Yes" : "No"}</li>
        </ul>
        <hr />
        
        <h3>Medications in Group</h3>
        {medstate.length ? (
          medstate.map(medItem => 
            <div key={ medItem.id }>
              {/* {JSON.stringify(medItem)} */}
              <h4>{medItem.name}</h4>
              <ul>
                <li>dosage: {medItem.dosage} {medItem.measure}</li>
                <li>pills: {medItem.numOfPill} {medItem.pillType}</li>
              </ul>
            </div>
          )
        ) : (
          <p><i>No medications added.</i></p>
        )}
      </div>
    </div>
  );
};

export default Popup;