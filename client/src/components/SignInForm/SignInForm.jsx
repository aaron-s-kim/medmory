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
      .then(res => {
        setState({
          ...res.data,
          isAuth: true,
          isLoading: false,
        });
        localStorage.setItem('userId', res.data.user.id);
      })
      .catch(err => console.error(err));
  };

  const handleChange = e => {
    const { value, name } = e.target;
    setInputState({ ...inputState, [name]: value });
  };

  return (
    <div className='sign-in-box'>
      <form className='sign-in-form' onSubmit={handleSubmit}>
        <div className='sign-in-title'>
          <h2>Please sign in</h2>
        </div>
        <div className='sign-in-input-box'>
          <input
            type='email'
            value={email}
            name='email'
            onChange={handleChange}
            placeholder='Email'
          />
        </div>
        <div className='sign-in-input-box'>
          <input
            type='password'
            value={password}
            name='password'
            onChange={handleChange}
            placeholder='Password'
          />
        </div>
        <div className='sign-in-forgot'>Forgot password?</div>
        <button type='submit' className='sign-in-btn'>
          Sign in
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
