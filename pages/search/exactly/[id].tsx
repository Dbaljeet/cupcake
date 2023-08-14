import {
  Box,
  IconButton,
  Input,
  InputAdornment,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import { ShopLayout } from '../../../components/layouts'
import { ProductList } from '../../../components/products'
import { Loading } from '../../../components/ui'
import { useProducts } from '../../../hooks'
import { useRouter } from 'next/router'
import { SearchOutlined } from '@mui/icons-material'
import { useState } from 'react'

export default function SearchProduct() {
  const router = useRouter()
  const { id } = router.query
  console.log(id, 'id page')

  const [searchTerm, setSearchTerm] = useState('')
  const [searchExact, setSearchExact] = useState(false)

  const { products, isLoading } = useProducts(`/search/exactly/${id}`)

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return
    if (searchExact) {
      router.push(`/search/exactly/${searchTerm}`)
      return
    }
    router.push(`/search/${searchTerm}`)
  }

  return (
    <>
      <ShopLayout
        title={`Cupcake La Serena | ${id}`}
        pageDescription={'Encuentra los mejores cupcakes de la cuarta región'}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: { xs: 'center', sm: 'space-between' },
          }}
        >
          <Box sx={{ padding: 2 }}>
            <Typography variant="h1" component="h1">
              Cupcake
            </Typography>
            <Typography variant="h2">Productos | {id}</Typography>
          </Box>

          {/* Search more items */}
          <Box
            sx={{
              maxWidth: '300px',
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '30px',
              alignItems: { xs: 'center', md: 'end' },
            }}
          >
            <FormControlLabel
              label="Activar búsqueda precisa"
              control={
                <Checkbox
                  aria-label="Activar búsqueda precisa"
                  checked={searchExact}
                  onChange={(ev) => setSearchExact((prev) => !prev)}
                />
              }
            ></FormControlLabel>

            <Input
              sx={{ margin: 'auto' }}
              className="fadeIn"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => (e.key === 'Enter' ? onSearchTerm() : null)}
              type="text"
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    name="Buscar"
                    onClick={() => onSearchTerm()}
                    className="fadeIn"
                  >
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box>
        </Box>

        {isLoading ? (
          <Loading />
        ) : products.length > 0 ? (
          <ProductList products={products} />
        ) : (
          <Typography>No se encontraron productos</Typography>
        )}
      </ShopLayout>
    </>
  )
}
