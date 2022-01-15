import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import Homepage from './components/Pages/Homepage/Homepage';
import Mypage from './components/Pages/Mypage/Mypage';
import AddUpdateMedGroupPopup from './components/AddUpdateMedGroupPopup/AddUpdateMedGroupPopup';
import AddMedPopup from './components/AddMedPopup/AddMedPopup';

import 'App.scss';

import { Provider, AddMedgroup, MedGroupList } from 'context/UserContext';

export const StateContext = React.createContext();
export const SetStateContext = React.createContext();

const App = () => {
  const INITIAL_STATE = {};
  const [state, setState] = useState(INITIAL_STATE);

  return (
    <StateContext.Provider value={state}>
      <SetStateContext.Provider value={setState}>
        <div className='app'>
          <Navigation />
          <Routes>
            <Route exact path='/' element={<Homepage />} />
            <Route exact path='/mypage' element={<Mypage />} />
            <Route
              exact
              path='/med-group-add'
              element={<AddUpdateMedGroupPopup />}
            />

            <Route exact path='/med-add' element={<AddMedPopup />} />
          </Routes>
        </div>
      </SetStateContext.Provider>
    </StateContext.Provider>
  );
};

export default App;
