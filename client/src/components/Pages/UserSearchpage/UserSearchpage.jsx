import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

import SuggestedUserContainer from 'components/SuggestedUserContainer/SuggestedUserContainer';
import SearchResultContainer from 'components/SearchResultContainer/SearchResultContainer';

import { StateContext } from 'context/StateProvider';
import { getAllUsersPromise } from 'utils/data-fetch';
import {
  getFilteredUsersByFirstName,
  getFilteredUsersByLastName,
} from 'utils/data-shape';

import './userSearchpage.scss';

const UserSearchpage = () => {
  const { user, isAuth, bond } = useContext(StateContext);
  const [searchWord, setSearchWord] = useState('');
  const [userResult, setUserResult] = useState([]);
  const [userSuggestion, setUserSuggestion] = useState([]);

  const getSearchResult = searchWordInput => {
    getAllUsersPromise()
      .then(res =>
        setUserResult(
          getFilteredUsersByFirstName(user.id, searchWordInput, res.data)
        )
      )
      .catch(err => console.log(err.response.data.error));
  };

  const getSuggestedUsers = () => {
    getAllUsersPromise()
      .then(res =>
        setUserSuggestion(getFilteredUsersByLastName(user, res.data))
      )
      .catch(err => console.log(err.response.data.error));
  };

  useEffect(() => {
    if (searchWord.length > 0) {
      setUserSuggestion([]);
      getSearchResult(searchWord);
    }

    if (searchWord === '') {
      setUserResult([]);
      getSuggestedUsers();
    }
  }, [searchWord]);

  const handleChange = e => {
    const { value } = e.target;
    setSearchWord(value);
  };
  
  if (!isAuth) return <Redirect to='/' />;
  return (
    <div className='searchpage'>
      <div className='search-bar-container'>
        <input
          className='search-bar'
          type='text'
          value={searchWord}
          onChange={handleChange}
          placeholder='Search by first name'
        />
        <SearchResultContainer
          userResult={userResult}
          userBond={bond}
          searchWord={searchWord}
        />
      </div>
      {userSuggestion.length > 0 && searchWord === '' && (
        <SuggestedUserContainer userSuggestion={userSuggestion} />
      )}
    </div>
  );
};

export default UserSearchpage;
