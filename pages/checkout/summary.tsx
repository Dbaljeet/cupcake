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
import { zones } from '../../utils/zones'

export default function Cart() {
  const {
    isLoaded,
    cart,
    createOrder,
    shippingAddress,
    numberOfItems,
    subTotal,
    tax,
    total,
  } = useContext(CartContext)

  const router = useRouter()

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.replace('/cart/empty')
    }
  }, [isLoaded, cart, router])

  if (!shippingAddress) {
    return <></>
  }

  const { firstName, lastName, zone, address, phone } = shippingAddress

  const zoneDef = (zone: String) => {
    const aux = zones.find((z) => z.code === zone)
    return aux?.name
  }

  return (
    <>
      <ShopLayout title={'Confirmar orden'} pageDescription={'Confirmar orden'}>
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

                  <Typography variant="h5" component="h5">
                    {`Nombre: ${firstName + ' ' + lastName}`}
                  </Typography>

                  <Typography variant="h5" component="h5">
                    {`Sector: ${zoneDef(zone)}`}
                  </Typography>
                  <Typography variant="h5" component="h5">
                    {`Dirección: ${address}`}
                  </Typography>
                  <Typography variant="h5" component="h5">
                    {`Celular: ${phone}`}
                  </Typography>

                  <Divider sx={{ my: 1 }} />

                  <Box sx={{ mt: 3 }}>
                    <Button
                      onClick={() => {
                        createOrder()
                      }}
                      className="circular-btn"
                      color="secondary"
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
