import Post from './Post'

const posts = [
  {
    id: '1',
    username: 'Rakaaaaannn',
    userImg:
      'https://res.cloudinary.com/dzkbu5k0f/image/upload/v1673439027/295550837_150108040960987_1767449683352516642_n_eqy4wb.jpg',
    postImg:
      'https://res.cloudinary.com/dzkbu5k0f/image/upload/v1672486102/cld-sample-2.jpg',
    caption: 'This is an instagram post papafam yo smash destroy za like bo2on',
  },
  {
    id: '2',
    username: 'Rakaaaaannn',
    userImg:
      'https://res.cloudinary.com/dzkbu5k0f/image/upload/v1673439027/295550837_150108040960987_1767449683352516642_n_eqy4wb.jpg',
    postImg:
      'https://res.cloudinary.com/dzkbu5k0f/image/upload/v1672486101/cld-sample.jpg',
    caption: 'This is an instagram post papafam yo smash destroy za like bo2on',
  },
]

const Posts = () => {
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          name={post.username}
          userImg={post.userImg}
          postImg={post.postImg}
          caption={post.caption}
        />
      ))}
    </div>
  )
}

export default Posts
