import React from 'react';

import defaultAvatar from 'assets/images/avatar.png';

import './userProfile.scss';

const UserProfile = ({ user, viewMode }) => {
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
        <h3>
          {user.firstName} {user.lastName}
        </h3>
        <h3>{user.email}</h3>
        {!viewMode && (
          <div>
            <h3>
              <strong>Easy mode: </strong> off
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
