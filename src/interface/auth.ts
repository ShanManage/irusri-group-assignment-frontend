import { ReactNode } from "react";

export interface AuthContextType {
  authenticate: (props: LoginFormFields) => Promise<boolean>
  signUp: (props: RegisterFormFields) => Promise<boolean>
  signOut: () => void
  isLoading: boolean
  currentUser: AuthUser | null;
}

export interface AuthProviderProps {
  children: ReactNode
}
export interface AuthUser {
  id: number
  username: string;
  password: string;
}
export interface LoginFormFields {
  username: string
  password: string
}

export interface RegisterFormFields {
  username: string
  password: string
}