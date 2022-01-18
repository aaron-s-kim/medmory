import React from 'react';

import './overlay.scss';

const Overlay = ({ setMedgroupToDisplay }) => {
  return (
    <div
      className='overlay'
      onClick={() => setMedgroupToDisplay({ medGroupName: '', meds: [] })}
    />
  );
};

export default Overlay;
