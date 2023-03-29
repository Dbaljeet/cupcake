import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material'
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  LoginOutlined,
  SearchOutlined,
  VpnKeyOutlined,
} from '@mui/icons-material'

import { useContext, useState } from 'react'
import { UiContext } from '../../context'
import { useRouter } from 'next/router'
import { authContext } from '../../context/auth'
export const SideMenu: React.FC = () => {
  const router = useRouter()
  const { user, isLoggedIn, logout } = useContext(authContext)

  const { push } = useRouter()
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext)

  const navigateTo = (url: string) => {
    toggleSideMenu()
    router.push(url)
  }

  const [searchTerm, setSearchTerm] = useState('')

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return
    push(`/search/${searchTerm}`)
    toggleSideMenu()
  }

  return (
    <Drawer
      open={isMenuOpen}
      onClose={toggleSideMenu}
      anchor="right"
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => (e.key === 'Enter' ? onSearchTerm() : null)}
              type="text"
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => onSearchTerm()}
                    aria-label="toggle password visibility"
                  >
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          {isLoggedIn && (
            <>
              <li>
                <ListItemButton onClick={() => navigateTo('/profile')}>
                  <ListItemIcon>
                    <AccountCircleOutlined />
                  </ListItemIcon>
                  <ListItemText primary={'Perfil'} />
                </ListItemButton>
              </li>

              <li>
                <ListItemButton>
                  <ListItemIcon>
                    <ConfirmationNumberOutlined />
                  </ListItemIcon>
                  <ListItemText primary={'Mis Ordenes'} />
                </ListItemButton>
              </li>
              {/* 
              <li>
                <ListItemButton sx={{ display: { xs: '', sm: 'none' } }}>
                  <ListItemIcon>
                    <MaleOutlined />
                  </ListItemIcon>
                  <ListItemText primary={'...'} />
                </ListItemButton>
              </li>*/}

              <li>
                <ListItemButton onClick={() => logout()}>
                  <ListItemIcon>
                    <LoginOutlined />
                  </ListItemIcon>
                  <ListItemText primary={'Salir'} />
                </ListItemButton>
              </li>
            </>
          )}

          {!isLoggedIn && (
            <li>
              <ListItemButton
                onClick={() => navigateTo(`/login?p=${router.asPath}`)}
                aria-label="Inicia sesión para realizar tu compra"
              >
                <ListItemIcon>
                  <VpnKeyOutlined />
                </ListItemIcon>
                <ListItemText primary={'Ingresar'} />
              </ListItemButton>
            </li>
          )}

          {user?.role === 'Admin' && (
            <>
              <Divider />

              <ListSubheader>Admin Panel</ListSubheader>
              <li>
                <ListItemButton>
                  <ListItemIcon>
                    <CategoryOutlined />
                  </ListItemIcon>
                  <ListItemText primary={'Productos'} />
                </ListItemButton>
              </li>

              <li>
                <ListItemButton>
                  <ListItemIcon>
                    <ConfirmationNumberOutlined />
                  </ListItemIcon>
                  <ListItemText primary={'Ordenes'} />
                </ListItemButton>
              </li>

              <li>
                <ListItemButton>
                  <ListItemIcon>
                    <AdminPanelSettings />
                  </ListItemIcon>
                  <ListItemText primary={'Usuarios'} />
                </ListItemButton>
              </li>
            </>
          )}
        </List>
      </Box>
    </Drawer>
  )
}
