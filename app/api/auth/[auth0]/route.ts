// app/api/auth/[auth0]/route.js
import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
  callback: handleCallback({
    redirectUri: `http://localhost:3000/api/auth/callback`
  })
});
