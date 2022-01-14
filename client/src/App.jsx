import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import Homepage from './components/Pages/Homepage/Homepage';
import Mypage from './components/Pages/Mypage/Mypage';
import AddUpdateMedGroupPopup from './components/AddUpdateMedGroupPopup/AddUpdateMedGroupPopup';

import './App.scss';

const App = () => {
  return (
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
      </Routes>
    </div>
  );
};

export default App;
