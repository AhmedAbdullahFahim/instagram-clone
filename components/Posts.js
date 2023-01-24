import { db } from '@/firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import Post from './Post'

const Posts = ({ setPeople }) => {
  const [posts, setPosts] = useState([])

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot) => {
          setPosts(snapshot.docs)
        }
      ),
    [db]
  )

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          setPeople={setPeople}
          name={post.data().username}
          userImg={post.data().profileImg}
          postImg={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  )
}

export default Posts
