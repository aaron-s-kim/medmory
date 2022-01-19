import React, { useState, useContext } from 'react';
import axios from 'axios';

import Med from 'components/Med/Med';
import MedInput from 'components/MedInput/MedInput';

import { SetStateContext, StateContext } from 'context/StateProvider';

import { getAuthUserData } from 'utils/data-fetch';
import { getFilteredBondUsers } from 'utils/data-shape';

import './medGroupPopup.scss';

const INITIAL_MED_INPUT = {
  name: '',
  dosage: '',
  measure: 'mg',
  num: '',
  pillType: 'tablet',
};

const AddMedPopup = ({
  meds,
  medGroupId,
  medGroupName,
  medGroupDetail,
  careTakerId,
  complianceTime,
  closePopup,
}) => {
  const setState = useContext(SetStateContext);
  const {
    bond: { bondUsers },
    user,
  } = useContext(StateContext);

  const INITIAL_MED_GROUP_INPUT = {
    newName: medGroupName,
    newComplianceTime: complianceTime,
    newMedGroupDetail: medGroupDetail,
    newCareTakerId: careTakerId,
  };

  const [medsIdToHide, setMedsIdToHide] = useState([]);
  const [medGroupInput, setMedGroupInput] = useState(INITIAL_MED_GROUP_INPUT);
  const [medInputArr, setMedInputArr] = useState([INITIAL_MED_INPUT]);
  const { newName, newComplianceTime, newMedGroupDetail, newCareTakerId } =
    medGroupInput;

  const addMedInput = () => {
    setMedInputArr(prevMedInputArr => [...prevMedInputArr, INITIAL_MED_INPUT]);
  };

  const getUpdateMedGroupPromise = () => {
    const reqBody = {
      name: newName,
      compliance_time: newComplianceTime,
      detail: newMedGroupDetail,
      message_to: newCareTakerId,
    };

    return axios.put(`/med_groups/${medGroupId}`, reqBody);
  };

  const getCreateMedGroupPromise = () => {
    const reqBody = {
      name: newName,
      compliance_time: newComplianceTime,
      detail: newMedGroupDetail,
      message_to: newCareTakerId,
      user_id: user.id,
    };

    return axios.post('/med_groups', reqBody);
  };

  const getCreateMedPromiseArr = (medArr, medGroupIdToSave = medGroupId) => {
    return medArr
      .map(medInput => {
        if (medInput.name === '' || medInput.num < 0 || medInput.dosage < 0)
          return null;

        const reqBody = {
          ...medInput,
          pill_type: medInput.pillType,
          med_group_id: medGroupIdToSave,
        };

        return axios.post('/meds', reqBody);
      })
      .filter(axiosCall => axiosCall !== null);
  };

  const handleChangeOnMedGroup = e => {
    const { value, name } = e.target;
    setMedGroupInput({ ...medGroupInput, [name]: value });
  };

  const startSavingMedGroup = e => {
    e.preventDefault();

    if (medGroupId === '') {
      getCreateMedGroupPromise().then(res => {
        Promise.all(getCreateMedPromiseArr(medInputArr, res.data.id))
          .then(() => {
            closePopup();
            getAuthUserData(setState);
          })
          .catch(err => console.log(err.response.data.error));
      });
    } else {
      Promise.all([
        ...getCreateMedPromiseArr(medInputArr),
        getUpdateMedGroupPromise(),
      ])
        .then(() => {
          closePopup();
          getAuthUserData(setState);
        })
        .catch(err => console.log(err.response.data.error));
    }
  };

  const deleteMedGroup = () => {
    axios
      .delete(`/med_groups/${medGroupId}`)
      .then(() => {
        closePopup();
        getAuthUserData(setState);
      })
      .catch(err => console.log(err.response.data.error));
  };

  return (
    <div className='med-group-popup'>
      <form onSubmit={startSavingMedGroup}>
        <div className='med-group-info-container'>
          <input
            className='med-group-name-input'
            name='newName'
            type='text'
            value={newName}
            placeholder='Med group name'
            onChange={handleChangeOnMedGroup}
            required={true}
          />
        </div>
        <div className='med-group-info-container'>
          <strong>Detail</strong>
          <input
            className='med-group-detail-input'
            name='newMedGroupDetail'
            type='text'
            value={newMedGroupDetail}
            placeholder='Detail'
            onChange={handleChangeOnMedGroup}
          />
        </div>
        <div className='med-group-info-container'>
          <strong>Compliance time(hr)</strong>
          <input
            className='med-grouop-compliance-time-input'
            name='newComplianceTime'
            type='number'
            value={newComplianceTime}
            placeholder='Hour'
            onChange={handleChangeOnMedGroup}
          />
        </div>
        <div className='med-group-info-container'>
          <strong>Notify</strong>
          {getFilteredBondUsers(user.id, bondUsers).length > 0 ? (
            <select
              name='newCareTakerId'
              onChange={handleChangeOnMedGroup}
              value={newCareTakerId}
            >
              <option value='' default>
                None
              </option>
              {getFilteredBondUsers(user.id, bondUsers).map(user => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
          ) : (
            <small>No other users in your bond</small>
          )}
        </div>
        <strong>Registered medications</strong>
        <div className='med-table'>
          <div className='med-table-head'>
            <strong>Name</strong>
            <strong>Dosage</strong>
            <strong>Quantity</strong>
            <strong></strong>
          </div>
          {meds.map(med => (
            <Med
              key={med.id}
              {...med}
              setMedsIdToHide={setMedsIdToHide}
              medsIdToHide={medsIdToHide}
            />
          ))}
        </div>
        {medInputArr.map((medInputObj, i, medInputArr) => (
          <MedInput
            key={i}
            id={i}
            setMedInputArr={setMedInputArr}
            addMedInput={addMedInput}
            numOfMedInput={medInputArr.length}
          />
        ))}
        <div className='save-med-group-btn-container'>
          <button type='submit' className='save-med-group-btn'>
            Save
          </button>
        </div>
      </form>
      <div className='delete-med-group-btn-container'>
        <button
          type='button'
          className='delete-med-group-btn'
          onClick={deleteMedGroup}
        >
          Delete medication group
        </button>
      </div>
    </div>
  );
};

export default AddMedPopup;