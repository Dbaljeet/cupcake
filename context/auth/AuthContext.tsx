import { createContext } from 'react'
import { IUser } from '../../interfaces/user'
interface ContextProps {
  user?: IUser
  isLoggedIn: boolean
  logout: () => void
}

export const authContext = createContext({} as ContextProps)
