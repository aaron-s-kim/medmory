import React from 'react';
import { Link } from 'react-router-dom';

import './customLink.scss';

const CustomLink = ({ urlTo, linkName }) => {
  return (
    <div>
      <Link className='link' to={urlTo}>
        {linkName}
      </Link>
    </div>
  );
};

export default CustomLink;
