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
import { useContext } from 'react'
import { CartContext } from '../../context'

export default function Cart() {
  const { numberOfItems, subTotal, tax, total } = useContext(CartContext)
  return (
    <>
      <ShopLayout
        title={'Carro (n)'}
        pageDescription={'Verifique su carro y finalice su compra'}
      >
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
                  {`Subtotal: ${subTotal}`}
                </Typography>
                <Typography variant="h5" component="h5">
                  {`Impuesto: ${tax}`}
                </Typography>
                <Typography variant="h5" component="h5">
                  {`Total: ${total}`}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ mt: 3 }}>
                  <Button color="secondary" className="circular-btn" fullWidth>
                    Finalizar compra
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </ShopLayout>
    </>
  )
}
