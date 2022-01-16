import React, { useContext } from 'react';

import { StateContext } from '../../../context/StateProvider';

import './mypage.scss';

const Mypage = () => {
  const state = useContext(StateContext);

  return (
    <div className='mypage'>
      {state.isAuth ? (
        <div>
          <p>user signed in</p>
          <img src={state.user.imageUrl} alt="user_avatar" width="140" />
          <h2>
            user: {state.user.firstName} {state.user.lastName}
          </h2>
          <h2>email: {state.user.email}</h2>
        </div>
      ) : (
        <p>user not signed in yet</p>
      )}
    </div>
  );
};

export default Mypage;
