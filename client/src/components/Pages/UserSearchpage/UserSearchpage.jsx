import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';

import { StateContext } from 'context/StateProvider';

import { getFilteredUsers } from 'utils/data-shape';

import defaultUserImage from '../../../assets/images/avatar.png';

import './userSearchpage.scss';

const UserSearchpage = () => {
  const { user, isAuth, bond } = useContext(StateContext);
  const [searchWord, setSearchWord] = useState('');
  const [userResult, setUserResult] = useState([]);

  useEffect(() => {});

  useEffect(() => {
    if (searchWord.length > 0) {
      axios
        .get('/users')
        .then(res =>
          setUserResult(getFilteredUsers(user.id, searchWord, res.data))
        )
        .catch(err => console.log(err.response.data.error));
    }

    if (searchWord === '') {
      setUserResult([]);
    }
  }, [searchWord]);

  const inviteUserToBond = () => {
    console.log('invite user button clicked');
  };

  const handleChange = e => {
    const { value } = e.target;
    setSearchWord(value);
  };
  if (!isAuth) return <Redirect to='/' />;
  return (
    <div className='searchpage'>
      <div className='search-bar-container'>
        <input
          className='search-bar'
          type='text'
          value={searchWord}
          onChange={handleChange}
          placeholder='Search by email'
        />
      </div>
      <div className='search-result-container'>
        {userResult.length > 0 &&
          userResult.map(user => (
            <div className='user-on-search' key={user.id}>
              <div className='user-image-container'>
                {user.imageUrl ? (
                  <div
                    className='user-image'
                    style={{
                      backgroundImage: `url(${user.imageUrl})`,
                    }}
                  />
                ) : (
                  <img
                    className='user-image'
                    src={defaultUserImage}
                    alt='user-pic'
                  />
                )}
              </div>
              <p>
                {user.firstName}, {user.lastName}
              </p>
              <p>{user.email}</p>
              {bond &&
                (user.bond_id ? (
                  <p className='invite-btn bonded'>bonded</p>
                ) : (
                  <p className='invite-btn' onClick={inviteUserToBond}>
                    Invite +
                  </p>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserSearchpage;
