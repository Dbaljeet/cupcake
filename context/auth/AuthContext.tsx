import { createContext } from 'react'
import { IUser } from '../../interfaces/user'
interface ContextProps {
  user?: IUser
  isLoggedIn: boolean

  loginUser: (email: string, password: string) => Promise<boolean>
  logout: () => void
  registerUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ hasError: boolean; message?: string }>
}
export const authContext = createContext({} as ContextProps)
