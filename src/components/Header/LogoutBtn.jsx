import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
      className='inline-flex cursor-pointer items-center gap-1.5 rounded-full border-2 border-[var(--ink)] bg-[#C2431F] px-5 py-2 text-sm font-bold text-white transition-all duration-200 hard-sm lift dark:bg-[var(--ember)] dark:text-[#17130C] dark:border-[var(--line)]'
      onClick={logoutHandler}
    >
      <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M6 3H3v10h3M10 5l3 3-3 3M13 8H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Logout
    </button>
  )
}

export default LogoutBtn
