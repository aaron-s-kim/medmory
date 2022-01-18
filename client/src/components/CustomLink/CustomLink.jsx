import React from 'react';
import { Link } from 'react-router-dom';

import './customLink.scss';

const CustomLink = ({ urlTo, linkName, matchingUrl }) => {
  return (
    <div>
      <Link className={`link ${matchingUrl && 'match'}`} to={urlTo}>
        {linkName}
      </Link>
    </div>
  );
};

export default CustomLink;
