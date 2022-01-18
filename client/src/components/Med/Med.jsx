import React from 'react';

import './med.scss';

const Med = ({ id, name, dosage, measure, numOfPill, pillType }) => {
  return (
    <div className='med-container'>
      <span>{name}</span>
      <span>{dosage ? `${dosage}${measure}` : '-'}</span>
      <span>{numOfPill ? `${numOfPill}${pillType}` : '-'}</span>
      <span className='med-remove-btn'>remove</span>
    </div>
  );
};

export default Med;
