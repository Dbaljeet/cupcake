import { getSession } from 'next-auth/react'
import { getProviders } from 'next-auth/react'
import { signIn } from 'next-auth/react'
import { GetServerSideProps } from 'next/types'

type FormData = {
  name: string
  email: string
  password: string
}

function Register2() {
  return <>test</>
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
export default Register2
