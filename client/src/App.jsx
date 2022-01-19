import React, { useContext, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import Homepage from './components/Pages/Homepage/Homepage';
import Bondpage from 'components/Pages/Bondpage/Bondpage';
import UserSearchpage from 'components/Pages/UserSearchpage/UserSearchpage';
import ViewUserpage from 'components/Pages/ViewUserpage/ViewUserpage';
import Graphpage from './components/Pages/Graphpage/Graphpage';
import Notification from 'components/Notification/Notification';
import Mypage from 'components/Pages/Mypage/Mypage';
import Overlay from 'components/Overlay/Overlay';

import { StateContext, SetStateContext } from './context/StateProvider';

import { getAuthUserData } from 'utils/data-fetch';

import 'App.scss';
import Meddetailspage from 'components/Pages/Meddetailspage/Meddetailspage';

const App = () => {
  const { pendingInvite, isAuth } = useContext(StateContext);
  const setState = useContext(SetStateContext);

  useEffect(() => {
    getAuthUserData(setState);
  }, []);

  return (
    <div className='app'>
      <Navigation />
      <div className='page-container'>
        {isAuth && <Overlay background={true} />}
        {pendingInvite && <Notification />}
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/user-search' component={UserSearchpage} />
          <Route path='/mypage/:userId' component={Mypage} />
          <Route exact path='/bond' component={Bondpage} />
          <Route path='/user/:userId' component={ViewUserpage} />

          <Route exact path='/med-group-details' component={Meddetailspage} />
          <Route exact path='/graphpage' component={Graphpage} />
        </Switch>
      </div>
      {/* <footer className='footer'>MedMory</footer> */}
    </div>
  );
};

export default App;
