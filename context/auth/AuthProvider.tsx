import { FC, useEffect, useReducer } from 'react'
import { authContext, authReducer } from './index'
import { signOut, useSession } from 'next-auth/react'

import { IUser } from '../../interfaces/user'

import Cookies from 'js-cookie'
import axios from 'axios'
import { useRouter } from 'next/router'

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
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      dispatch({ type: '[AUTH] - Login', payload: data?.user as IUser })
    }
  }, [status, data])

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await axios
        .create({
          baseURL: '/api',
        })
        .post('/user/login', { email, password })
      const { token, user } = data
      Cookies.set('token', token)
      dispatch({ type: '[AUTH] - Login', payload: user })
      return true
    } catch (error) {
      return false
    }
  }

  const checkToken = async () => {
    if (!Cookies.get('token')) {
      return
    }

    try {
      const { data } = await axios
        .create({
          baseURL: '/api',
        })
        .get('/user/validate-token')
      const { token, user } = data
      Cookies.set('token', token)
      dispatch({ type: '[AUTH] - Login', payload: user })
    } catch (error) {
      Cookies.remove('token')
    }
  }

  const logout = () => {
    Cookies.remove('token')
    Cookies.remove('cart')
    signOut()
    dispatch({ type: '[AUTH] - Logout' })
  }

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await axios
        .create({
          baseURL: '/api',
        })
        .post('/user/register', { name, email, password })
      const { token, user } = data
      Cookies.set('token', token)
      dispatch({ type: '[AUTH] - Login', payload: user })
      return {
        hasError: false,
      }
    } catch (error) {
      console.log('error', error)

      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        }
      }

      return {
        hasError: true,
        message: 'No se pudo crear el usuario - intente de nuevo',
      }
    }
  }

  return (
    <authContext.Provider
      value={{
        ...state,
        //methods
        logout,
        registerUser,
        loginUser,
      }}
    >
      {children}
    </authContext.Provider>
  )
}
