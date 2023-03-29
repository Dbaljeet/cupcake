import { IUser } from '../../interfaces/user'
import { authState } from './index'

type authActionType =
  | { type: '[AUTH] - Login'; payload: IUser }
  | { type: '[AUTH] - Logout' }

export const authReducer = (
  state: authState,
  action: authActionType
): authState => {
  switch (action.type) {
    case '[AUTH] - Login':
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      }
    case '[AUTH] - Logout':
      return {
        ...state,
        user: undefined,
        isLoggedIn: false,
      }

    default:
      return state
  }
}
