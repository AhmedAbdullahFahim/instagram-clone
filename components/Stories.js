import { faker } from '@faker-js/faker'
// import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Story from './Story'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase'

const Stories = () => {
  // const { data: session } = useSession()
  const [user] = useAuthState(auth)
  const [suggestions, setSuggestions] = useState([])
  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      id: i,
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
    }))
    setSuggestions(suggestions)
    console.log(suggestions)
  }, [])
  return (
    <div className='flex space-x-2 p-6 bg-white overflow-x-scroll mt-8 border-gray-200 border rounded-sm scrollbar-thin scrollbar-thumb-gray-400'>
      {/* {session && (
        <Story username={session.user.username} img={session.user.image} />
      )} */}
      {/* {session && ( */}
      {user && (
        <div className='relative'>
          <img
            // src={session.user.image}
            src={user.photoURL}
            alt='story'
            className='h-14 w-14 rounded-full object-contain transition transform hover:scale-110 duration-150 ease-out cursor-pointer'
          />
          <div className='bg-blue-500 absolute bottom-4 right-0 rounded-full flex items-center justify-center h-4 w-4'>
            <span className='font-bold text-white h-6 text-sm'>+</span>
          </div>
          <p className='text-xs w-14 text-center'>Your story</p>
        </div>
      )}
      {suggestions.map((profile) => (
        <Story
          key={profile.id}
          username={profile.username}
          img={profile.avatar}
        />
      ))}
    </div>
  )
}

export default Stories
