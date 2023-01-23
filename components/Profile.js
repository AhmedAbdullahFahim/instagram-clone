import { useSession, signOut } from 'next-auth/react'

const Profile = () => {
  const { data: session } = useSession()
  return (
    <div className='flex items-center justify-between mt-14 ml-10'>
      <img
        src={session.user.image}
        alt=''
        className='object-contain h-16 w-16 rounded-full border p-[2px]'
      />
      <div className='flex-1 mx-4'>
        <h2 className='font-bold'>{session.user.username}</h2>
        <h3 className='text-sm text-gray-400'>Welcome to Instagram</h3>
      </div>
      <button
        onClick={signOut}
        className='ml-10 text-blue-400 text-sm font-semibold'
      >
        Sign Out
      </button>
    </div>
  )
}

export default Profile
