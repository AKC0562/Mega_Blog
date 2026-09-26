import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='app-shell min-h-screen bg-[var(--bg)] text-[var(--ink)]'>
      <div className='flex min-h-screen w-full flex-col'>
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className="grid min-h-screen place-items-center bg-[var(--bg)]">
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="loader-quill" aria-hidden="true">M</div>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[var(--muted)]">
          Opening the blog…
        </p>
        <div className="loader-bar" role="status" aria-label="Loading" />
      </div>
    </div>
  )
}

export default App
