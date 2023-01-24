import Feed from '@/components/Feed'
import Header from '@/components/Header'
import LikesModal from '@/components/LikesModal'
import Modal from '@/components/Modal'
import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [people, setPeople] = useState([])
  return (
    <div className='bg-gray-50 h-screen overflow-y-scroll scrollbar-hide'>
      <Head>
        <title>Instagram</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <Feed setPeople={setPeople} />
      <Modal />
      <LikesModal likes={people} />
    </div>
  )
}
