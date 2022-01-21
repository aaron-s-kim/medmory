import React from 'react';

import BondUser from 'components/BondUser/BondUser';

import { getFilteredBondUsers } from 'utils/data-shape';

import './bondUserList.scss';

const BondUserList = ({ user, bond, history }) => {
  return (
    <div className='bond-user-list'>
      {getFilteredBondUsers(user.id, bond.bondUsers).map(user => (
        <BondUser key={user.id} user={user} history={history} />
      ))}
    </div>
  );
};

export default BondUserList;
