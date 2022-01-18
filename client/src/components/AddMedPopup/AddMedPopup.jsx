import React, { useState } from 'react';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';

import Med from 'components/Med/Med';
import MedInput from 'components/MedInput/MedInput';

import './addMedPopup.scss';
// @@@@ CHANGE HARDCODED MED_GROUP_ID TO DYNAIC MED_GROUP_ID
const AddMedPopup = ({ history, match, meds, medGroupName }) => {
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

  const saveMedicationsInDB = medArr => {
    medArr.forEach(medInput => {
      if (medInput.name === '') return;

      const reqBody = {
        ...medInput,
        pill_type: medInput.pillType,
        med_group_id: 15,
      };

      axios
        .post('/meds', reqBody)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    });

    history.push('/mypage');
  };

  const handleSubmit = e => {
    e.preventDefault();

    saveMedicationsInDB(medInputArr);
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
      <form onSubmit={handleSubmit}>
        {medInputArr.map((medInputObj, i) => (
          <div>
            <MedInput
              key={i}
              id={i}
              setMedInputArr={setMedInputArr}
              addMedInput={addMedInput}
            />
            <button onClick={addMedInput}>add medication</button>
          </div>
        ))}
        <div>
          <button>Save medication</button>
        </div>
      </form>
    </div>
  );
};

export default withRouter(AddMedPopup);
