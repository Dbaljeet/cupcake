import { Box, Typography, Link, Chip } from '@mui/material'
import { ShopLayout } from '../../components/layouts'
import { useRouter } from 'next/router'
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { dbOrders } from '../../database'
import { IOrder } from '../../interfaces'
import { zones } from '../../utils/zones'
import { CartList } from '../../components/cart'
import { Cashformat } from '../../utils'

interface Props {
  order: IOrder
}

const zoneDef = (zone: String) => {
  const aux = zones.find((z) => z.code === zone)
  return aux?.name
}

const Order: NextPage<Props> = ({ order }) => {
  const router = useRouter()
  const { shippingAddress } = order
  return (
    <ShopLayout
      title={'Orden | Cupcakes'}
      pageDescription={'Revisa tu orden, pedido'}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="calc(100vh - 200px)"
        flexDirection={'column'}
      >
        <Chip
          color={order.isPaid ? 'success' : 'error'}
          label={order.isPaid ? 'pago con éxito' : 'sin pagar'}
        />
        <Box display="flex" alignItems="center" flexWrap={'wrap'}>
          <Typography variant="h1" component="h1" fontSize={100}>
            Orden|
          </Typography>
          <Typography variant="h2" component="h2" fontSize={50}>
            n°
          </Typography>
          <Box>
            <Link
              onClick={() =>
                navigator.clipboard.writeText(
                  order._id ? order._id.toString() : ''
                )
              }
              title="Click para copiar número de orden"
              className="pointer"
              typography="h5"
              color="secondary"
              fontSize={40}
              sx={{ wordBreak: 'break-word' }}
            >
              {order._id}
            </Link>
          </Box>
        </Box>

        <Box
          m={'auto'}
          sx={{
            backgroundColor: '#4359',
            color: '#fff',
            p: '10px',
            borderRadius: '10px',
            mt: '40px',
          }}
        >
          <Typography variant="h3" component="h3" fontSize={20}>
            Sector: {zoneDef(shippingAddress.zone)}
          </Typography>
          <Typography variant="h3" component="h3" fontSize={20}>
            Dirección: {shippingAddress.address}
          </Typography>
          <Typography variant="h3" component="h3" fontSize={20}>
            Entrega a: {shippingAddress.firstName} {shippingAddress.lastName}
          </Typography>
        </Box>

        <Box sx={{ maxWidth: '70%', padding: '10px', mt: '40px' }}>
          <CartList products={order.orderItems} />
        </Box>

        <Box
          m={'auto'}
          sx={{
            backgroundColor: '#4359',
            color: '#fff',
            p: '10px',
            borderRadius: '10px',
          }}
        >
          <Typography variant="h3" component="h3" fontSize={20}>
            Cantidad productos: {order.numberOfItems}
          </Typography>
          <Typography variant="h3" component="h3" fontSize={20}>
            Subtotal: {Cashformat(order.subTotal, 0)}
          </Typography>
          <Typography variant="h3" component="h3" fontSize={20}>
            Impuesto: {order.tax}
          </Typography>
          <Typography variant="h3" component="h3" fontSize={20}>
            Total: {Cashformat(order.total, 2)}
          </Typography>
        </Box>
      </Box>
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = '' } = query
  const session: any = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false,
      },
    }
  }

  const order = await dbOrders.getOrderById(id.toString())

  if (!order) {
    return {
      redirect: {
        destination: '/orders/history',
        permanent: false,
      },
    }
  }

  if (order.user !== session.user._id) {
    return {
      redirect: {
        destination: '/orders/history',
        permanent: false,
      },
    }
  }

  return {
    props: {
      order,
    },
  }
}

export default Order
