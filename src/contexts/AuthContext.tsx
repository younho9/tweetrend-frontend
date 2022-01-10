import jwtDecode from 'jwt-decode';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { AuthUserType } from 'src/types';

export type AuthContextType = {
  user: AuthUserType | null;
  authenticated: boolean;
  logIn: (token: string) => void;
  logOut: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const isExpired = (authUser: AuthUserType) => {
  const now = new Date().getTime();

  return authUser.exp < now / 1000;
};

export const decodeToken = (token: string) => {
  try {
    const user: AuthUserType = jwtDecode(token);

    if (isExpired(user)) {
      return null;
    }

    return user;
  } catch (e) {
    return null;
  }
};

const AuthContext = createContext<Partial<AuthContextType>>({});

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUserType | null>(null);
  const authenticated = user !== null;

  const logOut = () => {
    window.localStorage.removeItem('token');
    setUser(null);
  };

  const logIn = useCallback(
    (token: string) => {
      const decodedUser = decodeToken(token);

      if (authenticated) {
        return;
      }

      if (decodedUser) {
        window.localStorage.setItem('token', token);
        setUser(decodedUser);
      } else {
        logOut();
      }
    },
    [authenticated]
  );

  useEffect(() => {
    const token = window.localStorage.getItem('token');

    if (token) {
      logIn(token);
    }
  }, [logIn]);

  return (
    <AuthContext.Provider value={{ user, authenticated, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
