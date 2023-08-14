import { Box } from '@mui/material'
import { Button } from '@mui/material'
import { Chip } from '@mui/material'
import { Grid } from '@mui/material'
import { TextField } from '@mui/material'
import { Typography } from '@mui/material'
import { ShopLayout } from '../components/layouts'
import { getProviders } from 'next-auth/react'
import { signIn } from 'next-auth/react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { validations } from '../utils'
import { useRouter } from 'next/router'
import { ErrorOutline } from '@mui/icons-material'
import { authContext } from '../context/auth'

type FormData = {
  name: string
  email: string
  password: string
}

function Register() {
  const router = useRouter()
  //await signIn('credentials', {email, password})
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [providers, setProviders] = useState<any>({})

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const { registerUser } = useContext(authContext)

  useEffect(() => {
    getProviders().then((prov) => setProviders(prov))
  }, [])

  const onRegisterForm = async ({ name, email, password }: FormData) => {
    setShowError(false)
    const { hasError, message } = await registerUser(name, email, password)

    if (hasError) {
      setShowError(true)
      setErrorMessage(message!)
      setTimeout(() => setShowError(false), 3000)
      return
    }

    await signIn('credentials', { email, password })
  }

  return (
    <ShopLayout
      title={'Regístrate'}
      pageDescription={
        'Regístrate para comprar los mejores cupcakes de la cuarta región'
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
            Regístrate
          </Typography>
          <Chip
            label="No reconocemos ese usuario / contraseña"
            color="error"
            icon={<ErrorOutline />}
            className="fadeIn"
            sx={{ display: showError ? 'flex' : 'none' }}
          />
          <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
            <Grid item xs={12} m={2}>
              <TextField
                type="text"
                label="Nombre"
                variant="filled"
                fullWidth
                {...register('name', {
                  required: 'Este campo es requerido',
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

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
                type="submit"
                size="large"
                fullWidth
                sx={{
                  borderRadius: '30px',
                  backgroundColor: '#375fcc',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#274494',
                  },
                }}
              >
                Enviar
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
                      backgroundColor: '#ffffffae',
                      border: '1px solid #888',
                      width: '80%',
                      '&:hover': {
                        backgroundColor: '#ffffff6b',
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
        </Box>
      </Box>
    </ShopLayout>
  )
}

export default Register
