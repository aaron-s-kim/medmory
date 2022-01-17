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
        <h3>Medication Group Details</h3>
        <p>Group Name: {medGroupObj.name}</p>
        <p>Frequency: {medGroupObj.detail}</p>
        <p>Compliance Time: {medGroupObj.complianceTime}</p>
        <p>Medication Taken Today: {medGroupObj.isCompliedToday ? "Yes" : "No"}</p>
        <h3>Medications in Group</h3>
        {medstate.length ? (
          medstate.map(medItem =>
            JSON.stringify(medItem)
          )
        ) : (
          <p><i>No medications added.</i></p>
        )}
      </div>
    </div>
  );
};

export default Popup;