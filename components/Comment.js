import { db } from '@/firebase'
import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/24/solid'
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { likesModalState } from '@/atoms/likesModalAtom'
import Moment from 'react-moment'

const Comment = ({ comment, id, setPeople }) => {
  const [seeMoreComment, setSeeMoreComment] = useState(false)
  const [likes, setLikes] = useState([])
  const [liked, setLiked] = useState(false)
  const [showLikesModal, setShowLikesModal] = useRecoilState(likesModalState)

  const { data: session } = useSession()

  useEffect(
    () =>
      onSnapshot(
        collection(db, 'posts', id, 'comments', comment.id, 'likes'),
        (snapshot) => {
          setLikes(snapshot.docs)
        }
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

  const likeComment = async () => {
    if (liked) {
      await deleteDoc(
        doc(db, 'posts', id, 'comments', comment.id, 'likes', session.user.uid)
      )
    } else {
      await setDoc(
        doc(db, 'posts', id, 'comments', comment.id, 'likes', session.user.uid),
        {
          username: session.user.username,
          profileImage: session.user.image,
          name: session.user.name,
        }
      )
    }
  }

  return (
    <div className='flex items-center space-x-2 mt-2' key={comment.id}>
      <img
        alt=''
        src={comment.data().profileImage}
        className='h-7 rounded-full object-contain'
      />
      <div className='flex flex-1 flex-col space-y-1'>
        <p className='text-sm'>
          <span className='font-semibold mr-1'>{comment.data().username}</span>
          {seeMoreComment ? (
            <>
              {comment.data().comment}{' '}
              <span
                className='text-gray-400 cursor-pointer'
                onClick={() => setSeeMoreComment(false)}
              >
                less
              </span>
            </>
          ) : (
            <>
              {comment.data().comment.slice(0, 40).concat(' ')}
              {comment.data().comment.length < 50 || (
                <span
                  className='text-gray-400 cursor-pointer'
                  onClick={() => setSeeMoreComment(true)}
                >
                  ...more
                </span>
              )}
            </>
          )}
        </p>
        <div className='flex space-x-5 text-xs text-gray-500'>
          <Moment fromNow>{comment.data().timestamp?.toDate()}</Moment>
          {likes.length > 0 && (
            <p
              className='cursor-pointer hover:underline'
              onClick={() => {
                setShowLikesModal(true)
                setPeople(likes)
              }}
            >
              {likes.length} {likes.length > 1 ? 'likes' : 'like'}
            </p>
          )}
        </div>
      </div>
      {liked ? (
        <HeartIconFilled
          className='h-4 pr-5 cursor-pointer text-red-500'
          onClick={likeComment}
        />
      ) : (
        <HeartIcon className='h-4 pr-5 cursor-pointer' onClick={likeComment} />
      )}
    </div>
  )
}

export default Comment
