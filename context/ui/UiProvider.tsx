import { FC, useReducer } from 'react'
import { UiContext, UiReducer } from './index'

export interface UiState {
  isMenuOpen: boolean
}

const UI_INITIAL_STATE = {
  isMenuOpen: false,
}

interface Props {
  children: React.ReactNode | React.ReactNode[]
}

export const UiProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(UiReducer, UI_INITIAL_STATE)

  const toggleSideMenu = () => {
    dispatch({ type: '[UI] - ToggleMenu' })
  }

  return (
    <UiContext.Provider
      value={{
        ...state,

        // Methods
        toggleSideMenu,
      }}
    >
      {children}
    </UiContext.Provider>
  )
}
