import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';

import MedGroup from 'components/MedGroup/MedGroup';

import { StateContext } from '../../../context/StateProvider';
import defaultAvatar from 'assets/images/avatar.png';
import './mypagecopy.scss';

const Mypage = ({ history }) => {
  const { isAuth, user, userMedGroupArr } = useContext(StateContext);

  if (!isAuth) return <Redirect to='/' />;
  return (
    <div className='mypage'>
      <div className='user-profile-container'>
        {user.imageUrl ? (
          <div
            className='user-image'
            style={{
              backgroundImage: `url(${user.imageUrl})`,
            }}
          />
        ) : (
          <img className='user-image' src={defaultAvatar} alt='user-pic' />
        )}
        <div className='user-info-container'>
          <div className='user-info'>
            <p>
              <strong>User:</strong> {user.firstName} {user.lastName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
          <div>
            <p className='add-med-group-btn'>Add medication group</p>
          </div>
          <div>
            <p className='add-med-group-btn'>Edit User info</p>
          </div>
        </div>
      </div>
      <div className='user-med-group-container'>
        <h2 className='title'>Medication Group</h2>
        {!userMedGroupArr.length ? (
          <p>No medication groups have been created</p>
        ) : (
          userMedGroupArr.map(medGroupItem => (
            <MedGroup
              key={medGroupItem.id}
              {...medGroupItem}
              history={history}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Mypage;
