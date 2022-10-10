import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from '@mui/material'
import NextLink from 'next/link'
import {
  SearchOutlined,
  ShoppingCartCheckoutOutlined,
} from '@mui/icons-material'

interface Props {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
}

export const Navbar: React.FC<Props> = ({ setShowMenu }) => {
  const handleClick = () => {
    setShowMenu(true)
  }
  return (
    <AppBar>
      <Toolbar>
        <NextLink href='' passHref>
          <Link display='flex' alignItems='center'>
            <Typography variant='h5'>Cupcake |</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>

        <Box flex={1}></Box>

        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <NextLink href='/Cupcakes'>
            <Link>
              <Button size='medium'>Ver Cupcackes</Button>
            </Link>
          </NextLink>
          <NextLink href='categories/CupcakesLivianos'>
            <Link>
              <Button size='medium'>Opciones livianas</Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1}></Box>

        <Box>
          <IconButton name='Buscar'>
            <SearchOutlined />
          </IconButton>

          <NextLink href='/cart' passHref>
            <Link>
              <Badge badgeContent={2} color='secondary'>
                <ShoppingCartCheckoutOutlined />
              </Badge>
            </Link>
          </NextLink>

          <Button size='medium' onClick={handleClick}>
            Menú
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
