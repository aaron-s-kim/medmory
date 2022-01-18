import React from 'react';

import './overlay.scss';

const Overlay = ({ closePopup }) => {
  return (
    <div
      className='overlay'
      onClick={() => closePopup()}
    />
  );
};

export default Overlay;
