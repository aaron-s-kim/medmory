import React from 'react';
import { Link } from 'react-router-dom';

import logoImage from 'assets/images/logo.png';

const Logo = () => {
  return (
    <div className='logo-container'>
      <Link to='/'>
        <img
          // style={{ width: '120px', height: '40px' }}
          src={logoImage}
          alt='logo'
        />
      </Link>
    </div>
  );
};

export default Logo;
