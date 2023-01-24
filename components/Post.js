import {
  BookmarkIcon,
  HeartIcon,
  PaperAirplaneIcon,
  EllipsisHorizontalIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  FaceSmileIcon,
} from '@heroicons/react/24/outline'

import { HeartIcon as HeartIconFilled } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'
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
import Comment from './Comment'
import { useRecoilState } from 'recoil'
import { likesModalState } from '@/atoms/likesModalAtom'

const Post = ({ id, name, userImg, postImg, caption, setPeople }) => {
  const [showDots, setShowDots] = useState(false)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])
  const [liked, setLiked] = useState(false)
  const [seeMoreCaption, setSeeMoreCaption] = useState(false)
  const [showLikesModal, setShowLikesModal] = useRecoilState(likesModalState)
  const { data: session } = useSession()
  const commentRef = useRef(null)

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
      onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) => {
        setLikes(snapshot.docs)
      }),
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
        profileImage: session.user.image,
        name: session.user.name,
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
            <ChatBubbleOvalLeftEllipsisIcon
              onClick={() => commentRef.current.focus()}
              className='headerIcon h-7'
            />
            <PaperAirplaneIcon className='headerIcon h-7 -rotate-45' />
          </div>
          <BookmarkIcon className='headerIcon h-7' />
        </div>
      )}
      <div className={`px-5 overflow-hidden ${!session && 'py-2'} mb-3`}>
        {likes.length > 0 && (
          <p className='font-bold mb-1'>
            <span
              className='cursor-pointer hover:underline'
              onClick={() => {
                setShowLikesModal(true)
                setPeople(likes)
              }}
            >
              {likes.length}
              {likes.length === 1 ? ' like' : ' likes'}
            </span>
          </p>
        )}
        <span className='font-bold mr-2'>{name}</span>
        {seeMoreCaption ? (
          <>
            {caption}{' '}
            <span
              className='text-gray-400 cursor-pointer'
              onClick={() => setSeeMoreCaption(false)}
            >
              less
            </span>
          </>
        ) : (
          <>
            {caption.slice(0, 50).concat(' ')}
            {caption.length < 50 || (
              <span
                className='text-gray-400 cursor-pointer'
                onClick={() => setSeeMoreCaption(true)}
              >
                ...more
              </span>
            )}
          </>
        )}
      </div>
      {comments.length > 0 && (
        <div className='ml-10 h-fit max-h-24 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400'>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              id={id}
              setPeople={setPeople}
            />
          ))}
        </div>
      )}
      {session && (
        <form className='flex items-center p-4'>
          <FaceSmileIcon className='h-7' />
          <input
            type='text'
            placeholder='Add a comment...'
            className='flex-1 border-none focus:ring-0 outline-none scroll-smooth'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            ref={commentRef}
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
