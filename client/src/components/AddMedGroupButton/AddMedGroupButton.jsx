import React from 'react';

import './addMedGroupButton.scss';

const AddMedGroupButton = ({ setMedgroupToDisplay, easyMode }) => {
  return (
    <div
      className={`add-med-group-button-container ${
        easyMode && 'easy-add-med-group-button-container'
      }`}
    >
      <h3 className='message'>Add medication group</h3>
      <p
        className='add-med-group-btn'
        onClick={() =>
          setMedgroupToDisplay(prevState => ({
            ...prevState,
            medGroupName: 'Med Group Name',
          }))
        }
      >
        Add
      </p>
    </div>
  );
};

export default AddMedGroupButton;
