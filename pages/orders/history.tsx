import NextLink from 'next/link'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

import { Typography, Grid, Chip, Link } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'

import { ShopLayout } from '../../components/layouts'
import { dbOrders } from '../../database'
import { useEffect, useState } from 'react'
import { IOrder } from '../../interfaces'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullname', headerName: 'Nombre Completo', width: 300 },

  {
    field: 'paid',
    headerName: 'Estado',
    description: 'Muestra información si está pagada la orden o no',
    width: 200,
    // @ts-ignore
    renderCell: (params: GridValueGetterParams) => {
      return (
        <Chip
          color={params.row.paid ? 'success' : 'error'}
          label={params.row.paid ? 'Pagada' : 'No pagada'}
          variant="outlined"
        />
      )
    },
  },
  {
    field: 'orden',
    headerName: 'Ver orden',
    width: 200,
    sortable: false,
    // @ts-ignore
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextLink href={`/orders/${params.row.orderId}`} passHref>
          <Link underline="always">Ver orden</Link>
        </NextLink>
      )
    },
  },
]

interface Rows {
  id: number
  paid: boolean
  fullname: string
  orderId: string | undefined
}

function request<IOrders>(
  url: string,
  config: RequestInit = {}
): Promise<IOrders> {
  return fetch(url, config)
    .then((response) => response.json())
    .then((data) => data as IOrders)
}

const HistoryPage = () => {
  const [rows, setRows] = useState<Rows[]>([])

  const getOrder = async () => {
    const orders = await request<IOrder[]>(`/api/${'getData'}`)
    console.log(orders)
    const rows = orders.map((order, idx) => ({
      id: idx + 1,
      paid: order.isPaid,
      fullname: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
      orderId: order._id,
    }))
    setRows(rows)
  }

  useEffect(() => {
    getOrder()
  }, [])

  return (
    <ShopLayout
      title={'Historial de ordenes'}
      pageDescription={'Historial de ordenes del cliente'}
    >
      <Typography variant="h1" component="h1">
        Historial de ordenes
      </Typography>

      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default HistoryPage
