import React from 'react';

import logoImage from 'assets/images/logo.svg';

import './bondInfoSection.scss';

const BondInfoSection = ({bond}) => {
  return (
    <div className='beside-bond-user-list'>
      <img
        src={bond.imageUrl ? bond.imageUrl : logoImage}
        width='300px'
        alt='bond'
      />
      <div className='bond-name-container'>
        {bond && <h2>{bond.name}</h2>}
        <div className='number-of-bond-users'>
          <h4>{bond.bondUsers.length - 1} other people in this bond:</h4>
        </div>
      </div>
    </div>
  );
};

export default BondInfoSection;
