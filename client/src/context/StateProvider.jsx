import React, { useState, useEffect } from 'react';
import { createConsumer } from '@rails/actioncable';

import { getAuthUserData } from 'utils/data-fetch';

export const StateContext = React.createContext();
export const SetStateContext = React.createContext();

export const INITIAL_STATE = {
  isLoading: true,
  isAuth: false,
  // isAuth: localStorage.getItem('userId') ? true : false,
  user: null,
  userMedGroupArr: [],
  bond: null,
  pendingInvite: null,
};

const StateProvider = ({ children }) => {
  const [state, setState] = useState(INITIAL_STATE);
  const cable = createConsumer('ws://localhost:3000/cable');

  let bondInviteChannel;

  useEffect(() => {
    getAuthUserData(setState);
    const userId = localStorage.getItem('userId');
    console.log(userId);
    createSubscription();

    return () => {
      bondInviteChannel.unsubscribe();
    };
  }, []);

  const createSubscription = () => {
    bondInviteChannel = cable.subscriptions.create(
      { channel: 'BondInvitesChannel' },
      { received: () => getAuthUserData(setState) }
    );
  };

  return (
    <StateContext.Provider value={state}>
      <SetStateContext.Provider value={setState}>
        {children}
      </SetStateContext.Provider>
    </StateContext.Provider>
  );
};

export default StateProvider;
