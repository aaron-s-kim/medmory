import React, { useContext, useState } from "react";
import { StateContext } from '../../../context/StateProvider';
import './popup.css';

const Popup = props => {
  const { medGroupObj, togglePopup } = props;

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
      </div>
    </div>
  );
};

export default Popup;