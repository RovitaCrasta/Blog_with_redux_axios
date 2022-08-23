import Feed from "./Feed"
import  { useStoreState } from 'easy-peasy'

const Home = ({ isLoading, fetchError}) => {
  const searchResults = useStoreState((state) => state.searchResults)
  return (
    <main className="Home">
      {isLoading && <p className="statusMasg">Loading posts....</p>}
      {!isLoading && fetchError && <p className="statusMasg" style={{color: "red"}}>{fetchError}</p>}
      {!fetchError && !isLoading && (searchResults.length ? (
        <Feed posts={searchResults} />
      ) : (
        <p className="statusMasg">No posts to display.</p>
      ))}
    </main>
  )
}

export default Home