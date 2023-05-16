/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthCtx } from '../context/AuthCtx';

export default function Auth() {
  const [authenticating, setAuthenticating] = useState<boolean>(true);
  const {
    setUser,
    verifyAuth,
    loading,
    user,
  } = useContext(AuthCtx);
  const navigate = useNavigate();

  useEffect(() => {
    verifyAuth();

    if (user && !loading) {
      return navigate('/home', { replace: true })
    }

    const fetchUser = async (accessToken: string) => {
      const resposne = await (await fetch(`/api/user/me?access_token=${accessToken}`)).json();
      let user = {} as any;
      if (resposne.error) {
        const data = await (await fetch(`/api/user/${resposne.error.user_id}`)).json();
        user = {
          id: data.id,
          name: data.name,
          picture_small: data.picture_small,
          accessToken: accessToken,
        }
      }
      if (!resposne.error) {
        user = {
          id: resposne.id,
          name: resposne.name,
          picture_small: resposne.picture_small,
          accessToken: accessToken,
        }
      }
      sessionStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setAuthenticating(false);
    }

    const authenticate = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (!code) {
        navigate('/login')
      }

      if (code) {
        const accessToken = await fetchToken(code);

        if (accessToken) {
          fetchUser(accessToken);
        }
      }
    }

    authenticate();
  }, [
    loading,
    navigate,
    user,
    verifyAuth,
    setUser,
  ]);



  const fetchToken = async (code: string) => {
    const response = await (await fetch(`/auth/access_token.php?app_id=${import.meta.env.VITE_DEEZER_APP_ID}&secret=${import.meta.env.VITE_DEEZER_SECRET_KEY}&code=${code}&output=json`)).json();
    return response.access_token as string;
  }


  return (
    authenticating
      ? <h1>Autenticando...</h1>
      : <h1>Autenticado</h1>
  )
}
