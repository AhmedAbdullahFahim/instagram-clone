import { useState } from 'react'
import Moment from 'react-moment'

const Comment = ({ comment }) => {
  const [seeMoreComment, setSeeMoreComment] = useState(false)

  return (
    <div className='flex items-center space-x-2 mt-2' key={comment.id}>
      <img
        alt=''
        src={comment.data().profileImage}
        className='h-7 rounded-full object-contain'
      />
      <p className='text-sm flex-1'>
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
  )
}

export default Comment
