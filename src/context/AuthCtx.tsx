import { createContext, useEffect, useState } from 'react';
import { User } from '../interfaces/User';

interface AuthCtxProps {
  user: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  logIn: () => void,
  loading: boolean,
  verifyAuth: () => void,
  logOut: () => void,
  logInAsGuest: () => void,
}

export const AuthCtx = createContext<AuthCtxProps>({
  user: null,
  setUser: () => { return },
  logIn: () => { return },
  loading: true,
  verifyAuth: () => { return },
  logOut: () => { return },
  logInAsGuest: () => { return },
});

interface AuthProviderProps {
  children: React.ReactNode,
}

export const AuthProvider = ({
  children,
}: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    verifyAuth();
  }, [])

  const verifyAuth = () => {
    const user = sessionStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
      return setLoading(false);
    }
  };


  const logInAsGuest = () => {
    const guest = {
      id: 0,
      name: 'Invitado',
      picture_small: '/assets/images/foxbel-music-icon.png',
      accessToken: '',
    };
    sessionStorage.setItem('user', JSON.stringify(guest));
    setUser(guest);
  }

  const logIn = () => {
    window.location.href = `https://connect.deezer.com/oauth/auth.php?app_id=${import.meta.env.VITE_DEEZER_APP_ID}&redirect_uri=${import.meta.env.VITE_DEEZER_REDIRECT_URI}&perms=basic_access,email,offline_access`;
  }

  const logOut = () => {
    sessionStorage.removeItem('user');
    setUser(null);
  }

  return (
    <AuthCtx.Provider value={{
      user,
      setUser,
      logIn,
      loading,
      verifyAuth,
      logOut,
      logInAsGuest,
    }}
    >
      {children}
    </AuthCtx.Provider>
  )
}