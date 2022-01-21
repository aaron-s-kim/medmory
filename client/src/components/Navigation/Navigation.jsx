import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { StateContext } from 'context/StateProvider';

import Logo from 'components/Logo/Logo';
import CustomLink from 'components/CustomLink/CustomLink';
import SignOutButton from 'components/SignOutButton/SignOutButton';

import './navigation.scss';

const Navigation = ({ location }) => {
  const { user } = useContext(StateContext);
  const { pathname } = location;
  return (
    <div className='nav-container'>
      <div className='nav'>
        <Logo />
        <div className='link-group'>
          {user && (
            <>
              <CustomLink
                urlTo='/user-search'
                linkName='Search'
                matchingUrl={pathname === '/user-search'}
              >
                <i className='fas fa-search'></i>
              </CustomLink>
              <CustomLink
                urlTo={`/mypage/${user.id}`}
                linkName='My page'
                matchingUrl={pathname === `/mypage/${user.id}`}
              >
                <i className='fas fa-user'></i>
              </CustomLink>
              <CustomLink
                urlTo='/bond'
                linkName='My bond'
                matchingUrl={pathname === '/bond'}
              >
                <i className='fas fa-users'></i>
              </CustomLink>
              <SignOutButton>
                <i className='fas fa-sign-out'></i>
              </SignOutButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Navigation);
