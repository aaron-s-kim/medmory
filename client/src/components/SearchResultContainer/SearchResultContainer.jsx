import React from 'react';
import axios from 'axios';

import UserSearchImage from 'components/UserSearchImage/UserSearchImage';

import './searchResultContainer.scss';

const SearchResultContainer = ({ userResult, userBond, searchWord }) => {
  const inviteUserToBond = () => {
    console.log('invite user button clicked');
  };

  return (
    <div className='search-result-container'>
      {userResult.length > 0
        ? userResult.map(user => (
            <div className='user-on-search' key={user.id}>
              <UserSearchImage userImageUrl={user.imageUrl} />
              <p>
                {user.firstName}, {user.lastName}
              </p>
              <p>{user.email}</p>
              {userBond &&
                (user.bond_id ? (
                  <p className='invite-btn bonded'>bonded</p>
                ) : (
                  <p className='invite-btn' onClick={inviteUserToBond}>
                    Invite +
                  </p>
                ))}
            </div>
          ))
        : searchWord !== '' && (
            <p className='no-result-message'>No matching user found</p>
          )}
    </div>
  );
};

export default SearchResultContainer;
