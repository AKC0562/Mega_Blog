import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import appWriteService from '../appwrite/config'
import { PostCard, Container } from '../components'
function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(()=>{},[])
    appWriteService.getPosts([]).then((posts)=>{
        if (posts) {
            setPosts(posts.documents)
        }
    })

  return (
    <div className='w-full py-8'>
      <Container>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 rise-1">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--ink)] bg-[var(--surface)] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--muted)] dark:border-[var(--line)]">
              <span className="h-2 w-2 rounded-full bg-[var(--ember)]" aria-hidden="true" />
              Browse everything
            </p>
            <h1 className="font-display mt-3 text-4xl font-black tracking-tight text-[var(--ink)] sm:text-5xl">
              All stories
            </h1>
            <p className="mt-2 text-[15px] text-[var(--muted)]">
              {posts.length === 0
                ? 'The shelf is being restocked — check back in a moment.'
                : `${posts.length} ${posts.length === 1 ? 'story' : 'stories'} on the shelf.`}
            </p>
          </div>
          <Link
            to="/add-post"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--ink)] bg-[var(--mustard)] px-5 py-2.5 text-sm font-extrabold text-[#17130C] hard-sm lift dark:border-[var(--line)]"
          >
            + New story
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-[22px] border-2 border-dashed border-[var(--line)] bg-[var(--surface)] p-12 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border-2 border-[var(--ink)] bg-[var(--bg-soft)] font-display text-2xl font-black text-[var(--muted)] dark:border-[var(--line)]" aria-hidden="true">
              ✎
            </div>
            <h2 className="font-display mt-4 text-2xl font-bold text-[var(--ink)]">Nothing here just yet</h2>
            <p className="mx-auto mt-1 max-w-sm text-sm text-[var(--muted)]">
              Stories will appear here as soon as they're published. Why not start the collection?
            </p>
            <Link
              to="/add-post"
              className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-[var(--ink)] bg-[var(--ink)] px-5 py-2.5 text-sm font-bold text-[var(--bg)] hard-sm lift dark:border-[var(--line)]"
            >
              Write the first one →
            </Link>
          </div>
        ) : (
          <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
              {posts.map((post)=>(
                  <div key={post.$id}>
                      <PostCard post={post} />
                  </div>
              ))}
          </div>
        )}
      </Container>
    </div>
  )
}

export default AllPosts
