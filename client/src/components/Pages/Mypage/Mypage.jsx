import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';

import MedGroupPopup from 'components/MedGroupPopup/MedGroupPopup';
import Overlay from 'components/Overlay/Overlay';
import MedGroup from 'components/MedGroup/MedGroup';
import UserProfile from 'components/UserProfile/UserProfile';
import AddMedGroupButton from 'components/AddMedGroupButton/AddMedGroupButton';

import { StateContext, SetStateContext } from '../../../context/StateProvider';
import { getAuthUserData } from 'utils/data-fetch';

import './mypage.scss';

const Mypage = ({ history }) => {
  const { isAuth, user, userMedGroupArr } = useContext(StateContext);
  const setState = useContext(SetStateContext);

  const INITIAL_POPUP_STATE = {
    medGroupId: '',
    medGroupName: '',
    medGroupDetail: '',
    complianceTime: '',
    careTakerId: '',
    meds: [],
  };

  const [medGroupToDisplay, setMedgroupToDisplay] =
    useState(INITIAL_POPUP_STATE);

  const closePopup = () => {
    setMedgroupToDisplay(INITIAL_POPUP_STATE);
    getAuthUserData(setState);
  };

  if (!isAuth) return <Redirect to='/' />;
  return (
    <div className='mypage'>
      {medGroupToDisplay.medGroupName && (
        <MedGroupPopup {...medGroupToDisplay} closePopup={closePopup} />
      )}
      {medGroupToDisplay.medGroupName && <Overlay closePopup={closePopup} />}
      <UserProfile user={user} />
      <div className='user-med-group-container'>
        <h2 className='title'>Medication Group</h2>
        {userMedGroupArr.length &&
          userMedGroupArr.map(medGroupItem => (
            <MedGroup
              key={medGroupItem.id}
              medGroupId={medGroupItem.id}
              {...medGroupItem}
              history={history}
              setMedgroupToDisplay={setMedgroupToDisplay}
            />
          ))}
        <AddMedGroupButton setMedgroupToDisplay={setMedgroupToDisplay} />
      </div>
    </div>
  );
};

export default Mypage;
