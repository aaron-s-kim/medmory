import React from 'react';

import default_avatar from 'assets/images/avatar.png';

import './bondUser.scss';

const BondUser = ({ user, history }) => {
  return (
    <div
      key={user.id}
      className='bond-user-container'
      onClick={() => history.push(`/mypage/${user.id}`)}
    >
      <img
        src={user.imageUrl ? user.imageUrl : default_avatar}
        width='70px'
        alt='user'
      />
      <p className='bond-user-name'>
        <strong>{`${user.firstName} ${user.lastName}`}</strong>
      </p>
      <p className='bond-user-email'>{user.email}</p>
    </div>
  );
};

export default BondUser;
