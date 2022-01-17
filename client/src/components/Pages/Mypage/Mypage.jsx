import React, { useContext, useState } from 'react';
import axios from 'axios';

import { StateContext, SetStateContext } from '../../../context/StateProvider';
import './mypage.scss';
import default_avatar from 'assets/images/avatar.png';
import Popup from './Popup';

const Mypage = () => {
  const { isAuth, user, userMedGroupArr } = useContext(StateContext);
  const setState = useContext(SetStateContext);
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const complianceClick = e => {
    const value = e.currentTarget.getAttribute('medgroupid');
    const reqBody = {
      med_group_id: value,
    };

    axios
      .post('/med_histories', reqBody)
      .then((res) => {
        const mgItemArr = userMedGroupArr.map(medGroupItem => {
          if (medGroupItem.id === Number(value)) {
            medGroupItem.isCompliedToday = true;
          }
          return medGroupItem;
        })
        setState({ isAuth, user, userMedGroupArr: mgItemArr });
      })
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
              alt="user_avatar"
              width='140'
            />
            <p>user: {user.firstName} {user.lastName}</p>
            <p>email: {user.email}</p>
          </div>
          <br />

          <div className='user-med-group'>
            <h2>Medication Group</h2>
            {!userMedGroupArr.length ?
              <p>No medication groups have been created</p>
            : userMedGroupArr.map((medGroupItem, index) => 
              <div key={ index }>
                {JSON.stringify(medGroupItem)}
                <p><a href={/med_groups/ + medGroupItem.id}><strong>Name:</strong>{medGroupItem.name}</a></p>
                {medGroupItem.isCompliedToday ?
                  <p>*Medication has been taken*</p>
                : <button onClick={complianceClick} medgroupid={medGroupItem.id}>
                    Confirm Medication Taken
                  </button>
                }
                <br />

                <input
                  type="button"
                  value="Click to Open Popup"
                  onClick={togglePopup}
                />

                <p>Lorem ipsum dolor sit amet</p>
                {isOpen && <Popup
                  content={<>
                    <b>Design your Popup</b>
                    <p>p element inside Popup.</p>
                    <button>Test button</button>
                  </>}
                  handleClose={togglePopup}
                />}

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
