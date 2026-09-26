import { useEffect, useState } from 'react'

function getInitial() {
  let stored = null
  try {
    stored = localStorage.getItem('mega-blog-theme')
  } catch (e) {
    void e
  }
  if (stored === 'light' || stored === 'dark') return stored
  if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState(getInitial)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    try {
      localStorage.setItem('mega-blog-theme', theme)
    } catch (e) {
      void e
    }
  }, [theme])

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`group inline-flex cursor-pointer items-center gap-2 rounded-full border-2 border-[var(--ink)] bg-[var(--surface)] py-2 pl-2 pr-3 text-sm font-bold text-[var(--ink)] transition-all duration-200 hard-sm lift dark:border-[var(--line)] ${className}`}
    >
      <span
        className={`grid h-7 w-7 place-items-center rounded-full border-2 border-[var(--ink)] transition-colors duration-300 ${
          isDark ? 'bg-[#2A2620] text-[var(--mustard)]' : 'bg-[var(--mustard)] text-[#17130C]'
        }`}
      >
        {isDark ? (
          <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M13.5 9.2A5.7 5.7 0 0 1 6.8 2.5a.7.7 0 0 0-.9-.9A7 7 0 1 0 14.4 10a.7.7 0 0 0-.9-.8Z" />
          </svg>
        ) : (
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="8" r="3.2" fill="currentColor" />
            <path d="M8 1.5v1.8M8 12.7v1.8M1.5 8h1.8M12.7 8h1.8M3.4 3.4l1.3 1.3M11.3 11.3l1.3 1.3M12.6 3.4l-1.3 1.3M4.7 11.3l-1.3 1.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        )}
      </span>
      <span className="hidden sm:inline">{isDark ? 'Night' : 'Day'}</span>
    </button>
  )
}
