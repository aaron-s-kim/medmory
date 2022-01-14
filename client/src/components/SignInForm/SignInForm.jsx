import React, { useState } from 'react';
import axios from 'axios';

import './signInForm.scss';

const INITIAL_INPUT = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [inputState, setInputState] = useState(INITIAL_INPUT);
  const { email, password } = inputState;

  const handleSubmit = e => {
    e.preventDefault();
    console.log('email:', email);
    console.log('password:', password);

    const reqBody = {
      email,
      password_digest: password,
    };

    axios
      .post('http://localhost:3000/auth/sign-in', reqBody)
      .then(res =>
        console.log({
          user: JSON.parse(res.data.user),
          medGroup: JSON.parse(res.data.medGroup),
          historyToday: JSON.parse(res.data.historyToday),
          historyTenDays: JSON.parse(res.data.historyTenDays),
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
        <button>Sign In</button>
      </form>
    </>
  );
};

export default SignInForm;
