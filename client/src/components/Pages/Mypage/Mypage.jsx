import React, { useContext } from 'react';
import axios from 'axios';

import { StateContext } from '../../../context/StateProvider';
import './mypage.scss';
import default_avatar from 'assets/images/avatar.png';

const Mypage = () => {
  const { isAuth, user, userMedGroupArr } = useContext(StateContext);

  const complianceClick = e => {
    const value = e.currentTarget.getAttribute('medgroupid');
    const reqBody = {
      med_group_id: value,
    };

    axios
      .post('/med_histories', reqBody)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <div className='mypage'>
      {isAuth && user ? (
        <div>
          <p>--user signed in--</p>
          <br />

          <div className='user-profile'>
            <h2>User Profile</h2>
            <img
              src={user.imageUrl ? user.imageUrl : default_avatar}
              alt='user_avatar'
              width='140'
            />
            <p>
              user: {user.firstName} {user.lastName}
            </p>
            <p>email: {user.email}</p>
          </div>
          <br />

          <div className='user-med-group'>
            <h2>Medication Group</h2>
            {!userMedGroupArr.length ? (
              <p>No medication groups have been created</p>
            ) : (
              userMedGroupArr.map((medGroupItem, index) => (
                <div key={index}>
                  <p>Name: {medGroupItem.name}</p>
                  <button
                    onClick={complianceClick}
                    medgroupid={medGroupItem.id}
                  >
                    Confirm Medication Taken
                  </button>
                  <br />
                  <br />
                  <br />
                </div>
              ))
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
