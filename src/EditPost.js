import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import  { useStoreState, useStoreActions } from 'easy-peasy'
import { format } from 'date-fns'
import api from './api/posts'

const EditPost = () => {
    const { id }  = useParams()
    const posts = useStoreState((state => state.posts))
    const editTitle = useStoreState((state => state.editTitle))
    const editBody = useStoreState((state => state.editBody))
    const getPostById = useStoreState((state => state.getPostById))
    const setEditTitle = useStoreActions((actions => actions.setEditTitle))
    const setEditBody = useStoreActions((actions => actions.setEditBody))
    const editPost = useStoreActions((actions => actions.editPost))

    const post = getPostById(id)
    const navigate = useNavigate()

    useEffect(()=>{
        if (post) {
           setEditTitle(post.title)
           setEditBody(post.body)
        }
    }, [post, setEditBody, setEditTitle])
    
    const handleEdit = async (e, id) => {
        e.preventDefault() 
        const updatedPost = {
          id,
          title: editTitle,
          datetime: format(new Date(), 'MMMM dd, yyyy pp'),
          body: editBody
        }
        editPost(updatedPost)
        navigate('/')
        
      }
    return (
        <main className="NewPost">
            {
                editTitle && <>
                    <h2>Edit Post</h2>
                    <form className="newPostForm" onSubmit={(e) => handleEdit(e, id)}>
                        <label htmlFor="postTitle">Title</label>
                        <input
                            id="postTitle"
                            type="text"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor="postBody">Body</label>
                        <textarea
                            id="postBody"
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button type="submit">Submit</button>
                    </form></>
            }
          {!editTitle && 
            <>
              <h2>Post Not FOund!</h2>
              <p> Well, that's dissappointing.</p>
              <p>
                 <Link to='/'>Visit Our Homepage</Link>
              </p>
            </>}
        </main>
      )
}

export default EditPost