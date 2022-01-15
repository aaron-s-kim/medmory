import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navigation from 'components/Navigation/Navigation';
import Homepage from 'components/Pages/Homepage/Homepage';
import Mypage from 'components/Pages/Mypage/Mypage';
import Graphpage from 'components/Pages/Graphpage/Graphpage';

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
            <Route exact path='/graphpage' element={<Graphpage />} />

          </Routes>
            <AddMedgroup />
            <MedGroupList />

      </Provider>
      
    </div>
  );
};

export default App;
