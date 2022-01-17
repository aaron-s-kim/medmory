import React, { useState, useContext } from 'react';
import axios from 'axios';

import { SetStateContext } from '../../context/StateProvider';

import './signInForm.scss';

const SignInForm = () => {
  const setState = useContext(SetStateContext);

  const INITIAL_INPUT = {
    email: '',
    password: '',
  };
  const [inputState, setInputState] = useState(INITIAL_INPUT);
  const { email, password } = inputState;

  const handleSubmit = e => {
    e.preventDefault();

    const reqBody = {
      email,
      password_digest: password,
    };

    axios
      .post('/auth/sign-in', reqBody)
      .then(res =>
        setState({
          ...res.data,
          isAuth: true,
        })
      )
      .catch(err => console.error(err));
  };

  const handleChange = e => {
    const { value, name } = e.target;
    setInputState({ ...inputState, [name]: value });
  };
  return (
    <>
      <div>
        <h2>Please Sign in</h2>
      </div>
      <form className='' onSubmit={handleSubmit}>
        <div className=''>
          <div>
            <input
              type='email'
              value={email}
              name='email'
              onChange={handleChange}
              placeholder='Email'
            />
          </div>
          <div>
            <input
              type='password'
              value={password}
              name='password'
              onChange={handleChange}
              placeholder='Password'
            />
          </div>
        </div>
        <button type='submit'>Sign In</button>
      </form>
    </>
  );
};

export default SignInForm;
