import { getProviders, signIn } from 'next-auth/react'
import Header from '@/components/Header'

const SignIn = ({ providers }) => {
  return (
    <>
      <Header inLogIn={true} />
      <div className='flex flex-col items-center justify-center text-center p-24'>
        <img src='https://links.papareact.com/ocw' className='w-80' alt='' />
        <p className='font-xs italic mt-5 mb-20'>
          This is NOT the real instagram app, this app was built for educational
          purposes only.
        </p>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              className='bg-blue-500 text-white py-3 px-8 rounded-xl'
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export const getServerSideProps = async () => {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}

export default SignIn
