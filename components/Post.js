import {
  BookmarkIcon,
  HeartIcon,
  PaperAirplaneIcon,
  EllipsisHorizontalIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  FaceSmileIcon,
} from '@heroicons/react/24/outline'

import Moment from 'react-moment'

import { HeartIcon as HeartIconFilled } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { db } from '@/firebase'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'

const Post = ({ id, name, userImg, postImg, caption }) => {
  const [showDots, setShowDots] = useState(false)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])
  const [liked, setLiked] = useState(false)
  const { data: session } = useSession()

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', id, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  )

  useEffect(
    () =>
      onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  )

  useEffect(
    () =>
      setLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  )

  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid))
    } else {
      await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
        username: session.user.username,
      })
    }
  }

  const sendComment = async (e) => {
    e.preventDefault()
    const commentCopy = comment
    setComment('')
    await addDoc(collection(db, 'posts', id, 'comments'), {
      username: session.user.username,
      profileImage: session.user.image,
      comment: commentCopy,
      timestamp: serverTimestamp(),
    })
  }

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
      <img
        src={postImg}
        className='object-cover w-full'
        alt=''
        onDoubleClick={likePost}
      />
      {session && (
        <div className='flex justify-between p-4 items-center'>
          <div className='flex space-x-4'>
            {liked ? (
              <HeartIconFilled
                className='headerIcon h-7 text-red-500'
                onClick={likePost}
              />
            ) : (
              <HeartIcon className='headerIcon h-7' onClick={likePost} />
            )}
            <ChatBubbleOvalLeftEllipsisIcon className='headerIcon h-7' />
            <PaperAirplaneIcon className='headerIcon h-7 -rotate-90' />
          </div>
          <BookmarkIcon className='headerIcon h-7' />
        </div>
      )}
      <p className='p-5 truncate'>
        {likes.length > 0 && (
          <p className='font-bold mb-1'>
            {likes.length}
            {likes.length === 1 ? ' like' : ' likes'}
          </p>
        )}
        <span className='font-bold mr-2'>{name}</span>
        {caption}
      </p>
      {comments.length > 0 && (
        <div className='ml-10 h-20 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400'>
          {comments.map((comment) => (
            <div className='flex items-center space-x-2 mt-2' key={comment.id}>
              <img
                alt=''
                src={comment.data().profileImage}
                className='h-7 rounded-full object-contain'
              />
              <p className='text-sm flex-1'>
                <span className='font-semibold mr-1'>
                  {comment.data().username}
                </span>
                {comment.data().comment}
              </p>
              <Moment fromNow className='text-xs pr-5 text-gray-500'>
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}
      {session && (
        <form className='flex items-center p-4'>
          <FaceSmileIcon className='h-7' />
          <input
            type='text'
            placeholder='Add a comment...'
            className='flex-1 border-none focus:ring-0 outline-none'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type='submit'
            onClick={sendComment}
            disabled={!comment.trim()}
            className='font-semibold text-blue-500 disabled:cursor-not-allowed'
          >
            Post
          </button>
        </form>
      )}
    </div>
  )
}

export default Post
