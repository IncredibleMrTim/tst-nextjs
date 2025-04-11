'use client';
import { useAuth } from 'react-oidc-context';
import { useRouter } from 'next/navigation';

const useAuthentication = () => {
  const auth = useAuth();
  const router = useRouter();


  const handleLogin_old = async (username: string, password: string) => {
    try {
      const response = await fetch(cognitoAuthConfig.token_endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
        grant_type: 'password',
          client_id: cognitoAuthConfig.client_id,
          username: 'tim.smart@timsmarttechnology.co.uk',
          password: 'TestTu8e1!',
          scope: cognitoAuthConfig.scope
        }).toString()
      });

      if (!response.ok) {
        throw new Error('Failed to log in. Please check your credentials.');
      }

      const data = await response.json();
      console.log('Login successful:', data);

      // Store tokens in localStorage or cookies as needed
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);

      // Redirect or perform post-login actions
      router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };



  const handleLogin = async () => {
    try {
      await auth.signinRedirect({
        redirect_uri: cognitoAuthConfig.redirect_uri, // The URI Cognito will redirect to after login


        scope: cognitoAuthConfig.scope, // Scopes for requested claims
        state: 'optional-state', // Optional: State parameter for CSRF protection
        prompt: 'login' // Optional: Forces the login screen to appear
      });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };



  return {
    auth,
    handleLogin,
    handleLogout: async () => {
      await auth.signoutRedirect();
      router.push('/');
    },
    cognitoAuthConfig
  };
};

export default useAuthentication;


export const cognitoAuthConfig = {
    authority:
      'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_iUTW2DiYC',
    client_id: '5thcu03m3adbkhauea9qbt1vf',
    redirect_uri: process.env.COGNITO_LOGIN_REDIRECT,
    response_type: 'code',
    scope: 'email openid phone',
    token_endpoint: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_iUTW2DiYC/oauth2/token'
  };