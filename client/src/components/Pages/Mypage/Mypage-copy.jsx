import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { StateContext, SetStateContext } from '../../../context/StateProvider';
import defaultAvatar from 'assets/images/avatar.png';
import './mypagecopy.scss';

const Mypage = () => {
  const { isAuth, user, userMedGroupArr } = useContext(StateContext);
  const setState = useContext(SetStateContext);



  const complianceClick = e => {
    const value = e.currentTarget.getAttribute('medgroupid');
    const reqBody = { med_group_id: value };

    axios
      .post('/med_histories', reqBody)
      .then(res => {
        const mgItemArr = userMedGroupArr.map(medGroupItem => {
          if (medGroupItem.id === Number(value)) {
            medGroupItem.isCompliedToday = true;
          }
          return medGroupItem;
        });
        setState({ isAuth, user, userMedGroupArr: mgItemArr });
      })
      .catch(err => console.log(err));
  };

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
            <div key={medGroupItem.id} class='med-group-containter'>
              <h3
                className='med-group-name'
              >
                {medGroupItem.name}
              </h3>

              {medGroupItem.isCompliedToday ? (
                <p className='message-taken'>Medication taken ✅ </p>
              ) : (
                <div className='message-not-taken-container'>
                  <p className='message-not-taken'>NOT taken yet❌</p>
                  <p className='take-btn' onClick={complianceClick}>
                    Take it
                  </p>
                </div>
              )}
              <div className='med-group-btn-container'>
                <p className='med-group-btn'>Edit</p>
                <p className='med-group-btn'>Detail</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Mypage;
