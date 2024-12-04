import { ReactNode } from "react";

export interface AuthContextType {
  authenticate: (props: LoginFormFields) => Promise<AuthResponseType>
  signUp: (props: RegisterFormFields) => Promise<AuthResponseType>
  signOut: () => void
  isLoading: boolean
  currentUser: AuthUser | null;
}

export interface AuthProviderProps {
  children: ReactNode
}
export interface AuthUser {
  id: number
  name: string
  username: string;
  password: string;
}
export interface LoginFormFields {
  username: string
  password: string
}

export interface RegisterFormFields {
  name: string
  username: string
  password: string
}

export interface AuthResponseType {
  success: boolean
  message: string
}

export interface RegisterProps {
  onFinish: (values: RegisterFormFields) => void
}

export interface LoginProps {
  onFinish: (values: RegisterFormFields) => void
}