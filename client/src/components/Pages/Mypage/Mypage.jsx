import React, { useContext, useState } from 'react';
import axios from 'axios';

import { StateContext, SetStateContext } from '../../../context/StateProvider';
import './mypage.scss';
import default_avatar from 'assets/images/avatar.png';
import Popup from './Popup';

const Mypage = () => {
  const { isAuth, user, userMedGroupArr } = useContext(StateContext);
  const setState = useContext(SetStateContext);
  const [showstate, setShowstate] = useState({});

  // console.log("userMedGroupArr", userMedGroupArr)

  // adds med_groups id to med_histories table > updates state isCompliedToday
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

  const togglePopup = id => {
    setShowstate(prev => ({ ...prev, [id]: !prev[id] }));
    // console.log(JSON.stringify(showstate));
    // showstate[id] ?
    // console.log("popup closed")
    // : console.log("popup open");
  };

  return (
    <div className='mypage'>
      {isAuth && user ? (
        <div>
          <div className='user-profile-container'>
            <div className='user-image'>
              <img
                src={user.imageUrl ? user.imageUrl : default_avatar}
                alt='user_avatar'
                width='140'
              />
            </div>
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
            </div>
          </div>
          <br />

          <div className='user-med-group'>
            <h2>Medication Group</h2>
            {!userMedGroupArr.length ? (
              <p>No medication groups have been created</p>
            ) : (
              userMedGroupArr.map(medGroupItem => (
                <div key={medGroupItem.id}>
                  <h3 onClick={() => togglePopup(medGroupItem.id)}>
                    <u>{medGroupItem.name}</u>
                  </h3>
                  {showstate[medGroupItem.id] ? (
                    <Popup
                      medGroupObj={medGroupItem}
                      handleClose={togglePopup}
                      show={showstate}
                      setShow={setShowstate}
                      togglePopup={togglePopup}
                      // meds={medstate}
                    />
                  ) : null}

                  {medGroupItem.isCompliedToday ? (
                    <p>*Medication has been taken*</p>
                  ) : (
                    <button
                      onClick={complianceClick}
                      medgroupid={medGroupItem.id}
                    >
                      Confirm Medication Taken
                    </button>
                  )}
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
