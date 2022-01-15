import React, { useContext } from 'react';

import { StateContext } from '../../../App';

import './mypage.scss';

const Mypage = () => {
  const state = useContext(StateContext);

  return (
    <div className='mypage'>
      {state.user ? (
        <div>
          <h2>user: {state.user.first_name}</h2>
          <h2>med group name: {state.medGroup.name}</h2>
        </div>
      ) : (
        <p>user not signed in yet</p>
      )}
    </div>
  );
};

export default Mypage;
