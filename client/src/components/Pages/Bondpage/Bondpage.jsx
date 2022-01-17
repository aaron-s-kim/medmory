import React, { useContext } from 'react';
import { StateContext } from 'context/StateProvider';

import logoImage from 'assets/images/logo.svg';
import default_avatar from 'assets/images/avatar.png';

import './bondpage.scss';

const Bondpage = ({ history }) => {
  const { isAuth, bond } = useContext(StateContext);

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
          <h4>{bond.bondUsers.length} people in this bond:</h4>
          <div className='bond-user-list'>
            {bond.bondUsers.map(user => (
              <div
                key={user.id}
                className='bond-user-container'
                onClick={() => history.push(`/view-user/${user.id}`)}
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
