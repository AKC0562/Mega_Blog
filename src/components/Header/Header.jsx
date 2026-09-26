import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import ThemeToggle from '../ThemeToggle'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

const TICKER = [
  'Fresh ink every morning',
  'No fluff, just stories',
  'Write loud, edit kindly',
  'Issue No. 42 is out',
  'Made for readers & writers',
]

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]

  const go = (slug) => {
    setOpen(false)
    navigate(slug)
  }

  const visibleItems = navItems.filter((i) => i.active)
  const isActive = (slug) => location.pathname === slug

  return (
    <div className="sticky top-0 z-50">
      {/* enthusiast ticker — solid ember, no glass */}
      <div className="overflow-hidden border-b-2 border-[var(--ink)] bg-[var(--ember)] py-1.5 text-[#FFF7EC] dark:border-black">
        <div className="marquee-track gap-0">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {TICKER.map((t) => (
                <span key={`${copy}-${t}`} className="flex items-center font-mono text-[11px] font-bold uppercase tracking-[0.18em]">
                  <span className="px-4">{t}</span>
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--mustard)]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <header className="border-b-2 border-[var(--ink)] bg-[var(--bg)]/95 dark:border-[var(--line)] dark:bg-[#14120E]/95">
        <Container>
          <nav className="flex items-center gap-3 py-3">
            <div className="mr-1 shrink-0">
              <Link to="/" aria-label="MegaBlog home" onClick={() => setOpen(false)}>
                <Logo width="70px" />
              </Link>
            </div>

            {/* desktop nav */}
            <ul className="ml-auto hidden items-center gap-1.5 md:flex">
              {visibleItems.map((item) => {
                const active = isActive(item.slug)
                const isWrite = item.slug === '/add-post'
                return (
                  <li key={item.name}>
                    <button
                      onClick={() => go(item.slug)}
                      className={
                        isWrite
                          ? 'inline-flex cursor-pointer items-center gap-1.5 rounded-full border-2 border-[var(--ink)] bg-[var(--mustard)] px-5 py-2 text-sm font-extrabold text-[#17130C] transition-all duration-200 hard-sm lift dark:border-[var(--line)]'
                          : active
                            ? 'inline-flex cursor-pointer items-center rounded-full border-2 border-[var(--ink)] bg-[var(--ink)] px-5 py-2 text-sm font-bold text-[var(--bg)] transition-all duration-200 dark:bg-[var(--ink)] dark:text-[#14120E] dark:border-[var(--line)]'
                            : 'inline-flex cursor-pointer items-center rounded-full border-2 border-transparent px-4 py-2 text-sm font-semibold text-[var(--ink-soft)] transition-all duration-200 hover:border-[var(--line)] hover:bg-[var(--bg-soft)] hover:text-[var(--ink)]'
                      }
                    >
                      {isWrite && (
                        <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                        </svg>
                      )}
                      {item.name}
                    </button>
                  </li>
                )
              })}
              {authStatus && (
                <li className="ml-1">
                  <LogoutBtn />
                </li>
              )}
              <li className="ml-1">
                <ThemeToggle />
              </li>
            </ul>

            {/* mobile controls */}
            <div className="ml-auto flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="grid h-10 w-10 place-items-center rounded-full border-2 border-[var(--ink)] bg-[var(--surface)] text-[var(--ink)] hard-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none dark:border-[var(--line)]"
              >
                {open ? (
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M2 4h12M2 8h12M2 12h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )}
              </button>
            </div>
          </nav>

          {/* mobile panel */}
          {open && (
            <div className="pb-4 md:hidden" style={{ animation: 'pop .3s cubic-bezier(.22,1,.36,1) both' }}>
              <ul className="flex flex-col gap-2 rounded-2xl border-2 border-[var(--ink)] bg-[var(--surface)] p-3 hard-md dark:border-[var(--line)]">
                {visibleItems.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => go(item.slug)}
                      className={`flex w-full cursor-pointer items-center justify-between rounded-xl border-2 px-4 py-2.5 text-sm font-bold transition-colors ${
                        isActive(item.slug)
                          ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)] dark:border-[var(--line)]'
                          : 'border-transparent text-[var(--ink)] hover:border-[var(--line)] hover:bg-[var(--bg-soft)]'
                      }`}
                    >
                      {item.name}
                      <span aria-hidden="true">→</span>
                    </button>
                  </li>
                ))}
                {authStatus && (
                  <li className="pt-1">
                    <LogoutBtn />
                  </li>
                )}
              </ul>
            </div>
          )}
        </Container>
      </header>
    </div>
  )
}

export default Header
