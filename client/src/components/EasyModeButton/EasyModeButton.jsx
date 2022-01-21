import React, { useContext } from 'react';
import axios from 'axios';

import { SetStateContext } from 'context/StateProvider';
import { getAuthUserData } from 'utils/data-fetch';

import './easyModeButton.scss';

const EasyModeButton = ({ user }) => {
  const setState = useContext(SetStateContext);

  const updateUserEasyMode = modeBoolean => {
    axios
      .put(`/users/${user.id}`, {
        easy_mode: modeBoolean,
      })
      .then(() => getAuthUserData(setState))
      .catch(err => console.log(err.response.data.error));
  };

  const activateEasyMode = () => {
    updateUserEasyMode(true);
  };

  const deactivateEasyMode = () => {
    updateUserEasyMode(false);
  };

  return (
    <>
      {user.easyMode ? (
        <button className='uneasy-btn' onClick={deactivateEasyMode}>
          Deactivate EASY
        </button>
      ) : (
        <button className='easy-btn' onClick={activateEasyMode}>
          Activate EASY
        </button>
      )}
    </>
  );
};

export default EasyModeButton;
