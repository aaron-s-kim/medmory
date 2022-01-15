import React, { useState } from 'react';
import axios from 'axios';

import Overlay from 'components/Overlay/Overlay';
import MedInput from 'components/MedInput/MedInput';

// @@@@ CHANGE HARDCODED MED_GROUP_ID TO DYNAIC MED_GROUP_ID
const AddMedPopup = () => {
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
        name: medInput.name,
        dosage: medInput.dosage,
        num: medInput.num,
        measure: medInput.measure,
        pill_type: medInput.pillType,
        med_group_id: 15,
      };

      axios
        .post('/meds', reqBody)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    });

    // go to my page
  };

  const handleSubmit = e => {
    e.preventDefault();

    saveMedicationsInDB(medInputArr);
  };

  return (
    <>
      <Overlay />
      <div className='med-group-popup'>
        <div>
          <h2>Vitamins: </h2>
          <span>
            <button onClick={addMedInput}>add medication</button>
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          {medInputArr.map((medInputObj, i) => (
            <MedInput key={i} id={i} setMedInputArr={setMedInputArr} />
          ))}
          <div>
            <button>Save medication</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddMedPopup;
