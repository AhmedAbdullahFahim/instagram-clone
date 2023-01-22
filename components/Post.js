import {
  BookmarkIcon,
  HeartIcon,
  PaperAirplaneIcon,
  EllipsisHorizontalIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  FaceSmileIcon,
} from '@heroicons/react/24/outline'

import { HeartIcon as HeartIconFilled } from '@heroicons/react/24/solid'
import { useState } from 'react'

const Post = ({ id, name, userImg, postImg, caption }) => {
  const [showDots, setShowDots] = useState(false)
  return (
    <div
      onMouseOver={() => setShowDots(true)}
      onMouseLeave={() => setShowDots(false)}
      className='bg-white my-7 shadow-sm border rounded-sm'
    >
      <div className='p-5 flex items-center'>
        <img
          src={userImg}
          alt=''
          className='h-12 w-12 rounded-full object-contain mr-3'
        />
        <p className='font-semibold flex-1'>{name}</p>
        {showDots && <EllipsisHorizontalIcon className='h-7 cursor-pointer' />}
      </div>
      <img src={postImg} className='object-cover w-full' alt='' />
      <div className='flex justify-between p-4 items-center'>
        <div className='flex space-x-4'>
          <HeartIcon className='headerIcon h-7' />
          <ChatBubbleOvalLeftEllipsisIcon className='headerIcon h-7' />
          <PaperAirplaneIcon className='headerIcon h-7 -rotate-90' />
        </div>
        <BookmarkIcon className='headerIcon h-7' />
      </div>
      <p className='p-5 truncate'>
        <span className='font-bold mr-2'>{name}</span>
        {caption}
      </p>
      <form className='flex items-center p-4'>
        <FaceSmileIcon className='h-7' />
        <input
          type='text'
          placeholder='Add a comment...'
          className='flex-1 border-none focus:ring-0 outline-none'
        />
        <button className='font-semibold text-blue-500'>Post</button>
      </form>
    </div>
  )
}

export default Post
