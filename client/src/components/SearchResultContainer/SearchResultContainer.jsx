import React from 'react';
import axios from 'axios';

import UserSearchImage from 'components/UserSearchImage/UserSearchImage';

import './searchResultContainer.scss';

const SearchResultContainer = ({ userResult, userBond, searchWord }) => {

  const inviteUserToBond = userIdToInvite => {
    const reqBody = {
      user_id: userIdToInvite,
      bond_id: userBond.id,
    };

    // axios.pose('/bond_invites', reqBody).then()
  };
  console.log(userResult);
  return (
    <div className='search-result-container'>
      {userResult.length > 0
        ? userResult.map(searchedUser => (
            <div className='user-on-search' key={searchedUser.id}>
              <UserSearchImage userImageUrl={searchedUser.imageUrl} />
              <p>
                {searchedUser.firstName}, {searchedUser.lastName}
              </p>
              <p>{searchedUser.email}</p>
              {userBond &&
                (searchedUser.bondId ? (
                  <p className='invite-btn bonded'>bonded</p>
                ) : searchedUser.pendingInvite ? (
                  <p
                    className='invite-btn pending'
                    onClick={inviteUserToBond(searchedUser.id)}
                  >
                    Pending
                  </p>
                ) : (
                  <p
                    className='invite-btn'
                    onClick={inviteUserToBond(searchedUser.id)}
                  >
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
