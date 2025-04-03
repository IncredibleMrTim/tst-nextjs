'use client';
import { Button, TextField } from '@radix-ui/themes';
import { signOut, login, getUser } from './actions';
import { Form, Label } from 'radix-ui';
import { useState, useEffect } from 'react';
import { useAuthenticationStore } from '@/store/authentication/useAuthentication';
import { log } from 'console';

const SignIn = () => {
  const isLoggedIn = useAuthenticationStore(state => state.isLoggedIn);
  const setIsLoggedIn = useAuthenticationStore(state => state.setIsLoggedIn);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignoutClick = () => {
    console.log(signOut());
    setIsLoggedIn(false);
  };

  const handleLoginClick = async () => {
    login(email, password);
    setIsLoggedIn(false);
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
