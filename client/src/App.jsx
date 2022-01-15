import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import Homepage from './components/Pages/Homepage/Homepage';
import Mypage from './components/Pages/Mypage/Mypage';
import AddUpdateMedGroupPopup from './components/AddUpdateMedGroupPopup/AddUpdateMedGroupPopup';
import AddMedPopup from './components/AddMedPopup/AddMedPopup';
import Graphpage from './components/Pages/Graphpage/Graphpage';

import 'App.scss';

import { Provider, AddMedgroup, MedGroupList } from 'context/UserContext';

const App = () => {
  return (
    <div className='app'>

      <Provider>
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
          <Route exact path='/graphpage' element={<Graphpage />} />

        </Routes>
      </Provider>
    </div>
  );
};

export default App;
