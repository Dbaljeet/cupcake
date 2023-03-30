import { Box, Typography, Link, Chip } from '@mui/material'
import { ShopLayout } from '../../components/layouts'
import { useRouter } from 'next/router'
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { dbOrders } from '../../database'
import { IOrder } from '../../interfaces'

interface Props {
  order: IOrder
}

const Order: NextPage<Props> = ({ order }) => {
  const router = useRouter()
  const { shippingAddress } = order
  return (
    <ShopLayout
      title={'Carro vacío'}
      pageDescription={'No hay productos en el carro'}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
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
          <Box>
            <Typography variant="h2" component="h2" fontSize={50}>
              n°
            </Typography>
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

        <Box>
          <Typography variant="h3" component="h3" fontSize={20}>
            Dirección: {shippingAddress.address}
          </Typography>
          <Typography variant="h3" component="h3" fontSize={20}>
            Entrega a:{' '}
            {shippingAddress.firstName + ' ' + shippingAddress.lastName}
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
