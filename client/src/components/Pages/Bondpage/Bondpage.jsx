import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { StateContext } from 'context/StateProvider';

import logoImage from 'assets/images/logo.svg';
import default_avatar from 'assets/images/avatar.png';

import { getFilteredBondUsers } from 'utils/data-shape';

import './bondpage.scss';

const Bondpage = ({ history }) => {
  const { isAuth, bond, user } = useContext(StateContext);

  if (!isAuth) return <Redirect to='/' />;
  return (
    <>
      {bond ? (
        <>
          <div>{isAuth && <h2>{bond.name}</h2>}</div>
          <img
            src={bond.imageUrl ? bond.imageUrl : logoImage}
            width='300px'
            alt='bond'
          />
          <h4>{bond.bondUsers.length - 1} other people in this bond:</h4>
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
        </>
      ) : (
        <>
          <div>You are currently not bonded</div>
          <a href='/'>Homepage</a>
        </>
      )}
    </>
  );
};

export default Bondpage;
