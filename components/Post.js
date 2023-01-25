import {
  BookmarkIcon,
  HeartIcon,
  PaperAirplaneIcon,
  ChatBubbleOvalLeftIcon,
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
import DropdownMenu from './DropdownMenu'
import { deleteModalState } from '@/atoms/deleteModalAtom'
import { modalState } from '@/atoms/modalAtom'

const Post = ({
  id,
  name,
  userImg,
  postImg,
  caption,
  setPeople,
  email,
  setPostId,
}) => {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])
  const [liked, setLiked] = useState(false)
  const [seeMoreCaption, setSeeMoreCaption] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useRecoilState(deleteModalState)
  const [openLikesModal, setOpenLikesModal] = useRecoilState(likesModalState)
  const [isOpen, setIsOpen] = useRecoilState(modalState)
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

  // useEffect(() => {
  //   setPostId(id)
  // }, [id])

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
    <div className='bg-white my-7 shadow-sm border rounded-sm'>
      <div className='p-5 flex items-center relative'>
        <img
          src={userImg}
          alt=''
          className='h-12 w-12 rounded-full object-contain mr-3'
        />
        <p className='font-semibold flex-1'>{name}</p>
        {session && (
          <DropdownMenu setPostId={setPostId} id={id} email={email} />
        )}
      </div>
      <div className='w-full relative select-none' onDoubleClick={likePost}>
        <img src={postImg} className='object-cover w-full' alt='' />
        <div
          className={`${
            liked && 'delay-700 scale-0'
          } transition-all duration-300 ease-out absolute inset-0 flex items-center justify-center`}
        >
          <HeartIconFilled
            className={` ${
              liked ? 'scale-100' : 'scale-0'
            } transition-all duration-300 ease-out text-red-500 w-16 sm:w-20`}
          />
        </div>
      </div>
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
            <ChatBubbleOvalLeftIcon
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
                setIsOpen(true)
                setOpenDeleteModal(false)
                setOpenLikesModal(true)
                setPostId(id)
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
