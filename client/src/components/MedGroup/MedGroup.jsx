import React, { useContext } from 'react';
import axios from 'axios';

import { Link } from "react-router-dom";

import { SetStateContext } from 'context/StateProvider';
import { getAuthUserData } from 'utils/data-fetch';

import './medGroup.scss';

const MedGroup = ({
  medGroupId,
  name,
  detail,
  complianceTime,
  isCompliedToday,
  setMedgroupToDisplay,
  careTakerId,
  meds,
  viewMode,
  history,
}) => {
  const setState = useContext(SetStateContext);

  const takeMedGroup = () => {
    const reqBody = { med_group_id: medGroupId };

    axios
      .post('/med_histories', reqBody)
      .then(() => getAuthUserData(setState))
      .catch(err => console.log(err.response.data.error));
  };

  const goToEdit = () => {
    setMedgroupToDisplay({
      medGroupId,
      meds,
      careTakerId: careTakerId === null ? '' : careTakerId,
      complianceTime: complianceTime === null ? '' : complianceTime,
      medGroupName: name,
      medGroupDetail: detail === null ? '' : detail,
    });
  };

  // const goToDetail = () => {
  //   console.log('to detail');
  // };

  const medGroupDetails = {
    pathname: "/med-group-details",
    medGroupId
  };

  return (
    <div className='med-group-containter'>
      <h3 className='med-group-name'>{name}</h3>
      {isCompliedToday ? (
        <p className='message-taken'>Medication taken ✅ </p>
      ) : (
        <div className='message-not-taken-container'>
          <p className='message-not-taken'>NOT taken yet❌</p>
          <p className='take-btn' onClick={takeMedGroup}>
            Take it
          </p>
        </div>
      )}
      <div className='med-group-btn-container'>
        {!viewMode && (
          <p className='med-group-edit-btn' onClick={goToEdit}>
            Edit
          </p>
        )}
        <Link
          to={medGroupDetails}
          className='med-group-detail-btn'
        >
          Detail
        </Link>
        {/* <p className='med-group-detail-btn' onClick={goToDetail}>
          Detail
        </p> */}
      </div>
    </div>
  );
};

export default MedGroup;
