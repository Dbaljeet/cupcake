import { getSession } from 'next-auth/react'
import { getProviders } from 'next-auth/react'
import { signIn } from 'next-auth/react'
import { GetServerSideProps } from 'next/types'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { authContext } from '../context/auth'

type FormData = {
  name: string
  email: string
  password: string
}

function Register() {
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

  return <></>
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