import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import Homepage from './components/Pages/Homepage/Homepage';
import Bondpage from 'components/Pages/Bondpage/Bondpage';
import UserSearchpage from 'components/Pages/UserSearchpage/UserSearchpage';
import ViewUserpage from 'components/Pages/ViewUserpage/ViewUserpage';
import Graphpage from './components/Pages/Graphpage/Graphpage';
import Mypage from 'components/Pages/Mypage/Mypage';
import Meddetailspage from 'components/Pages/Meddetailspage/Meddetailspage';

import 'App.scss';

const App = () => {
  return (
    <div className='app'>
      <Navigation />
      <div className='page-container'>
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
    </div>
  );
};

export default App;
