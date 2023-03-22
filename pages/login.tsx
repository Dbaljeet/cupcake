import { Box, Button, Typography } from '@mui/material'
import { ShopLayout } from '../components/layouts'
import { getSession, getProviders, signIn } from 'next-auth/react'
import { GetServerSideProps } from 'next/types'
import { useEffect, useState } from 'react'
function Login() {
  //await signIn('credentials', {email, password})
  const [providers, setProviders] = useState<any>({})

  useEffect(() => {
    getProviders().then((prov) => setProviders(prov))
  }, [])

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
        height="calc(100vh - 200px)"
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
  // console.log({session});

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
export default Login
