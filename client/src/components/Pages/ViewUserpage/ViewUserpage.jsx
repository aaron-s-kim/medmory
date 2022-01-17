import React, { useState, useEffect } from 'react';
import axios from 'axios';

import default_avatar from '../../../assets/images/avatar.png';

const ViewUserpage = ({ match }) => {
  const [userState, setUserState] = useState({});
  const { user, userMedGroupArr } = userState;

  useEffect(() => {
    axios
      .get(`/users/${match.params.userId}`)
      .then(res => setUserState(res.data))
      .catch(err => console.log(err.response.data.error));
  }, []);

  return (
    <div className='mypage'>
      {user && (
        <>
          <div>
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
                userMedGroupArr.map(medGroupItem => (
                  <div key={medGroupItem.id}>
                    <h3>
                      <u>{medGroupItem.name}</u>
                    </h3>
                    {medGroupItem.isCompliedToday ? (
                      <p>*Medication has been taken*</p>
                    ) : (
                      <p>*Medication has NOT been taken*</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewUserpage;
