import React, { useState, useEffect } from 'react';
import axios from 'axios';

import UserSearchImage from 'components/UserSearchImage/UserSearchImage';

import { getEncryptedEmail } from 'utils/data-shape';

import './searchResultContainer.scss';

const SearchResultContainer = ({ userResult, userBond, searchWord }) => {
  const [userResultLocalState, setUserResultLocalState] = useState([]);

  useEffect(() => {
    setUserResultLocalState([...userResult]);
    if (searchWord === '') {
      setUserResultLocalState([]);
    }
  }, [userResult]);

  const inviteUserToBond = userIdToInvite => {
    if (!userBond) return;

    const reqBody = {
      user_id: userIdToInvite,
      bond_id: userBond.id,
    };

    axios
      .post('/bond_invites', reqBody)
      .then(() => {})
      .catch(err => console.log(err.response.data.error));

    setUserResultLocalState(prevState => {
      return prevState.map(user => {
        if (+user.id === userIdToInvite) {
          return {
            ...user,
            pendingInvite: true,
          };
        }
        return user;
      });
    });
  };

  return (
    <div className='search-result-container'>
      {userResultLocalState.length > 0
        ? userResultLocalState.map(searchedUser => (
            <div className='user-on-search' key={searchedUser.id}>
              <UserSearchImage userImageUrl={searchedUser.imageUrl} />
              <p className='user-on-search-name'>
                {searchedUser.firstName}, {searchedUser.lastName}
              </p>
              <p className='user-on-search-email'>
                {getEncryptedEmail(searchedUser.email)}
              </p>
              {searchedUser.bondId ? (
                <p className='invite-btn bonded'>bonded</p>
              ) : searchedUser.pendingInvite ? (
                <p className='invite-btn pending'>Pending</p>
              ) : (
                <p
                  className={`invite-btn ${!userBond && 'disabled-btn'}`}
                  onClick={() => inviteUserToBond(searchedUser.id)}
                >
                  Invite+
                </p>
              )}
            </div>
          ))
        : searchWord !== '' && (
            <p className='no-result-message'>No matching user found</p>
          )}
    </div>
  );
};

export default SearchResultContainer;
