import Feed from '@/components/Feed'
import Header from '@/components/Header'
import Modal from '@/components/Modal'
import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [people, setPeople] = useState([])
  const [postId, setPostId] = useState('')
  return (
    <div className='bg-gray-50 h-screen overflow-y-scroll scrollbar-hide'>
      <Head>
        <title>Instagram</title>
        <link rel='icon' href='/logo.png' />
      </Head>

      <Header />
      <Feed setPeople={setPeople} setPostId={setPostId} />
      <Modal likes={people} postId={postId} />
    </div>
  )
}
