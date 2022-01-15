import React, { useState } from 'react';

import Overlay from 'components/Overlay/Overlay';
import MedInput from 'components/MedInput/MedInput';

const AddMedPopup = () => {
  const INITIAL_MED_INPUT = {
    name: '',
    dosage: '',
    measure:'',
    num: '',
    pillType: '',
  };

  const [medInputArr, setMedInputArr] = useState([INITIAL_MED_INPUT]);

  const addMedInput = () => {
    setMedInputArr(prevMedInputArr => [...prevMedInputArr, INITIAL_MED_INPUT]);
  };

  // const saveMedication = medInput => {
  //   const reqBody = {
  //     name: medInput.name,
  //     dosage: medInput.dosage,
  //     num: medInput.num,
  //     pill_type: medInput.pillType,
  //     med_group_id: 208,
  //   };

  //   console.log(reqBody);
  //   // axios
  //   //   .post('/med_groups', reqBody)
  //   //   .then(res => console.log(res))
  //   //   .catch(err => console.log(err))
  //   //   .finally(() => afterSubmit());
  // };

  const submitTrigger = e => {
    e.preventDefault();
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
        <form onSubmit={submitTrigger}>
          {medInputArr.map((medInputObj, i) => (
            <MedInput
              key={i}
              id={i}
              setMedInputArr={setMedInputArr}
            />
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
