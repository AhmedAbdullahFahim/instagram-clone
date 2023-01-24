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
import Moment from 'react-moment'

const Comment = ({ comment, id }) => {
  const [seeMoreComment, setSeeMoreComment] = useState(false)
  const [likes, setLikes] = useState([])
  const [liked, setLiked] = useState(false)

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
      <div className='flex flex-1 flex-col'>
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
        <Moment fromNow className='text-xs pr-5 text-gray-500'>
          {comment.data().timestamp?.toDate()}
        </Moment>
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
