import React from 'react';

import Logo from '../Logo/Logo';
import CustomLink from '../CustomLink/CustomLink';

import './navigation.scss';

const Navigation = () => {
  return (
    <div className='nav'>
      <Logo />

      <div className='link-group'>
        <CustomLink urlTo='/' linkName='Homepage' />
        <CustomLink urlTo='/mypage' linkName='My page' />
      </div>
    </div>
  );
};

export default Navigation;
