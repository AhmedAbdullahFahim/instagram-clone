import { faker } from '@faker-js/faker'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Story from './Story'

const Stories = () => {
  const { data: session } = useSession()
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
      {session && (
        <Story username={session.user.username} img={session.user.image} />
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
