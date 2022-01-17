import React, { useContext } from 'react';

import { StateContext } from 'context/StateProvider';

const Bondpage = () => {
  const { isAuth, user } = useContext(StateContext);
  return <div>{isAuth && <div>Bond Page</div>}</div>;
};

export default Bondpage;
