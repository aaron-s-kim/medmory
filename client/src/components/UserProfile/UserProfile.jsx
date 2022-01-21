import React from 'react';

import EasyModeButton from 'components/EasyModeButton/EasyModeButton';

import defaultAvatar from 'assets/images/avatar.png';

import './userProfile.scss';

const UserProfile = ({ user, viewMode, easyMode }) => {
  return (
    <div
      className={`user-profile-container ${
        easyMode && 'easy-user-profile-container'
      }`}
    >
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
            <EasyModeButton userId={user.id} />
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
