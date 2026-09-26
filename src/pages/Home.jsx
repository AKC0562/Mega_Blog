import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'

function Scribble({ children }) {
  return (
    <span className="scribble">
      {children}
      <svg viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true">
        <path d="M3 10 C 40 3, 80 12, 120 7 S 180 4, 197 8" fill="none" stroke="var(--ember)" strokeWidth="5" strokeLinecap="round" />
      </svg>
    </span>
  )
}

function Home() {

    const [posts, setPosts] = useState([])
    useEffect(()=>{
        appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })
    },[])
    if (posts.length === 0) {
        return (
              <div className="w-full">
                <Container>
                  {/* hero — empty / logged-out state */}
                  <section className="relative overflow-hidden rounded-[28px] border-2 border-[var(--ink)] bg-[var(--surface)] hard-lg mt-8 dark:border-[var(--line)]">
                    <div className="paper-dots absolute inset-0 opacity-60" aria-hidden="true" />
                    <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.2fr_.8fr] lg:items-center lg:p-14">
                      <div className="rise-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex rotate-[-2deg] items-center rounded-full border-2 border-[var(--ink)] bg-[var(--mustard)] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#17130C]">
                            ✳ Vol. 04 — fresh off the desk
                          </span>
                          <span className="inline-flex items-center rounded-full border-2 border-[var(--line)] bg-[var(--bg)] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                            3 min reads
                          </span>
                        </div>
                        <h1 className="font-display mt-5 text-[42px] font-black leading-[0.98] text-[var(--ink)] sm:text-[60px]">
                          Stories worth<br />
                          slowing down <Scribble>for.</Scribble>
                        </h1>
                        <p className="mt-5 max-w-md text-[16px] leading-relaxed text-[var(--ink-soft)]">
                          Essays, build logs and field notes from people who love the craft.
                          Pull up a chair — the kettle's on.
                        </p>
                        <div className="mt-7 flex flex-wrap items-center gap-3">
                          <Link
                            to="/login"
                            className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--ink)] bg-[var(--ember)] px-6 py-3 text-[15px] font-extrabold text-white hard-md lift dark:border-black"
                          >
                            Login to read posts <span aria-hidden="true">→</span>
                          </Link>
                          <Link
                            to="/signup"
                            className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--ink)] bg-[var(--surface)] px-6 py-3 text-[15px] font-extrabold text-[var(--ink)] hard-md lift dark:border-[var(--line)]"
                          >
                            Create an account
                          </Link>
                        </div>
                        <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t-2 border-dashed border-[var(--line)] pt-5">
                          {[
                            ['Essays', 'slow thinking'],
                            ['Build logs', 'from the workshop'],
                            ['Notes', 'midnight ideas'],
                          ].map(([k, v]) => (
                            <div key={k} className="flex items-center gap-2.5">
                              <span className="font-display text-2xl font-black text-[var(--ink)]">✎</span>
                              <div className="leading-tight">
                                <p className="text-sm font-extrabold text-[var(--ink)]">{k}</p>
                                <p className="text-xs text-[var(--muted)]">{v}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* side card stack — pure decoration, no logic */}
                      <div className="relative hidden lg:block rise-2" aria-hidden="true">
                        <div className="tape relative rounded-2xl border-2 border-[var(--ink)] bg-[var(--mustard)] p-5 hard-md rotate-[2deg] dark:border-[var(--line)]">
                          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#17130C]/70">Pinned note</p>
                          <p className="font-display mt-2 text-[22px] font-bold leading-snug text-[#17130C]">
                            “The best blogs feel like letters from a friend.”
                          </p>
                          <p className="mt-3 text-sm font-semibold text-[#17130C]/70">— the editors</p>
                        </div>
                        <div className="relative ml-10 mt-5 rounded-2xl border-2 border-[var(--ink)] bg-[var(--bg)] p-5 hard-md rotate-[-1.5deg] dark:border-[var(--line)] dark:bg-[var(--bg-soft)]">
                          <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-[var(--ember)]" />
                            <span className="h-2.5 w-2.5 rounded-full bg-[var(--mustard)]" />
                            <span className="h-2.5 w-2.5 rounded-full bg-[var(--moss)]" />
                            <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">Today</span>
                          </div>
                          <div className="mt-3 space-y-2.5">
                            <div className="h-2.5 w-11/12 rounded-full bg-[var(--ink)]/15 dark:bg-white/15" />
                            <div className="h-2.5 w-8/12 rounded-full bg-[var(--ink)]/15 dark:bg-white/15" />
                            <div className="h-2.5 w-10/12 rounded-full bg-[var(--ember)]/50" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* how it works */}
                  <section className="grid gap-4 py-10 sm:grid-cols-3">
                    {[
                      ['01', 'Make an account', 'Thirty seconds, no fuss. Just a name and an inbox.'],
                      ['02', 'Find your shelf', 'Essays, guides and notes — pick what you’re hungry for.'],
                      ['03', 'Write back', 'Got something to say? Publish your own story anytime.'],
                    ].map(([n, t, d], i) => (
                      <div key={n} className={`rounded-2xl border-2 border-[var(--ink)] bg-[var(--surface)] p-5 hard-sm rise-${i + 2} dark:border-[var(--line)]`}>
                        <p className="font-display text-3xl font-black text-[var(--ember)]">{n}</p>
                        <h3 className="font-display mt-2 text-lg font-bold text-[var(--ink)]">{t}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{d}</p>
                      </div>
                    ))}
                  </section>
                </Container>
            </div>
        )
    }
    return(
        <div className='w-full py-8'>
            <Container>
                {/* section heading */}
                <div className="mb-6 flex flex-wrap items-end justify-between gap-4 rise-1">
                  <div>
                    <p className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--ink)] bg-[var(--mustard)] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#17130C] dark:border-[var(--line)]">
                      ✳ The latest shelf
                    </p>
                    <h1 className="font-display mt-3 text-4xl font-black tracking-tight text-[var(--ink)] sm:text-5xl">
                      Fresh from the desk
                    </h1>
                    <p className="mt-2 max-w-lg text-[15px] text-[var(--muted)]">
                      {posts.length} {posts.length === 1 ? 'story' : 'stories'} waiting for you. Grab a coffee and dig in.
                    </p>
                  </div>
                  <Link
                    to="/add-post"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--ink)] bg-[var(--ink)] px-5 py-2.5 text-sm font-bold text-[var(--bg)] hard-sm lift dark:border-[var(--line)]"
                  >
                    <span aria-hidden="true">+</span> Write a story
                  </Link>
                </div>

                {/* featured first post */}
                {posts.length > 0 && (
                  <div className="mb-5 rise-2">
                    <div className="overflow-hidden rounded-[22px] border-2 border-[var(--ink)] bg-[var(--surface)] hard-md dark:border-[var(--line)]">
                      <div className="grid md:grid-cols-2">
                        <div className="p-7 sm:p-9">
                          <span className="inline-flex rotate-[-1.5deg] items-center rounded-full border-2 border-[var(--ink)] bg-[var(--ember)] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                            ★ Editor's pick
                          </span>
                          <h2 className="font-display mt-4 line-clamp-3 text-3xl font-black leading-tight text-[var(--ink)] sm:text-4xl">
                            {posts[0].tittle || posts[0].title}
                          </h2>
                          <Link
                            to={`/post/${posts[0].$id}`}
                            className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-[var(--ink)] bg-[var(--mustard)] px-5 py-2.5 text-sm font-extrabold text-[#17130C] hard-sm lift dark:border-[var(--line)]"
                          >
                            Open the story <span aria-hidden="true">→</span>
                          </Link>
                        </div>
                        <div className="relative min-h-[220px] border-t-2 border-[var(--ink)] md:border-l-2 md:border-t-0 dark:border-[var(--line)]">
                          <FeaturedThumb post={posts[0]} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                    {posts.slice(1).map((post, i) => (
                        <div key={post.$id} className={`rise-${Math.min(i % 3 + 1, 4)}`}>
                            <PostCard {...post} />
                        </div>
                    ))}
                    {posts.length === 1 && (
                      <div className="rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--surface)]/60 p-8 text-center sm:col-span-2 lg:col-span-2">
                        <p className="font-display text-xl font-bold text-[var(--ink)]">More stories are on their way…</p>
                        <p className="mt-1 text-sm text-[var(--muted)]">Be the first to add the next one.</p>
                        <Link to="/add-post" className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-[var(--ink)] bg-[var(--surface)] px-5 py-2 text-sm font-bold text-[var(--ink)] hard-sm lift dark:border-[var(--line)]">
                          + Write a story
                        </Link>
                      </div>
                    )}
                </div>
            </Container>
        </div>
    )
}

function FeaturedThumb({ post }) {
  const [url, setUrl] = useState(null)
  useEffect(() => {
    let live = true
    if (post?.featuredImage) {
      appwriteService.getFilePreview(post.featuredImage).then((u) => { if (live) setUrl(u) })
    }
    return () => { live = false }
  }, [post?.featuredImage])
  if (!url) {
    return (
      <div className="paper-dots absolute inset-0 grid place-items-center bg-[var(--mustard)]">
        <span className="font-display text-7xl font-black text-[#17130C]/90">
          {(post?.tittle || post?.title || 'M').charAt(0).toUpperCase()}
        </span>
      </div>
    )
  }
  return <img src={url} alt={post?.tittle || post?.title} className="absolute inset-0 h-full w-full object-cover" />
}

export default Home
