import React, { useState } from 'react';
import axios from 'axios';

import './medInput.scss';

// @@@@ CHANGE HARDCODED MED_GROUP_ID TO DYNAIC MED_GROUP_ID
const MedInput = ({ id, setMedInputArr }) => {
  const INITIAL_INPUT = {
    name: '',
    dosage: '',
    num: '',
    pillType: '',
  };

  const [inputState, setInputState] = useState(INITIAL_INPUT);
  const { name, dosage, num, measure, pillType } = inputState;

  // const handleSubmit = () => {
  //   const reqBody = {
  //     name,
  //     dosage,
  //     num,
  //     pill_type: pillType,
  //     med_group_id: 208,
  //   };

  //   console.log(name, dosage, num, pillType);
  //   // axios
  //   //   .post('/med_groups', reqBody)
  //   //   .then(res => console.log(res))
  //   //   .catch(err => console.log(err))
  //   //   .finally(() => afterSubmit());()
  // };

  const handleChange = e => {
    const { value, name } = e.target;
    setInputState({ ...inputState, [name]: value });


    // setMedInputArr(prevMedInputArr => {
    //   const medInputArrBeforeChange = prevMedInputArr;
    //   const medInputArrAfterChange = medInputArrBeforeChange.splice(id, 1, {
    //     ...medInput,
    //     [name]: value,
    //   });
    //   console.log(medInputArrAfterChange);
    // });
  };

  return (
    <div>
      <div>
        <input
          type='text'
          name='name'
          value={name}
          onChange={handleChange}
          placeholder='Medicine group name'
        />
      </div>
      <div>
        <input
          type='number'
          name='dosage'
          value={dosage}
          onChange={handleChange}
          placeholder='Dosage'
        />
        <select name='measure' onChange={handleChange} value={measure}>
          <option value='mg' default>
            mg
          </option>
          <option value='g'>g</option>
          <option value='mcg'>mcg</option>
          <option value='mg'>mg</option>
        </select>
      </div>
      <div>
        <input
          type='number'
          name='num'
          value={num}
          onChange={handleChange}
          placeholder='Quantity'
        />
        <select name='pillType' onChange={handleChange} value={pillType}>
          <option value='tablet' default>
            Tablet(s)
          </option>
          <option value='capsule'>Capsule(s)</option>
          <option value='softgel'>Softgel(s)</option>
          <option value='gum'>gum(s)</option>
        </select>
      </div>
    </div>
  );
};

export default MedInput;
