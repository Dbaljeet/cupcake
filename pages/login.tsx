import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { getProviders, signIn } from 'next-auth/react'

import { ShopLayout } from '../components/layouts'

import { ErrorOutline, GroupAddOutlined } from '@mui/icons-material'
import {
  Button,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { Chip } from '@mui/material'
import { Typography } from '@mui/material'
import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { Box } from '@mui/material'

import { validations } from '../utils'

type FormData = {
  email: string
  password: string
}

function Login() {
  const router = useRouter()
  //await signIn('credentials', {email, password})
  const [showError, setShowError] = useState(false)
  const [providers, setProviders] = useState<any>({})
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  useEffect(() => {
    getProviders().then((prov) => setProviders(prov))
  }, [])

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false)
    const x = await signIn('credentials', { email, password, redirect: false })

    if (x?.error) {
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 4000)
    } else {
      router.push(router.query.p?.toString() || '/')
    }
  }

  return (
    <ShopLayout
      title={'Iniciar sesión'}
      pageDescription={
        'Inicia sesión para comprar los mejores cupcakes de la cuarta región'
      }
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: 'calc(100vh - 200px)' }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            gap: '30px',
          }}
        >
          <Typography variant="h1" component="h1" fontSize={80}>
            Iniciar sesión
          </Typography>
          <Chip
            label="No reconocemos ese usuario / contraseña"
            color="error"
            icon={<ErrorOutline />}
            className="fadeIn"
            sx={{ display: showError ? 'flex' : 'none' }}
          />
          <form onSubmit={handleSubmit(onLoginUser)} noValidate>
            <Grid item xs={12} m={2}>
              <TextField
                type="email"
                label="Correo"
                variant="filled"
                fullWidth
                {...register('email', {
                  required: 'Este campo es requerido',
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12} m={2}>
              <TextField
                label="Contraseña"
                type="password"
                variant="filled"
                fullWidth
                {...register('password', {
                  required: 'Este campo es requerido',
                  minLength: { value: 6, message: 'Mínimo 6 caracteres' },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12} m={2}>
              <Button
                sx={{
                  borderRadius: '30px',
                  backgroundColor: '#375fcc',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#274494',
                  },
                }}
                type="submit"
                size="large"
                fullWidth
              >
                Ingresar
              </Button>
            </Grid>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {Object.values(providers).map((provider: any) => {
                if (provider.id === 'credentials')
                  return <div key="credentials"></div>
                return (
                  <Button
                    key={provider.id}
                    color="primary"
                    sx={{
                      m: 'auto',
                      mb: 1,
                      backgroundColor: '#f0f2',
                      border: '1px solid #888',
                      width: '80%',
                      '&:hover': {
                        backgroundColor: 'rgb(243 174 243 / 28%)',
                      },
                    }}
                    onClick={() => signIn(provider.id)}
                  >
                    <Typography fontSize={18}>{provider.name}</Typography>
                  </Button>
                )
              })}
            </Box>
          </form>

          <ListItemButton
            sx={{ margin: 'auto', borderRadius: '20px' }}
            onClick={() => router.push(`/register`)}
            aria-label="Regístrate para formar parte de nuestra tienda"
          >
            <ListItemIcon>
              <GroupAddOutlined />
            </ListItemIcon>
            <ListItemText primary={'Registrarse'} />
          </ListItemButton>
        </Box>
      </Box>
    </ShopLayout>
  )
}

export default Login
