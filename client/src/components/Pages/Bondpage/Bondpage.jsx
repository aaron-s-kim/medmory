import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { StateContext, SetStateContext } from 'context/StateProvider';

import logoImage from 'assets/images/logo.svg';
import default_avatar from 'assets/images/avatar.png';

import { getFilteredBondUsers } from 'utils/data-shape';

import './bondpage.scss';
import axios from 'axios';

const Bondpage = ({ history }) => {
  const { isAuth, bond, user } = useContext(StateContext);
  const setState = useContext(SetStateContext);
  
  const INITIAL_NEW_BOND_INPUT = {
    id: '',
    newBondName: '',
    newBondImageUrl: '',
    bondUsers: [],
  }
  const [ newBondInput, setNewBondInput ] = useState(INITIAL_NEW_BOND_INPUT);
  const { newBondName, newBondImageUrl } = newBondInput;

  const handleChangeOnNewBond = e => {
    const { value, name } = e.target;
    setNewBondInput({ ...newBondInput, [name]: value });
  };

  const createNewBond = e => {
    e.preventDefault();
    
    const reqBody = {
      name: newBondName,
      image_url: newBondImageUrl,
    }

      axios
        .post('/bonds', reqBody)
        .then(res => {
          setState(prev => ({
            ...prev,
            bond: {
              id: res.data.id,
              name: res.data.name,
              imageUrl: res.data.image_url,
              bondUsers: [user],
            }
          }))
        })
        .catch(err => console.error(err));
  }



  if (!isAuth) return <Redirect to='/' />;

  return (
    <div className='bond-page-container'>
      {bond ? (
        <div className='show-bond-view'>
          <div className='above-bond-user-list'>
            <div className='bond-name-container'>{isAuth && <h2>{bond.name}</h2>}</div>
            <img
              src={bond.imageUrl ? bond.imageUrl : logoImage}
              width='300px'
              alt='bond'
            />
            <h4>{bond.bondUsers.length - 1} other people in this bond:</h4>
          </div>
          <div className='bond-user-list'>
            {getFilteredBondUsers(user.id, bond.bondUsers).map(user => (
              <div
                key={user.id}
                className='bond-user-container'
                onClick={() => history.push(`/mypage/${user.id}`)}
              >
                <img
                  src={user.imageUrl ? user.imageUrl : default_avatar}
                  width='70px'
                  alt='user'
                />
                <p>
                  <strong>{`${user.firstName} ${user.lastName}`}</strong>
                </p>
                <p>Email: {user.email}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className='create-bond-view'>
            <p>You are currently un-bonded</p>
            <h3>Create a New Bond:</h3>
            <div>
              <form onSubmit={createNewBond}>
                <div className='new-bond-info-container'>
                  <input
                    className='new-bond-name-input'
                    name='newBondName'
                    type='text'
                    value={newBondName}
                    placeholder='New Bond Name...'
                    onChange={handleChangeOnNewBond}
                    required={true}
                  />
                </div>
                <div className='new-bond-info-container'>
                  <input
                    className='new-bond-imageUrl-input'
                    name='newBondImageUrl'
                    type='text'
                    value={newBondImageUrl}
                    placeholder='Image Url...'
                    onChange={handleChangeOnNewBond}
                    required={false}
                  />
                </div>
                <div className='create-new-bond-btn-container'>
                  <button type='submit' className='create-new-bond-btn'>
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Bondpage;
