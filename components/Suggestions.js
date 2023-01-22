import { faker } from '@faker-js/faker'
import { useEffect, useState } from 'react'

const Suggestions = () => {
  const [profiles, setProfiles] = useState([])
  useEffect(() => {
    const people = [...Array(5)].map((_, i) => ({
      id: i,
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
      company: faker.company.name(),
    }))
    setProfiles(people)
  }, [])
  return (
    <div className='mt-4 ml-10'>
      <div className='flex justify-between text-sm mb-5'>
        <h3 className='text-sm font-bold text-gray-400'>Suggestions for you</h3>
        <button className='text-gray-600 font-semibold cursor-pointer'>
          See All
        </button>
      </div>
      {profiles.map((profile) => (
        <div
          key={profile.id}
          className='flex items-center justify-between mt-3'
        >
          <img
            src={profile.avatar}
            alt=''
            className='h-10 w-10 rounded-full object-contain border p-[2px]'
          />
          <div className='flex-1 ml-4'>
            <h2 className='font-semibold text-sm'>{profile.username}</h2>
            <h3 className='text-xs text-gray-400'>Works at{profile.company}</h3>
          </div>
          <button className='text-blue-400 text-xs font-bold cursor-pointer'>
            Follow
          </button>
        </div>
      ))}
    </div>
  )
}

export default Suggestions
