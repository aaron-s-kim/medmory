import React from 'react';

import './userSearchImage.scss';

const UserSearchImage = ({ userImageUrl, large }) => {
  return (
    <div className='user-image-container'>
      {userImageUrl ? (
        <div
          className={`user-image ${large && 'large'}`}
          style={{
            backgroundImage: `url(${userImageUrl})`,
          }}
        />
      ) : (
        <div className={`user-image ${large && 'large'}`} />
      )}
    </div>
  );
};

export default UserSearchImage;
