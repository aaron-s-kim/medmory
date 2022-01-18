import React from 'react';

import './addMedGroupButton.scss';

const AddMedGroupButton = () => {
  return (
    <div className='add-med-group-button-container'>
      <h3 className='message'>Add medication group</h3>
      <p
        className='add-med-group-btn'
        onClick={() => console.log('add med group')}
      >
        Add
      </p>
    </div>
  );
};

export default AddMedGroupButton;
