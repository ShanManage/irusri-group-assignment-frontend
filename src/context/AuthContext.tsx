import { createContext, useContext, useEffect, useState } from 'react'
import {
  AuthContextType,
  AuthProviderProps,
  AuthResponseType,
  AuthUser,
  LoginFormFields,
  RegisterFormFields,
} from '../interface'
import { LOCAL_STORAGE_KEYS } from '../constant'

const AuthContext = createContext<AuthContextType>({
  authenticate: async () => ({
    success: false,
    message: "Default authentication response",
  }),
  signUp: async () => ({
    success: false,
    message: "Default signup response",
  }),
  signOut: () => {},
  isLoading: false,
  currentUser: null,
})

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState<AuthUser[]>(() => {
    const storedUsers = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_USERS);
    return storedUsers ? JSON.parse(storedUsers) : [];
  });
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_USER);
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
  }, [currentUser]);
  
  const signUp = ({ username, password, name }: RegisterFormFields): Promise<AuthResponseType> => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      setTimeout(() => {
        const userExists = users.some((user) => user.username === username);
  
        if (userExists) {
          setIsLoading(false);
          reject({
            success: false,
            message: "User already exists",
          });
          return;
        }
  
        const newUser: AuthUser = { id: users.length + 1, username, password, name };
        setUsers((prevUsers) => [...prevUsers, newUser]);
        setCurrentUser(newUser);
        setIsLoading(false);
        resolve({
          success: true,
          message: "Signup successful",
        });
      }, 2000);
    });
  };

  const authenticate = async ({ username, password }: LoginFormFields): Promise<AuthResponseType> => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = users.find(
          (user) => user.username === username && user.password === password
        );
  
        if (foundUser) {
          setCurrentUser(foundUser);
          setIsLoading(false);
          resolve({
            success: true,
            message: "Signin successful",
          });
        } else {
          setIsLoading(false);
          reject({
            success: false,
            message: "Invalid username or password",
          });
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
