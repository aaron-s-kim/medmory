import React from 'react';

import './overlay.scss';

const Overlay = ({ closePopup, background }) => {
  return (
    <div
      className={`overlay ${background && 'background'}`}
      onClick={() => closePopup()}
    />
  );
};

export default Overlay;
