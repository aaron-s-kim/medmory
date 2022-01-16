import React, { useContext } from 'react';
import axios from 'axios';

import { StateContext } from '../../../context/StateProvider';
import './mypage.scss';
import default_avatar from 'assets/images/avatar.png';


const Mypage = () => {
  const state = useContext(StateContext);

  const complianceClick = e => {
    const value = e.currentTarget.getAttribute("medgroupid")
    const reqBody = {
      med_group_id: value
    }

    axios
      .post('/med_histories', reqBody)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

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
            : state.userMedGroupArr.map((medGroupItem, index) => 
              <div key={ index }>
                <p>Name: {medGroupItem.name}</p>
                <button onClick={complianceClick} medgroupid={medGroupItem.id}>
                  Confirm Medication Taken
                </button>
                <br /><br /><br />
              </div>
            )}
          </div>
          
        </div>
      ) : (
        <p>--user not signed in yet--</p>
      )}
    </div>
  );
};

export default Mypage;
