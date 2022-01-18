import React, { useContext } from 'react';
import axios from 'axios';

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
      careTakerId,
      complianceTime,
      medGroupName: name,
      medGroupDetail: detail,
    });
  };

  const goToDetail = () => {
    console.log('to detail');
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
        <p className='med-group-btn' onClick={goToEdit}>
          Edit
        </p>
        <p className='med-group-btn' onClick={goToDetail}>
          Detail
        </p>
      </div>
    </div>
  );
};

export default MedGroup;
