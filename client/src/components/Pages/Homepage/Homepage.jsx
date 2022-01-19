import React, { useContext } from 'react';
import { StateContext } from 'context/StateProvider';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

import SignInForm from 'components/SignInForm/SignInForm';

import './homepage.scss';

const Homepage = () => {
  const { user } = useContext(StateContext);

  if (user) return <Redirect to={`/mypage/${user.id}`} />;
  return (
    <div className='homepage'>
      <div className='sign-in-container'>
        <SignInForm />
      </div>
    </div>
  );
};

export default Homepage;
