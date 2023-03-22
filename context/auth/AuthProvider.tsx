import { FC, useEffect, useReducer } from 'react'
import { authContext, authReducer } from './index'
import { signOut, useSession } from 'next-auth/react'
import { IUser } from '../../interfaces/user'
import Cookies from 'js-cookie'

export interface authState {
  user?: IUser
  isLoggedIn: boolean
}

const AUTH_INITIAL_STATE = {
  user: undefined,
  isLoggedIn: false,
}

interface Props {
  children: React.ReactNode | React.ReactNode[]
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)
  const { data, status } = useSession()

  useEffect(() => {
    if (status === 'authenticated') {
      dispatch({ type: '[AUTH] - Login', payload: data?.user as IUser })
    }
  }, [status, data])

  const logout = () => {
    Cookies.remove('cart')
    signOut()
    dispatch({ type: '[AUTH] - Logout' })
  }

  return (
    <authContext.Provider
      value={{
        ...state,
        //methods
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  )
}
