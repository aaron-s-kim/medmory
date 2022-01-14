import React from 'react';
import { useUser } from 'context/UserContext';

import './mypage.scss'


const Mypage = () => {
  const user = useUser()

  return <div className='mypage'>MY PAGE {user}</div>;
};

export default Mypage;
