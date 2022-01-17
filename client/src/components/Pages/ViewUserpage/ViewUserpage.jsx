import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';

import { StateContext } from 'context/StateProvider';

import default_avatar from '../../../assets/images/avatar.png';

const ViewUserpage = ({ match }) => {
  const { isAuth } = useContext(StateContext);
  const [viewUserState, setViewUserState] = useState({});
  const { viewUser, userMedGroupArr } = viewUserState;

  useEffect(() => {
    axios
      .get(`/users/${match.params.userId}`)
      .then(res =>
        setViewUserState({
          ...res.data,
          viewUser: res.data.user,
        })
      )
      .catch(err => console.log(err.response.data.error));
  }, []);

  if (!isAuth) return <Redirect to='/' />;
  return (
    <div className='mypage'>
      {viewUser && (
        <>
          <div>
            <div className='user-profile'>
              <h2>User Profile</h2>
              <img
                src={viewUser.imageUrl ? viewUser.imageUrl : default_avatar}
                alt='user_avatar'
                width='140'
              />
              <p>
                user: {viewUser.firstName} {viewUser.lastName}
              </p>
              <p>email: {viewUser.email}</p>
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
