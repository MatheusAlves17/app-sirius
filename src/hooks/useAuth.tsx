import { createContext, useContext, useState } from "react";

export interface IUser {
  user: User;
  access_token: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  device_token: null;
  created_at: string;
  updated_at: string;
}

interface IAuthContextProps {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  signIn: (user: IUser) => void;
  signOut: () => void;
  isAuthenticated: boolean;
}

interface ChildrenProps {
  children: React.ReactNode;
}

const AuthContext = createContext({} as IAuthContextProps);

export function AuthProvider({ children }: ChildrenProps) {
  const [user, setUser] = useState<IUser>(() => {
    const user = localStorage.getItem("@token:user");

    if (user) {
      return JSON.parse(user);
    }

    return null;
  });

  const isAuthenticated = !!user;

  console.log(isAuthenticated, user);

  const signIn = (user: IUser) => {
    localStorage.setItem("@token:user", JSON.stringify(user));
    setUser(user);
  }

  const signOut = () => {
    localStorage.removeItem("@token:user");
    localStorage.removeItem('@token:accessToken');
    localStorage.removeItem('@token:refreshToken');
    setUser({} as IUser);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, signIn, signOut, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

export const useAuth = () => useContext(AuthContext);
