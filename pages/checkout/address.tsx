import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ShopLayout } from '../../components/layouts'
import { CartContext } from '../../context'
import { zones } from '../../utils/zones'

type FormData = {
  firstName: string
  lastName: string
  zone: string
  address: string
  extra?: string
  phone: string
}

const getAddressFromCookies = (): FormData => {
  return {
    firstName: Cookies.get('firstName') || '',
    lastName: Cookies.get('lastName') || '',
    address: Cookies.get('address') || '',
    extra: Cookies.get('address2') || '',
    zone: Cookies.get('zone') || '',
    phone: Cookies.get('phone') || '',
  }
}

export default function Address() {
  const [zonee, setZonee] = useState('')
  const router = useRouter()
  const { updateAddress } = useContext(CartContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: getAddressFromCookies(),
  })

  const onSubmitAddress = (data: FormData) => {
    updateAddress(data)
    router.push('/checkout/summary')
  }
  const handleChange = (event: SelectChangeEvent) => {
    setZonee(event.target.value as string)
  }

  return (
    <ShopLayout
      title={'Dirección envío'}
      pageDescription={'No hay nada que mostrar aquí'}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        flexWrap={'wrap'}
        textAlign={'center'}
      >
        <form onSubmit={handleSubmit(onSubmitAddress)}>
          <Typography variant="h1" component="h1" fontSize={60}>
            Agregue su información para el envío|
          </Typography>
          <Grid
            container
            gap={2}
            m={'auto'}
            sx={{ m: 'auto', mt: 2, maxWidth: '80%' }}
            justifyContent={'center'}
          >
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre"
                required
                variant="filled"
                fullWidth
                {...register('firstName', {
                  required: 'Este campo es requerido',
                })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Apellido"
                required
                variant="filled"
                fullWidth
                {...register('lastName', {
                  required: 'Este campo es requerido',
                })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ textAlign: 'initial' }}>
                <InputLabel id="demo-simple-select-label">Sector</InputLabel>
                <Select
                  label="Sector"
                  required
                  variant="filled"
                  defaultValue={Cookies.get('zone') || zones[0].code}
                  fullWidth
                  {...register('zone', {
                    required: 'Este campo es requerido',
                  })}
                  value={zonee}
                  onChange={handleChange}
                  error={!!errors.zone}
                >
                  {zones.map((zone) => (
                    <MenuItem key={zone.code} value={zone.code}>
                      {zone.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Dirección"
                required
                variant="filled"
                fullWidth
                {...register('address', {
                  required: 'Este campo es requerido',
                })}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Información extra (ej: es condominio, parcela, etc)"
                variant="filled"
                fullWidth
                {...register('extra')}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                type={'tel'}
                required
                label="Número celular"
                variant="filled"
                fullWidth
                {...register('phone', {
                  required: 'Este campo es requerido',
                })}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ m: 'auto', mt: 3, mb: 2 }}>
              <Button
                type="submit"
                sx={{
                  minWidth: '300px',
                  height: '50px',
                  backgroundColor: '#375fcc',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#274494',
                  },
                }}
                className="circular-btn"
                fullWidth
              >
                <Typography fontSize={20}>Confirmar datos entrega</Typography>
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </ShopLayout>
  )
}
