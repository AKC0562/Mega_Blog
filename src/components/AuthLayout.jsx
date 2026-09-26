import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({ children, authentication = true }) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false

        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

  return loader ? (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-5 px-4 py-24 text-center">
      <div className="loader-quill" aria-hidden="true">M</div>
      <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[var(--muted)]">
        Sharpening pencils…
      </p>
      <div className="loader-bar" role="status" aria-label="Loading" />
    </div>
  ) : <>{children}</>
}
