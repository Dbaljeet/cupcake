import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography,
} from '@mui/material'
import NextLink from 'next/link'
import {
  ClearOutlined,
  SearchOutlined,
  ShoppingCartCheckoutOutlined,
} from '@mui/icons-material'
import { useContext, useState } from 'react'
import { CartContext, UiContext } from '../../context'
import { useRouter } from 'next/router'

export const Navbar: React.FC = ({}) => {
  const { toggleSideMenu } = useContext(UiContext)
  const { numberOfItems } = useContext(CartContext)
  const { asPath, push } = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return
    push(`/search/${searchTerm}`)
  }

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Typography variant="h5">Cupcake |</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>

        <Box flex={1}></Box>

        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <NextLink href="/">
            <Link>
              <Button size="medium">Ver Cupcackes</Button>
            </Link>
          </NextLink>
          <NextLink href="categories/CupcakesLivianos">
            <Link>
              <Button size="medium">Opciones livianas</Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1}></Box>

        {isSearchVisible ? (
          <Input
            sx={{ display: { xs: 'none', sm: 'flex' } }}
            className="fadeIn"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => (e.key === 'Enter' ? onSearchTerm() : null)}
            type="text"
            placeholder="Buscar..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setIsSearchVisible(false)}>
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            name="Buscar"
            onClick={() => setIsSearchVisible(true)}
            className="fadeIn"
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            <SearchOutlined />
          </IconButton>
        )}

        {/* Pantallas pequeñas */}
        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={toggleSideMenu}
        >
          <SearchOutlined />
        </IconButton>

        <Box>
          <NextLink href="/cart" passHref>
            <Link>
              <Badge badgeContent={numberOfItems} color="secondary">
                <ShoppingCartCheckoutOutlined />
              </Badge>
            </Link>
          </NextLink>

          <Button size="medium" onClick={toggleSideMenu}>
            Menú
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
