import React from 'react';
import { Link } from 'react-router-dom';

import './customLink.scss';

const CustomLink = ({ urlTo, linkName, matchingUrl, children }) => {
  return (
    <div>
      <Link className={`link ${matchingUrl && 'match'}`} to={urlTo}>
        {children}
        <span className='link-name'>{linkName}</span>
      </Link>
    </div>
  );
};

export default CustomLink;
