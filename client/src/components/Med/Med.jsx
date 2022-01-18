import React from 'react';
import axios from 'axios';

import './med.scss';

const Med = ({
  id,
  name,
  dosage,
  measure,
  numOfPill,
  pillType,
  medsIdToHide,
  setMedsIdToHide,
}) => {
  const addMedIdToHide = () => {
    setMedsIdToHide(prevState => [...prevState, id]);
    axios
      .delete(`/meds/${id}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.response.data.error));
  };

  const isHidden = medsIdToHide.includes(id);

  return (
    <div className={`med-container ${isHidden && 'hidden-med-container'}`}>
      <span>{name}</span>
      <span>{dosage ? `${dosage}${measure}` : '-'}</span>
      <span>{numOfPill ? `${numOfPill}${pillType}` : '-'}</span>
      <span>
        <small className='med-remove-btn' onClick={addMedIdToHide}>
          Delete
        </small>
      </span>
    </div>
  );
};

export default Med;
