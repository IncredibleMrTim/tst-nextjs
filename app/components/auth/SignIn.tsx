'use client';
import { Button, TextField } from '@radix-ui/themes';
import { login } from './actions';
import { Label } from 'radix-ui';
import { useState } from 'react';

import { StoreKeys, useAppDispatch, useAppSelector } from '@/store/redux/store';

const SignIn = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const setLoggedState = (isLoggedIn: boolean) => {
    dispatch({
      type: StoreKeys.AUTH_SET_IS_LOGGED_IN,
      payload: isLoggedIn
    });
  };

  const handleSignoutClick = () => {
    setLoggedState(false);
  };

  const handleLoginClick = async () => {
    const user = await login(email, password);
    console.log('T1', user);
    setLoggedState(true);
  };

  return (
    <>
      <strong className="text-lg">Login into admin portal.</strong>

      {!isLoggedIn ? (
        <div>
          <Label.Root htmlFor="email" aria-required>
            <p className="text-sm">Email address</p>
          </Label.Root>

          <TextField.Root
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            onChange={e => setEmail(e.target.value)}
          />

          <Label.Root htmlFor="password" aria-required>
            <p className="text-sm">Password</p>
          </Label.Root>

          <TextField.Root
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={e => setPassword(e.target.value)}
          />

          <Button onClick={handleLoginClick} className="!mt-4 sm:weight-bold">
            Login
          </Button>
        </div>
      ) : (
        <Button variant="ghost" onClick={handleSignoutClick}>
          Logout
        </Button>
      )}
    </>
  );
};

export default SignIn;
