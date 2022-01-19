import React from 'react';

import defaultAvatar from 'assets/images/avatar.png';

import './userProfile.scss';

const UserProfile = ({ user }) => {
  return (
    <div className='user-profile-container'>
      {user.imageUrl ? (
        <div
          className='user-image'
          style={{
            backgroundImage: `url(${user.imageUrl})`,
          }}
        />
      ) : (
        <img className='user-image' src={defaultAvatar} alt='user-pic' />
      )}
      <div className='user-info-container'>
        <div className='user-info'>
          <p>
            {user.firstName} {user.lastName}
          </p>
          <p>
            {user.email}
          </p>
        </div>
        <div>
          {/* <p className='add-med-group-btn'>Edit User info</p> */}
          <p className=''>
            <strong>Easy mode: </strong> off
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
