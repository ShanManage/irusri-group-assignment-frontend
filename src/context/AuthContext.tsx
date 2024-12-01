import { createContext, useContext, useState } from 'react'
import {
  AuthContextType,
  AuthProviderProps,
  AuthResponseType,
  AuthUser,
  LoginFormFields,
  RegisterFormFields,
} from '../interface'

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
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  const signUp = ({ username, password }: RegisterFormFields): Promise<AuthResponseType> => {
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
  
        const newUser: AuthUser = { id: users.length + 1, username, password };
        setUsers((prevUsers) => [...prevUsers, newUser]);
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
            message: "Login successful",
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
