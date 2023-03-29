import {
  Typography,
  Grid,
  Button,
  Divider,
  Box,
  Card,
  CardContent,
} from '@mui/material'
import { ShopLayout } from '../../components/layouts'
import { CartList } from '../../components/cart'
import { useContext, useEffect } from 'react'
import { CartContext } from '../../context'
import { Cashformat } from '../../utils'
import { useRouter } from 'next/router'

export default function Cart() {
  const { isLoaded, cart } = useContext(CartContext)
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.replace('/cart/empty')
    }
  }, [isLoaded, cart, router])

  const { numberOfItems, subTotal, tax, total } = useContext(CartContext)

  return (
    <>
      <ShopLayout
        title={'Carro (n)'}
        pageDescription={'Verifique su carro y finalice su compra'}
      >
        {!isLoaded || cart.length === 0 ? (
          <>Cargando...</>
        ) : (
          <Grid container direction={'row'} sx={{ gap: '4px' }}>
            <Grid item xs={12} sm={12} md={7}>
              <CartList editable />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Card className="summary-card">
                <CardContent>
                  <Typography variant="h1" component="h1">
                    Carro
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="h5" component="h5">
                    {`Cantidad productos: ${numberOfItems}`}
                  </Typography>
                  <Typography variant="h5" component="h5">
                    {`Subtotal: ${Cashformat(subTotal, 0)}`}
                  </Typography>
                  <Typography variant="h5" component="h5">
                    {`Impuesto: ${tax}`}
                  </Typography>
                  <Typography variant="h5" component="h5">
                    {`Total: ${Cashformat(total, 2)}`}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ mt: 3 }}>
                    <Button
                      href="/checkout/address"
                      color="secondary"
                      className="circular-btn"
                      fullWidth
                    >
                      Finalizar compra
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </ShopLayout>
    </>
  )
}
