
import { Container, PostForm } from '../components' 
function AddPost() {
  return (
    <div className='w-full py-8'>
      <Container>
        <div className="mb-6 rise-1">
          <p className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--ink)] bg-[var(--ember)] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white dark:border-[var(--line)]">
            ✎ New draft
          </p>
          <h1 className="font-display mt-3 text-4xl font-black tracking-tight text-[var(--ink)] sm:text-5xl">
            Write something good
          </h1>
          <p className="mt-2 max-w-lg text-[15px] text-[var(--muted)]">
            Don't overthink it — honest first drafts beat perfect blank pages.
          </p>
        </div>
        <div className="rise-2">
          <PostForm />
        </div>
      </Container>
    </div>
  )
}

export default AddPost
