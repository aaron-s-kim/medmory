import React, { useContext } from 'react';
import axios from 'axios';

import { StateContext, SetStateContext } from '../../context/StateProvider';

import { getAuthUserData } from '../../utils/data-fetch';

import './notification.scss';

const Notification = () => {
  const { pendingInvite, user } = useContext(StateContext);
  const { id, bondName, bondId } = pendingInvite;
  const setState = useContext(SetStateContext);

  const deleteBondInvite = () => {
    axios
      .delete(`/bond_invites/${id}`)
      .then(() => console.log('invite has been cleared'))
      .catch(err => console.log(err.response.data.error));
  };

  const acceptInvite = () => {
    deleteBondInvite();

    const reqBody = {
      bond_id: bondId,
    };

    axios
      .put(`/users/${user.id}`, reqBody)
      .then(() => getAuthUserData(setState))
      .catch(err => console.log(err.response.data.error));
  };

  const declineInvite = () => {
    deleteBondInvite();

    setState(prevState => ({
      ...prevState,
      pendingInvite: null,
    }));
  };

  return (
    <div className='notification'>
      <div className='notification-message-container'>
        <p>You have a pending invite from '{bondName}'</p>
      </div>
      <div className='notification-option-container'>
        <p onClick={declineInvite}>Decline</p>
        <p onClick={acceptInvite}>Accept</p>
      </div>
    </div>
  );
};

export default Notification;
