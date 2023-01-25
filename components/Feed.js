import { useSession } from 'next-auth/react'
import Posts from './Posts'
import Profile from './Profile'
import Stories from './Stories'
import Suggestions from './Suggestions'

const Feed = ({ setPeople, setPostId }) => {
  const { data: session } = useSession()
  return (
    <main
      className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto ${
        !session && '!grid-cols-1 !max-w-4xl'
      }`}
    >
      <section className='col-span-2'>
        {session && <Stories />}
        <Posts setPeople={setPeople} setPostId={setPostId} />
      </section>
      {session && (
        <section className='hidden xl:inline-grid md:col-span-1'>
          <div className='fixed'>
            <Profile />
            <Suggestions />
          </div>
        </section>
      )}
    </main>
  )
}

export default Feed
