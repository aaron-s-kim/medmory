import React, { useState, useContext } from 'react';
import Medtab from './Medtab';
import { StateContext } from '../../../context/StateProvider';

import './meddetailspage.scss';

const Meddetailspage = (props) => {
  const { isAuth, user, userMedGroupArr } = useContext(StateContext);
  const [currentTab, setCurrentTab] = useState(-1);
  const [active, setActive] = useState(-1);
  const medGroupId = props.location.medGroupId;



  const handleClick = e => {
    setCurrentTab(e);
    setActive(e);
  };

  return (
    <div className='meddetailspage'>

      <h2>Vertical Tabs</h2>
      <p>Click on the buttons inside the tabbed menu:</p>

      <div className="tab">
        {userMedGroupArr.map((medGroupItem, i) => (
          <button
            key={medGroupItem.name}
            className={active === i ? 'active' : ''}
            onClick={() => handleClick(i)}
          >{medGroupItem.name}</button>
          ))
        }
      </div>

      <div className="tabcontent">
        {currentTab !== -1 &&
          <Medtab
            medGroupObj={userMedGroupArr[currentTab]}
          />
        }
      </div>

    </div>
  );
};

export default Meddetailspage;