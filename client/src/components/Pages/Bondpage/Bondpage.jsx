import React, { useContext } from 'react';
import { StateContext } from 'context/StateProvider';

import logoImage from 'assets/images/logo.svg';
import default_avatar from 'assets/images/avatar.png';
import axios from 'axios';

const Bondpage = () => {
  const { isAuth, user, bond } = useContext(StateContext);
 
  
  return (
  <>
    <div>{isAuth && <h2>{bond.name}</h2>}</div>
    {bond ? (
      <>
        <img 
          src={bond.imageUrl ? bond.imageUrl : logoImage }
          width='300px'
        />
        <h4>{bond.bondUsers.length} people in this bond:</h4>
        <div className="bond-user-list">
          <ol>{bond.bondUsers.map(user =>
            <li key={user.id}>
              <p><strong>{`${user.firstName} ${user.lastName}`}</strong></p>
              <img 
                src={user.imageUrl ? user.imageUrl : default_avatar}
                width='100px'
                />
              <p>Email: {user.email}</p> 
              <hr />
            </li>
            )}
          </ol>
        </div>
      </>
    ) : (
      <>
        <div>You are currently not bonded</div>
        <a href="/">Homepage</a>
      </>
    )}
  </>
    )
};

export default Bondpage;
