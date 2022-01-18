import React, { useContext } from 'react';
import { StateContext } from 'context/StateProvider';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

import SignInForm from 'components/SignInForm/SignInForm';

import './homepage.scss';

const Homepage = () => {
  const { isAuth } = useContext(StateContext);

  if (isAuth) return <Redirect to='/mypage' />;
  return (
    <div className='homepage'>
      <SignInForm />
    </div>
  );
};

export default Homepage;
