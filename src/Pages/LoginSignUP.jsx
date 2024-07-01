import React, { useContext, useState } from 'react';
import './CSS/LoginSignup.css';
import { toast } from 'react-hot-toast';

const LoginSignUP = () => {
  const baseUrl = 'http://localhost:4000/api';

  const [state, setState] = useState('Login');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log('Login function executed', formData);
    let responseData;
    const loginUrl = `${baseUrl}/users/login`;
    console.log('Sending payload:', JSON.stringify(formData));
    await fetch(loginUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem('auth-token', JSON.stringify(responseData.token));
      toast.success('Welcome Back');
      window.location.replace('/');
    } else {
      toast.error('Invalid email or password');
    }
  };

  const signup = async () => {
    console.log('Signup function excuted', formData);
    let responseData;
    const signupUrl = `${baseUrl}/users/signup`;
    await fetch(signupUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem('auth-token', JSON.stringify(responseData.token));
      toast.success('Welcome Aboard');
      window.location.replace('/');
    } else {
      toast.error(responseData.errors);
    }
  };

  return (
    <div className="loginsignup ">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-feilds">
          {state === 'Sign Up' ? (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Username"
              required
            />
          ) : (
            <></>
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email "
            required
          />{' '}
          <br />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
            required
          />
          <br />
        </div>
        <button
          onClick={() => {
            state === 'Login' ? login() : signup();
          }}
        >
          Continue
        </button>
        {state === 'Sign Up' ? (
          <p className="loginsignup-login">
            Already have an account?{' '}
            <span
              onClick={() => {
                setState('Login');
              }}
            >
              Login Here
            </span>{' '}
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account{' '}
            <span
              onClick={() => {
                setState('Sign Up');
              }}
            >
              Click Here
            </span>{' '}
          </p>
        )}
        <div className="loginsignup-agree" required>
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUP;
