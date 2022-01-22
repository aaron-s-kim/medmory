import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';

import BondInfoSection from 'components/BondInfoSection/BondInfoSection';
import BondUserList from 'components/BondUserList/BondUserList';

import { StateContext, SetStateContext } from 'context/StateProvider';

import './bondpage.scss';

const Bondpage = ({ history }) => {
  const { isAuth, bond, user } = useContext(StateContext);
  const setState = useContext(SetStateContext);

  const INITIAL_NEW_BOND_INPUT = {
    id: '',
    newBondName: '',
    newBondImageUrl: '',
    bondUsers: [],
  };
  const [newBondInput, setNewBondInput] = useState(INITIAL_NEW_BOND_INPUT);
  const { newBondName, newBondImageUrl } = newBondInput;

  const handleChangeOnNewBond = e => {
    const { value, name } = e.target;
    setNewBondInput({ ...newBondInput, [name]: value });
  };

  const createNewBond = e => {
    e.preventDefault();

    const reqBody = {
      name: newBondName,
      image_url: newBondImageUrl,
    };

    axios
      .post('/bonds', reqBody)
      .then(res => {
        setState(prev => ({
          ...prev,
          bond: {
            id: res.data.id,
            name: res.data.name,
            imageUrl: res.data.image_url,
            bondUsers: [user],
          },
        }));
      })
      .catch(err => console.error(err));
  };

  if (!isAuth) return <Redirect to='/' />;

  return (
    <div className='bond-page-container'>
      {bond ? (
        <div className='show-bond-view'>
          <BondInfoSection bond={bond} />
          <BondUserList user={user} bond={bond} history={history} />
        </div>
      ) : (
        <>
          <div className='create-bond-view'>
            <p>You are currently un-bonded</p>
            <h3>Create a New Bond:</h3>
            <div>
              <form onSubmit={createNewBond}>
                <div className='new-bond-info-container'>
                  <input
                    className='new-bond-name-input'
                    name='newBondName'
                    type='text'
                    value={newBondName}
                    placeholder='New Bond Name...'
                    onChange={handleChangeOnNewBond}
                    required={true}
                  />
                </div>
                <div className='new-bond-info-container'>
                  <input
                    className='new-bond-imageUrl-input'
                    name='newBondImageUrl'
                    type='text'
                    value={newBondImageUrl}
                    placeholder='Image Url...'
                    onChange={handleChangeOnNewBond}
                    required={false}
                  />
                </div>
                <div className='create-new-bond-btn-container'>
                  <button type='submit' className='create-new-bond-btn'>
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Bondpage;
