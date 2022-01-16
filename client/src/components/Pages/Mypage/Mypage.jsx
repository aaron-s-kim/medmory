import React, { useContext } from 'react';

import { StateContext } from '../../../context/StateProvider';

import './mypage.scss';

import default_avatar from 'assets/images/avatar.png';

const Mypage = () => {
  const state = useContext(StateContext);

  const confirm = () => {
    console.log("button presssed");
  }

  return (
    <div className='mypage'>
      {state.isAuth ? (
        <div>
          <p>--user signed in--</p>
          <br />
          <div className='user-profile'>
            <h2>User Profile</h2>
            {state.user.imageUrl ? 
              <img src={state.user.imageUrl} alt="user_avatar" width="140" />
            : <img src={default_avatar} alt="default_avatar" width="140" />
            }
            <p>user: {state.user.firstName} {state.user.lastName}</p>
            <p>email: {state.user.email}</p>
          </div>
          <br />

          <div className='user-med-group'>
            <h2>Medication Group</h2>
            {!state.userMedGroupArr.length ?
              <p>No medication groups have been created</p>
            : <div>{state.userMedGroupArr.map((medGroupItem, index) =>
                <p key={ index }>Name: {medGroupItem.name}</p>
                )} 
                <button onClick={confirm}>Confirm Taken</button>
              </div>
            }
          </div>
          
        </div>
      ) : (
        <p>--user not signed in yet--</p>
      )}
    </div>
  );
};

export default Mypage;
