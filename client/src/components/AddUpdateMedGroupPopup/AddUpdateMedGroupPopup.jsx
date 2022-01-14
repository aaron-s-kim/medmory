import React, { useState } from 'react';

import './addUpdateMedGroupPopup.scss';

const AddUpdateMedGroupPopup = () => {
  const INITIAL_INPUT = {
    name: '',
    detail: '',
    complianceTime: '',
  };

  const [inputState, setInputState] = useState(INITIAL_INPUT);
  const { name, detail, complianceTime } = inputState;

  const handleChange = e => {
    const { value, name } = e.target;
    setInputState({ ...inputState, [name]: value });
  };

  return (
    <div>
      <div className='overlay'></div>
      <div className='med-group-popup'>
        <div>
          <h2>Add your medication group</h2>
          <small>
            You can manage individual medicaitons in medication group
          </small>
        </div>
        <form>
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
                type='text'
                name='detail'
                value={detail}
                onChange={handleChange}
                placeholder='Note/Detail'
              />
            </div>
            <div>
              <input
                type='number'
                name='complianceTime'
                value={complianceTime}
                onChange={handleChange}
                placeholder='Compliance time'
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUpdateMedGroupPopup;
