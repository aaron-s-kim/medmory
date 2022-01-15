import React, { useState } from 'react';
import axios from 'axios';

import Overlay from 'components/Overlay/Overlay';

import './addUpdateMedGroupPopup.scss';

// @@@@ CHANGE HARDCODED USER_ID TO DYNAIC USER_ID
const AddUpdateMedGroupPopup = () => {
  const INITIAL_INPUT = {
    name: '',
    detail: '',
    complianceTime: '',
  };

  const [inputState, setInputState] = useState(INITIAL_INPUT);
  const { name, detail, complianceTime } = inputState;

  const handleSubmit = e => {
    e.preventDefault();

    const reqBody = {
      name,
      detail,
      compliance_time: complianceTime,
      user_id: 208,
    };

    console.log(name, detail, complianceTime);
    axios
      .post('/med_groups', reqBody)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  const handleChange = e => {
    const { value, name } = e.target;
    setInputState({ ...inputState, [name]: value });
  };

  return (
    <>
      <Overlay />
      <div className='med-group-popup'>
        <div>
          <h2>Add your medication group</h2>
          <small>
            You can manage individual medicaitons in medication group
          </small>
        </div>
        <form onSubmit={handleSubmit}>
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
                placeholder='Compliance hour(24hr)'
              />
            </div>
          </div>
          <div>
            <button>Save medication group</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddUpdateMedGroupPopup;
