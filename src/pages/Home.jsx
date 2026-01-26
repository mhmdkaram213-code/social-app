import { useEffect, useState } from 'react'
import PostCard from '../card/PostCard.jsx'
import getAllPosts from '../services/allPostsApi'
import LoadingPage from '../component/LoadingPage/LoadingPage'
import CreatePost from '../card/CreatePost.jsx'
export default function Home() {
  const [allPosts, setAllPosts] = useState([])
  async function getPosts() {
    const response = await getAllPosts()
    if (response.message == 'success') {
      setAllPosts(response.posts)
    }
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getPosts()
  }, [])

  return (
    <>
      <div className='bg-gray-200'>
        <CreatePost callback={getPosts} />
        {allPosts.length === 0 ? <LoadingPage /> : allPosts.map((post) => <PostCard key={post._id} callback={getPosts} allComment={false} post={post} />)}
      </div>
    </>
  )
}
