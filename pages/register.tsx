import { Box, Button, Chip, Grid, TextField, Typography } from '@mui/material'
import { ShopLayout } from '../components/layouts'
import { getSession, getProviders, signIn } from 'next-auth/react'
import { GetServerSideProps } from 'next/types'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { validations } from '../utils'
import { useRouter } from 'next/router'
import { redirect } from 'next/dist/server/api-utils'
import { ErrorOutline } from '@mui/icons-material'
type FormData = {
  email: string
  password: string
}

function Register() {
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
          <Typography variant="h1" component="h1" fontSize={100}>
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
                type="submit"
                color="secondary"
                className="circular-btn"
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

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req })

  const { p = '/' } = query
  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
export default Register
