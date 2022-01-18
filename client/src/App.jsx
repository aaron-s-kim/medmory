import React, { useContext, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import Homepage from './components/Pages/Homepage/Homepage';
import Mypage from './components/Pages/Mypage/Mypage';
import Bondpage from 'components/Pages/Bondpage/Bondpage';
import UserSearchpage from 'components/Pages/UserSearchpage/UserSearchpage';
import ViewUserpage from 'components/Pages/ViewUserpage/ViewUserpage';
import AddUpdateMedGroupPopup from './components/AddUpdateMedGroupPopup/AddUpdateMedGroupPopup';
import AddMedPopup from './components/AddMedPopup/AddMedPopup';
import Graphpage from './components/Pages/Graphpage/Graphpage';
import Notification from 'components/Notification/Notification';
import MypageCopy from 'components/Pages/Mypage/Mypage-copy';

import { StateContext, SetStateContext } from './context/StateProvider';

import { getAuthUserData } from 'utils/data-fetch';

import 'App.scss';

const App = () => {
  const { pendingInvite } = useContext(StateContext);
  const setState = useContext(SetStateContext);

  useEffect(() => {
    getAuthUserData(setState);
  }, []);

  return (
    <div className='app'>
      <Navigation />
      <div className='page-container'>
        {pendingInvite && <Notification />}
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/user-search' component={UserSearchpage} />
          <Route exact path='/mypage-copy' component={MypageCopy} />
          <Route exact path='/mypage' component={Mypage} />
          <Route exact path='/bond' component={Bondpage} />
          <Route path='/view-user/:userId' component={ViewUserpage} />
          <Route
            exact
            path='/med-group-add'
            component={AddUpdateMedGroupPopup}
          />
          <Route exact path='/graphpage' component={Graphpage} />
        </Switch>
      </div>
      <footer className='footer'>MedMory</footer>
    </div>
  );
};

export default App;
