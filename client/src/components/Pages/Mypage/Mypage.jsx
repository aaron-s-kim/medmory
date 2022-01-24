import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import MedGroupPopup from 'components/MedGroupPopup/MedGroupPopup';
import Overlay from 'components/Overlay/Overlay';
import MedGroup from 'components/MedGroup/MedGroup';
import UserProfile from 'components/UserProfile/UserProfile';
import AddMedGroupButton from 'components/AddMedGroupButton/AddMedGroupButton';
import Notification from 'components/Notification/Notification';

import {
  StateContext,
  SetStateContext,
  INITIAL_STATE,
} from '../../../context/StateProvider';
import { getAuthUserData } from 'utils/data-fetch';

import './mypage.scss';

const Mypage = ({ history, match }) => {
  const { isAuth, user, userMedGroupArr, bond, pendingInvite } =
    useContext(StateContext);
  const setState = useContext(SetStateContext);

  const [userToView, setUserToView] = useState(INITIAL_STATE);

  const userIdToView = +match.params.userId;
  let viewMode, isBondedUserId;
  if (user && bond) {
    viewMode = userIdToView !== user.id;
    isBondedUserId = bond.bondUsers.map(user => user.id).includes(userIdToView);
  }

  useEffect(() => {
    if (viewMode && isBondedUserId) {
      axios
        .get(`/users/${userIdToView}`)
        .then(res => setUserToView({ ...res.data }))
        .catch(err => console.log(err.response.data.error));
    }
  }, [userIdToView]);

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
    <div className={`mypage ${user.easyMode && 'easy-mypage'}`}>
      {medGroupToDisplay.medGroupName && (
        <MedGroupPopup
          {...medGroupToDisplay}
          closePopup={closePopup}
          viewMode={viewMode && userToView}
          easyMode={user.easyMode}
        />
      )}
      {medGroupToDisplay.medGroupName && <Overlay closePopup={closePopup} />}
      <div className='user-section'>
        {viewMode && userToView && (
          <h2 className='view-mode-notification'>
            Viewing:{' '}
            <strong>{userToView.user && userToView.user.firstName}</strong>
          </h2>
        )}
        {pendingInvite && <Notification />}
        <UserProfile
          user={viewMode && userToView.user ? userToView.user : user}
          viewMode={viewMode && userToView}
          easyMode={user.easyMode}
        />
      </div>
      <div className='user-med-group-container'>
        {viewMode && userToView.user
          ? userToView.userMedGroupArr.length > 0 &&
            userToView.userMedGroupArr.map(medGroupItem => (
              <MedGroup
                key={medGroupItem.id}
                medGroupId={medGroupItem.id}
                {...medGroupItem}
                history={history}
                setMedgroupToDisplay={setMedgroupToDisplay}
                viewMode={viewMode && userToView}
              />
            ))
          : userMedGroupArr.length > 0 &&
            userMedGroupArr.map(medGroupItem => (
              <MedGroup
                key={medGroupItem.id}
                medGroupId={medGroupItem.id}
                {...medGroupItem}
                history={history}
                setMedgroupToDisplay={setMedgroupToDisplay}
                easyMode={user.easyMode}
              />
            ))}
        {!(viewMode && userToView.user) && (
          <AddMedGroupButton
            setMedgroupToDisplay={setMedgroupToDisplay}
            easyMode={user.easyMode}
          />
        )}
      </div>
    </div>
  );
};

export default Mypage;
