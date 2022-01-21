import React, { useContext } from 'react';
import axios from 'axios';

import { SetStateContext } from 'context/StateProvider';
import { getAuthUserData } from 'utils/data-fetch';

import './easyModeButton.scss';

const EasyModeButton = ({ userId }) => {
  const setState = useContext(SetStateContext);

  const activateEasyMode = () => {
    const reqBody = {
      easy_mode: true,
    };

    axios
      .put(`/users/${userId}`, reqBody)
      .then(() => getAuthUserData(setState))
      .catch(err => console.log(err.response.data.error));
  };

  return (
    <button className='easy-btn' onClick={activateEasyMode}>
      Activate EASY
    </button>
  );
};

export default EasyModeButton;
