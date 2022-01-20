import React, { useContext, useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import MedGroupPopup from 'components/MedGroupPopup/MedGroupPopup';
import Overlay from 'components/Overlay/Overlay';
import MedGroup from 'components/MedGroup/MedGroup';
import UserProfile from 'components/UserProfile/UserProfile';
import AddMedGroupButton from 'components/AddMedGroupButton/AddMedGroupButton';
import Notification from 'components/Notification/Notification';

import { StateContext, SetStateContext } from '../../../context/StateProvider';
import { getAuthUserData } from 'utils/data-fetch';

import './mypage.scss';

const Mypage = ({ history, match }) => {
  const state = useContext(StateContext);
  const { isAuth, user, userMedGroupArr, bond, pendingInvite } = state;
  const setState = useContext(SetStateContext);

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
        .then(res =>
          setState(prevState => ({
            ...prevState,
            userToView: res.data,
          }))
        )
        .catch(err => console.log(err.response.data.error));
    }
  }, []);

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
      {!viewMode && medGroupToDisplay.medGroupName && (
        <MedGroupPopup {...medGroupToDisplay} closePopup={closePopup} />
      )}
      {!viewMode && medGroupToDisplay.medGroupName && (
        <Overlay closePopup={closePopup} />
      )}
      <div className='user-section'>
        {pendingInvite && <Notification />}
        {viewMode && state.userToView && <p>viewing someone's </p>}
        <UserProfile
          user={viewMode && state.userToView ? state.userToView.user : user}
          viewMode={viewMode && state.userToView}
        />
      </div>
      <div className='user-med-group-container'>
        {viewMode && state.userToView
          ? state.userToView.userMedGroupArr.length &&
            state.userToView.userMedGroupArr.map(medGroupItem => (
              <MedGroup
                key={medGroupItem.id}
                medGroupId={medGroupItem.id}
                {...medGroupItem}
                history={history}
                setMedgroupToDisplay={setMedgroupToDisplay}
                viewMode={viewMode && state.userToView}
              />
            ))
          : userMedGroupArr.length &&
            userMedGroupArr.map(medGroupItem => (
              <MedGroup
                key={medGroupItem.id}
                medGroupId={medGroupItem.id}
                {...medGroupItem}
                history={history}
                setMedgroupToDisplay={setMedgroupToDisplay}
                // viewMode={viewMode}
              />
            ))}
        {!(viewMode && state.userToView) && (
          <AddMedGroupButton setMedgroupToDisplay={setMedgroupToDisplay} />
        )}
      </div>
    </div>
  );
};

export default Mypage;
