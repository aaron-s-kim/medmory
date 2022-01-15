import React, { useState } from 'react';

import './medInput.scss';

const MedInput = ({ id, setMedInputArr }) => {
  const INITIAL_INPUT = {
    name: '',
    dosage: '',
    measure: 'mg',
    num: '',
    pillType: 'tablet',
  };

  const [inputState, setInputState] = useState(INITIAL_INPUT);
  const { name, dosage, num, measure, pillType } = inputState;

  const handleChangeOnMedInputArr = (value, name) => {
    setMedInputArr(prevMedInputArr => {
      const medInputArrBeforeChange = prevMedInputArr;
      medInputArrBeforeChange.splice(id, 1, {
        ...inputState,
        [name]: value,
      });

      return medInputArrBeforeChange;
    });
  };

  const handleChange = e => {
    const { value, name } = e.target;
    setInputState({ ...inputState, [name]: value });

    handleChangeOnMedInputArr(value, name);
  };

  return (
    <div>
      <div>
        <input
          type='text'
          name='name'
          value={name}
          onChange={handleChange}
          placeholder='Medication name'
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
