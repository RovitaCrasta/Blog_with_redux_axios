import { useParams, Link, useNavigate } from 'react-router-dom'
import  { useStoreState, useStoreActions } from 'easy-peasy'

const PostPage = () => {
  const { id } = useParams()
  const deletePost = useStoreActions((actions => actions.deletePost))
  const getPostById = useStoreState((state => state.getPostById))
  const post = getPostById(id)
  console.log('post', post)
  const navigate = useNavigate()

  const handleDelete = async (id) => {
      deletePost(id)
      navigate('/')
  }
    return (
      <main className="PostPage">
          <article className="post">
            {post &&
            <>
              <h2>{post.title}</h2>
              <p className="postDate">{post.datetime}</p>
              <p className="postDate">{post.body}</p>
              <Link to={`/editPost/${post.id}`}>
                <button className='editButton'>Edit Post</button>
              </Link>
              <button onClick={()=>{handleDelete(post.id)}} >
                Delete Post
              </button>
            </>
            }
            {!post && 
            <>
              <h2>Post Not FOund!</h2>
              <p> Well, that's dissappointing.</p>
              <p>
                 <Link to='/'>Visit Our Homepage</Link>
              </p>
            </>}
          </article>
      </main>
    )
}


export default PostPage