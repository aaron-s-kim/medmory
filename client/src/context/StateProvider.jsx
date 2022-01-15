import React, { useState } from 'react';

export const StateContext = React.createContext();
export const SetStateContext = React.createContext();

const StateProvider = ({ children }) => {
  const INITIAL_STATE = {
    isAuth: false,
    user: null,
    userMedGroupArr: [],
  };
  const [state, setState] = useState(INITIAL_STATE);

  return (
    <StateContext.Provider value={state}>
      <SetStateContext.Provider value={setState}>
        {children}
      </SetStateContext.Provider>
    </StateContext.Provider>
  );
};

export default StateProvider;
