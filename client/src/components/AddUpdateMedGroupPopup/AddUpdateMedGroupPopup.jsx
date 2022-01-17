import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import { StateContext } from 'context/StateProvider';

import Overlay from 'components/Overlay/Overlay';

import './addUpdateMedGroupPopup.scss';

const AddUpdateMedGroupPopup = ({ history }) => {
  const { user } = useContext(StateContext);
  const INITIAL_INPUT = {
    name: '',
    detail: '',
    complianceTime: '',
  };

  const [inputState, setInputState] = useState(INITIAL_INPUT);
  const { name, detail, complianceTime } = inputState;

  const handleSubmit = e => {
    e.preventDefault();

    if (name === '') return history.push('/mypage');

    const reqBody = {
      name,
      detail,
      compliance_time: complianceTime,
      user_id: user.id,
    };

    axios
      .post('/med_groups', reqBody)
      .then(res => console.log(res))
      .catch(err => console.log(err));

    history.push('/mypage');
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

export default withRouter(AddUpdateMedGroupPopup);
