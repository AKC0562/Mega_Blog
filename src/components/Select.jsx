import React, { useId } from 'react'

function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {
    const id = useId()
  return (
    <div className='w-full'>
        {label && (
          <label
            htmlFor={id}
            className='mb-1.5 inline-flex items-center gap-2 pl-0.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]'
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--ember)]" aria-hidden="true" />
            {label}
          </label>
        )}
        <div className="relative">
          <select
          {...props}
          id={id}
          ref={ref}
          className={`w-full appearance-none rounded-xl border-2 border-[var(--line)] bg-[var(--surface)] px-3.5 py-2.5 pr-10 text-[15px] font-semibold text-[var(--ink)] outline-none transition-all duration-200 hover:border-[var(--ink)]/40 focus:border-[var(--ember)] focus:ring-4 focus:ring-[var(--ember)]/15 ${className}`}
          >
              {options?.map((option) => (
                  <option key={option} value={option}>
                      {option}
                  </option>
              ))}
          </select>
          <svg
            className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]"
            viewBox="0 0 16 16" fill="none" aria-hidden="true"
          >
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
    </div>
  )
}

export default React.forwardRef(Select)
