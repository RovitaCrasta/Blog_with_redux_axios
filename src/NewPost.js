
import { useNavigate } from 'react-router-dom'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { format } from 'date-fns'

const NewPost = () => {
  const posts = useStoreState(state => state.posts)
  const postTitle = useStoreState(state => state.editTitle)
  const postBody = useStoreState(state => state.editBody)
  const savePost = useStoreActions((actions => actions.savePost))
  const setPostTitle = useStoreActions(actions => actions.setPostTitle)
  const setPostBody = useStoreActions(actions => actions.setPostBody)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newPost = {
      id: posts.length ? posts[posts.length - 1].id + 1 : 1,
      title: postTitle,
      datetime: format(new Date(), 'MMMM dd, yyyy pp'),
      body: postBody
    }
    savePost(newPost)
    navigate('/')
  }
  return (
    <main className="NewPost">
      <h2>NewPost</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title</label>
        <input
          id="postTitle"
          type="text"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Body</label>
        <textarea
          id="postBody"
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default NewPost