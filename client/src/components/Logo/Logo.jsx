import React from 'react';
import { Link } from 'react-router-dom';

import logoImage from '../../assets/images/logo.svg';

const Logo = () => {
  return (
    <div className='logo-container'>
      <Link to='/'>
        <img
          style={{ width: '60px', height: '60px' }}
          src={logoImage}
          alt='logo'
        />
      </Link>
    </div>
  );
};

export default Logo;
