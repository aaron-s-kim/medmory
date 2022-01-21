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
        {!viewMode && (
          <>
            <h3>{user.email}</h3>
            <button className='easy-btn'>Activate EASY</button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
