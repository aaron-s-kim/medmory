import React, { useContext, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Navigation from './components/Navigation/Navigation';
import Homepage from './components/Pages/Homepage/Homepage';
import Mypage from './components/Pages/Mypage/Mypage';
import Bondpage from 'components/Pages/Bondpage/Bondpage';
import AddUpdateMedGroupPopup from './components/AddUpdateMedGroupPopup/AddUpdateMedGroupPopup';
import AddMedPopup from './components/AddMedPopup/AddMedPopup';
import Graphpage from './components/Pages/Graphpage/Graphpage';

import { StateContext, SetStateContext } from './context/StateProvider';

import 'App.scss';

const App = () => {
  const { isAuth } = useContext(StateContext);
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
      .catch(err => console.log(err.response.data.error));
  }, []);

  return (
    <div className='app'>
      <Navigation />
      <Switch>
        <Route exact path='/' component={isAuth ? Mypage : Homepage} />
        <Route exact path='/mypage' component={Mypage} />
        <Route exact path='/bond' component={Bondpage} />
        <Route exact path='/med-group-add' component={AddUpdateMedGroupPopup} />

        <Route exact path='/med-add' component={AddMedPopup} />
        <Route exact path='/graphpage' component={Graphpage} />
      </Switch>
    </div>
  );
};

export default App;
