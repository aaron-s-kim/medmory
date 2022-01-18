import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { StateContext } from 'context/StateProvider';

import Logo from 'components/Logo/Logo';
import CustomLink from 'components/CustomLink/CustomLink';
import SignOutButton from 'components/SignOutButton/SignOutButton';

import './navigation.scss';

const Navigation = ({ location }) => {
  const { isAuth } = useContext(StateContext);
  const { pathname } = location;
  return (
    <div className='nav'>
      <Logo />

      <div className='link-group'>
        {isAuth && (
          <>
            <CustomLink
              urlTo='/user-search'
              linkName='Search'
              matchingUrl={pathname === '/user-search'}
            />
            <CustomLink
              urlTo='/mypage'
              linkName='My page'
              matchingUrl={pathname === '/mypage'}
            />
            <CustomLink
              urlTo='/bond'
              linkName='My bond'
              matchingUrl={pathname === '/bond'}
            />
            <SignOutButton />
          </>
        )}
      </div>
    </div>
  );
};

export default withRouter(Navigation);
