import {
  Box,
  Typography,
  Link,
  Chip,
  Grid,
  Card,
  CircularProgress,
} from '@mui/material'
import { ShopLayout } from '../../components/layouts'
import { useRouter } from 'next/router'
import { GetServerSideProps, NextPage } from 'next'
import { IOrder, IPaypal } from '../../interfaces'
import { zones } from '../../utils/zones'
import { CartList } from '../../components/cart'
import { Cashformat } from '../../utils'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Loading } from '../../components/ui'

interface Props {
  id: string
}

const zoneDef = (zone: String) => {
  const aux = zones.find((z) => z.code === zone)
  return aux?.name
}

const Order: NextPage<Props> = () => {
  const [order, setOrder] = useState<IOrder>({
    _id: '',
    user: '',
    orderItems: [],
    shippingAddress: {
      firstName: '',
      lastName: '',
      zone: '',
      address: '',
      phone: '',
    },
    paymentResult: '',
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
    isPaid: false,
    transactionId: '',

    createdAt: '',
    updatedAt: '',
  })

  const [isPaying, setIsPaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const { id } = router.query

  useEffect(() => {
    if (!id) return
    setIsLoading(true)
    const getOrder = async () => {
      const data = await axios
        .create({
          baseURL: '/api',
        })
        .post(`/orders/getOrder`, {
          orderId: id,
        })
        .catch(function (error) {
          setOrder(error.response.data)
        })
      if (data) {
        setOrder(data.data)
        setIsLoading(false)
      }
    }
    try {
      getOrder()
    } catch (err) {
      router.push('/')
    }
  }, [id, router])

  const { shippingAddress } = order

  const onOrderCompleted = async (details: IPaypal.OrderResponseBody) => {
    if (details.status !== 'COMPLETED') {
      return alert('No hay pago en Paypal')
    }

    setIsPaying(true)

    try {
      const { data } = await axios
        .create({
          baseURL: '/api',
        })
        .post(`/orders/pay`, {
          transactionId: details.id,
          orderId: order._id,
        })

      router.reload()
    } catch (error) {
      setIsPaying(false)
      alert('Error')
    }
  }

  return (
    <ShopLayout
      title={'Orden | Cupcakes'}
      pageDescription={'Revisa tu orden, pedido'}
    >
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='calc(100vh - 200px)'
        flexDirection={'column'}
      >
        {!order._id ? (
          <></>
        ) : order._id === 'error' ? (
          'Error, ingrese con la cuenta correcta'
        ) : (
          <>
            <Chip
              color={order.isPaid ? 'success' : 'error'}
              label={order.isPaid ? 'pago con éxito' : 'sin pagar'}
            />

            {isLoading && <Loading />}
            <Box display='flex' alignItems='center' flexWrap={'wrap'}>
              <Typography variant='h1' component='h1' fontSize={100}>
                Orden|
              </Typography>
              <Typography variant='h2' component='h2' fontSize={50}>
                n°
              </Typography>
              <Box>
                <Link
                  onClick={() =>
                    navigator.clipboard.writeText(
                      order._id ? order._id.toString() : ''
                    )
                  }
                  title='Click para copiar número de orden'
                  className='pointer'
                  typography='h5'
                  color='secondary'
                  fontSize={40}
                  sx={{ wordBreak: 'break-word' }}
                >
                  {order._id}
                </Link>
              </Box>
            </Box>

            <Grid container justifyContent={'center'}>
              <Grid item sm={8} xs={12}>
                <Box sx={{ padding: '10px', mt: '40px' }}>
                  <CartList products={order.orderItems} />
                </Box>
              </Grid>

              <Grid item sm={4} xs={12} p={2}>
                <Card className='summary-card'>
                  <Box
                    m={'auto'}
                    sx={{
                      backgroundColor: '#4359',
                      color: '#fff',
                      p: '10px',
                      borderRadius: '10px',
                      mt: '40px',
                      width: '90%',
                    }}
                  >
                    <Typography variant='h3' component='h3' fontSize={20}>
                      Sector: {zoneDef(shippingAddress.zone)}
                    </Typography>
                    <Typography variant='h3' component='h3' fontSize={20}>
                      Dirección: {shippingAddress.address}
                    </Typography>
                    <Typography variant='h3' component='h3' fontSize={20}>
                      Entrega a: {shippingAddress.firstName}{' '}
                      {shippingAddress.lastName}
                    </Typography>
                  </Box>

                  <Box
                    m={'auto'}
                    sx={{
                      backgroundColor: '#4359',
                      color: '#fff',
                      p: '10px',
                      borderRadius: '10px',
                      mt: '40px',
                      width: '90%',
                    }}
                  >
                    <Typography variant='h3' component='h3' fontSize={20}>
                      Cantidad productos: {order.numberOfItems}
                    </Typography>
                    <Typography variant='h3' component='h3' fontSize={20}>
                      Subtotal: {Cashformat(order.subTotal, 0)}
                    </Typography>
                    <Typography variant='h3' component='h3' fontSize={20}>
                      Impuesto: {order.tax}
                    </Typography>
                    <Typography variant='h3' component='h3' fontSize={20}>
                      Total: {Cashformat(order.total, 2)}
                    </Typography>
                  </Box>

                  <Box
                    sx={{ mt: 3 }}
                    display={`${order.isPaid ? 'flex' : 'none'}`}
                    flexDirection='column'
                    textAlign={'center'}
                  >
                    <Chip
                      color='success'
                      label='Orden pagada'
                      sx={{ width: '70%', m: 'auto', mb: '15px' }}
                    />
                  </Box>

                  <Box
                    sx={{ mt: 3 }}
                    display={`${!order.isPaid ? 'flex' : 'none'}`}
                    flexDirection='column'
                  >
                    {
                      <Box
                        display={!isPaying ? 'none' : 'flex'}
                        sx={{
                          m: 'auto',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography>
                          Cargando... <CircularProgress />
                        </Typography>
                      </Box>
                    }

                    <Box
                      sx={{
                        display: isPaying ? 'none' : 'flex',
                        flex: 1,
                        flexDirection: 'column',
                      }}
                    >
                      <PayPalButtons
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value: order.total.toString(),
                                },
                              },
                            ],
                          })
                        }}
                        onApprove={(data, actions) => {
                          return actions.order!.capture().then((details) => {
                            onOrderCompleted(details)
                            const name = details.payer.name!.given_name
                            alert(`Transacción completada por ${name}`)
                          })
                        }}
                      />
                    </Box>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </ShopLayout>
  )
}

export default Order
