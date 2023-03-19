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

export default function Cart() {
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
                <Box sx={{ mt: 3 }}>
                  <Button color="secondary" className="circular-btn" fullWidth>
                    Checkout
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
