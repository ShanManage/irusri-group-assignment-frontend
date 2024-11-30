import { createContext, useContext, useState } from 'react'
import {
  AuthContextType,
  AuthProviderProps,
  AuthUser,
  LoginFormFields,
  RegisterFormFields,
} from '../interface'

const AuthContext = createContext<AuthContextType>({
  authenticate: async () => true,
  signUp: async () => true,
  signOut: () => {},
  isLoading: false,
  currentUser: null
})

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  const signUp = ({ username, password }: RegisterFormFields): Promise<boolean> => {
    return new Promise((resolve) => {
      setIsLoading(true);
      setTimeout(() => {
        const newUser: AuthUser = { id: users.length + 1, username, password };
        setUsers((prevUsers) => [...prevUsers, newUser]);
        setIsLoading(false);
        resolve(true);
      }, 2000);
    });
  };

  const authenticate = async ({ username, password }: LoginFormFields): Promise<boolean> => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = users.find(
          (user) => user.username === username && user.password === password
        );
        if (foundUser) {
          setCurrentUser(foundUser);
          setIsLoading(false);
          resolve(true);
        } else {
          setIsLoading(false);
          resolve(false);
        }
      }, 2000);
    });
  };

  const signOut = () => {
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider value={{ signUp, authenticate, signOut, isLoading, currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined || context === null) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }
