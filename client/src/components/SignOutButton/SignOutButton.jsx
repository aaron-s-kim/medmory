import React, { useContext } from 'react';
import axios from 'axios';

import { StateContext, SetStateContext } from 'context/StateProvider';
import { clearLocalStorage } from 'utils/data-persist';

import './signOutButton.scss';

const SignOutButton = ({ children, easyMode }) => {
  const { user } = useContext(StateContext);
  const setState = useContext(SetStateContext);

  const signOut = () => {
    axios
      .delete(`/auth/sign-out/${user.id}`)
      .then(() => {
        clearLocalStorage();
        setState({
          isAuth: false,
          user: null,
          userMedGroupArr: [],
          bond: null,
          pendingInvite: null,
        });
      })
      .catch(err => console.log(err.response.data.error));
  };
  return (
    <div
      onClick={signOut}
      className={`sign-out-button ${easyMode && 'easy-sign-out-btn'}`}
    >
      <span className='sign-out-name'>Sign out</span>
      {children}
    </div>
  );
};

export default SignOutButton;
