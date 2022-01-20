import React from 'react';

import UserSearchImage from 'components/UserSearchImage/UserSearchImage';

import './suggestedUserContainer.scss';

const SuggestedUserContainer = ({ userSuggestion }) => {
  return (
    <div className='user-suggestion-container'>
      <h3 className='user-suggestion-title'>You might know these people!</h3>
      <div className='suggested-user-container'>
        {userSuggestion.map(suggestedUser => (
          <div key={suggestedUser.id} className='suggested-user'>
            <UserSearchImage
              userImageUrl={suggestedUser.imageUrl}
              large={true}
            />
            <h3>
              {suggestedUser.firstName}, {suggestedUser.lastName}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedUserContainer;
