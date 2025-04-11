'use client';
import { useAuth } from 'react-oidc-context';
import { useRouter } from 'next/navigation';

const useAuthentication = () => {
  const auth = useAuth();
  const router = useRouter();

  const signOutRedirect = () => {
    const clientId = '5thcu03m3adbkhauea9qbt1vf';
    const logoutUri = cognitoAuthConfig.redirect_uri;
    const cognitoDomain =
      'https://us-east-1iutw2diyc.auth.us-east-1.amazoncognito.com';
    router.push(
      `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri || '')}`
    );
  };

  const handleLogin = () => {
    console.log('handleLogin');
    auth.signinRedirect();
  };

  return {
    auth,
    handleLogin,
    handleLogout: signOutRedirect,

    cognitoAuthConfig
  };
};

export default useAuthentication;

export const cognitoAuthConfig = {
  authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_iUTW2DiYC',
  client_id: '5thcu03m3adbkhauea9qbt1vf',
  redirect_uri: 'https://timsmarttechnology.co.uk',
  response_type: 'code',
  scope: 'email openid phone'
};
