import {useState, useEffect} from 'react'
import { Container, PostForm } from '../components'
import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'
function EditPost() {

    const [post, setPost] = useState([])
    const {slug} = useParams()
    const navigate = useNavigate()


    useEffect(()=>{
        if (slug) {
            appwriteService.getPost(slug).then((post)=>{
                if (post) {
                    setPost(post)
                }
            })
        }else{
            navigate('/')
        }
    },[slug,navigate])

  return post ? (
    <div className="w-full py-8">
        <Container>
            <div className="mb-6 rise-1">
              <p className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--ink)] bg-[var(--mustard)] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#17130C] dark:border-[var(--line)]">
                ↻ Editing mode
              </p>
              <h1 className="font-display mt-3 text-4xl font-black tracking-tight text-[var(--ink)] sm:text-5xl">
                Make it even better
              </h1>
              <p className="mt-2 max-w-lg text-[15px] text-[var(--muted)]">
                Small tweaks, big difference. Your readers will thank you.
              </p>
            </div>
            <div className="rise-2">
              <PostForm post={post} />
            </div>
        </Container>
    </div>
  ) : null
}

export default EditPost
