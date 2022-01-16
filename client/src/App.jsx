import React, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
// import cookie from 'react-cookie';

import Navigation from './components/Navigation/Navigation';
import Homepage from './components/Pages/Homepage/Homepage';
import Mypage from './components/Pages/Mypage/Mypage';
import AddUpdateMedGroupPopup from './components/AddUpdateMedGroupPopup/AddUpdateMedGroupPopup';
import AddMedPopup from './components/AddMedPopup/AddMedPopup';
import Graphpage from './components/Pages/Graphpage/Graphpage';

import { StateContext, SetStateContext } from './context/StateProvider';

import 'App.scss';

// import { Provider, AddMedgroup, MedGroupList } from 'context/UserContext';

const App = () => {
  const state = useContext(StateContext);
  const setState = useContext(SetStateContext);

  useEffect(() => {
    axios
      .get('auth/user')
      .then(res =>
        setState(prevState => ({
          ...prevState,
          isAuth: true,
          user: res.data.user,
          userMedGroupArr: res.data.userMedGroupArr,
        }))
      )
      .catch(err => console.log(err));
  }, []);

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

        <Route exact path='/med-add' element={<AddMedPopup />} />
        <Route exact path='/graphpage' element={<Graphpage />} />
      </Routes>
    </div>
  );
};

export default App;
