import React, { useContext } from 'react';
import axios from 'axios';

import { StateContext, SetStateContext } from '../../context/StateProvider';

import { getAuthUserData } from '../../utils/data-fetch';

import './notification.scss';

const Notification = () => {
  const { pendingInvite, user } = useContext(StateContext);

  const {
    id: bondInviteId,
    bondName: invitingBondName,
    bondId: invitingBondId,
  } = pendingInvite;
  const setState = useContext(SetStateContext);

  const getDeleteBondInviteAxios = () =>
    axios.delete(`/bond_invites/${bondInviteId}`);

  const acceptInvite = () => {
    getDeleteBondInviteAxios().catch(err =>
      console.log(err.response.data.error)
    );

    const reqBody = {
      bond_id: invitingBondId,
    };

    axios
      .put(`/users/${user.id}`, reqBody)
      .then(() => getAuthUserData(setState))
      .catch(err => console.log(err.response.data.error));
  };

  const declineInvite = () => {
    getDeleteBondInviteAxios()
      .then(() => getAuthUserData(setState))
      .catch(err => console.log(err.response.data.error));
  };

  return (
    <div className='notification'>
      <div className='notification-message-container'>
        <p>
          Invite from <strong>{invitingBondName}</strong>
        </p>
      </div>
      <div className='notification-option-container'>
        <p onClick={declineInvite} className='decline-btn'>
          Decline
        </p>
        <p onClick={acceptInvite} className='accept-btn'>
          Accept
        </p>
      </div>
    </div>
  );
};

export default Notification;
