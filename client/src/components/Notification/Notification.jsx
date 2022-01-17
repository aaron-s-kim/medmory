import React from 'react';

import './notification.scss';

const Notification = () => {
  return (
    <div className='notification'>
      <div className='notification-message-container'>
        <p>You have a pending invite from bond</p>
      </div>
      <div className='notification-option-container'>
        <p>Decline</p>
        <p>Accept</p>
      </div>
    </div>
  );
};

export default Notification;
