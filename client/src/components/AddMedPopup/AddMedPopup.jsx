import React, { useState, useContext } from 'react';
import axios from 'axios';

import Med from 'components/Med/Med';
import MedInput from 'components/MedInput/MedInput';

import { SetStateContext } from 'context/StateProvider';

import { getAuthUserData } from 'utils/data-fetch';

import './addMedPopup.scss';

const AddMedPopup = ({
  meds,
  medGroupId,
  medGroupName,
  setMedgroupToDisplay,
}) => {
  const setState = useContext(SetStateContext);

  const INITIAL_MED_INPUT = {
    name: '',
    dosage: '',
    measure: 'mg',
    num: '',
    pillType: 'tablet',
  };

  const [medInputArr, setMedInputArr] = useState([INITIAL_MED_INPUT]);

  const addMedInput = () => {
    setMedInputArr(prevMedInputArr => [...prevMedInputArr, INITIAL_MED_INPUT]);
  };

  const saveMedications = medArr => {
    medArr.forEach(medInput => {
      if (medInput.name === '') return;

      const reqBody = {
        ...medInput,
        pill_type: medInput.pillType,
        med_group_id: medGroupId,
      };

      axios
        .post('/meds', reqBody)
        .then(res => getAuthUserData(setState))
        .catch(err => console.log(err.response.data.error));
    });

    setMedgroupToDisplay({ medGroupName: '', meds: [] });
  };

  const startSavingMeds = e => {
    e.preventDefault();
    saveMedications(medInputArr);
  };

  return (
    <div className='med-group-popup'>
      <div>
        <h2>{medGroupName}</h2>
      </div>
      <strong>Registered medications</strong>
      <div className='med-table'>
        <div className='med-table-head'>
          <strong>Name</strong>
          <strong>Dosage</strong>
          <strong>Quantity</strong>
          <strong></strong>
        </div>

        {meds.map(med => (
          <Med key={med.id} {...med} />
        ))}
      </div>
      {medInputArr.map((medInputObj, i, medInputArr) => (
        <MedInput
          key={i}
          id={i}
          setMedInputArr={setMedInputArr}
          addMedInput={addMedInput}
          numOfMedInput={medInputArr.length}
        />
      ))}
      <p className='add-med-btn' onClick={startSavingMeds}>
        Save medication
      </p>
    </div>
  );
};

export default AddMedPopup;
