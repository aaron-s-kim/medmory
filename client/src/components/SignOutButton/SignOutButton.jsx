import React, { useContext } from 'react';
import {
  StateContext,
  SetStateContext,
  INITIAL_STATE,
} from 'context/StateProvider';
import axios from 'axios';

import './signOutButton.scss';

const SignOutButton = ({ children, easyMode }) => {
  const { user } = useContext(StateContext);
  const setState = useContext(SetStateContext);

  const signOut = () => {
    axios
      .delete(`/auth/sign-out/${user.id}`)
      .then(() => setState(INITIAL_STATE))
      .catch(err => console.log(err.response.data.error));
  };
  return (
    <div
      onClick={signOut}
      className={`sign-out-button ${easyMode && 'easy-sign-out-btn'}`}
    >
      {children}
      <span className='sign-out-name'>Sign out</span>
    </div>
  );
};

export default SignOutButton;
