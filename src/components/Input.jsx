import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()
    const isFile = type === "file"
    return (
        <div className='w-full'>
            {label && (
              <label
                className='mb-1.5 inline-flex items-center gap-2 pl-0.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]'
                htmlFor={id}
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--ember)]" aria-hidden="true" />
                {label}
              </label>
            )}
            <input
              type={type}
              className={
                isFile
                  ? `w-full cursor-pointer rounded-xl border-2 border-[var(--line)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--ink)] outline-none transition-all duration-200 file:mr-3 file:cursor-pointer file:rounded-full file:border-2 file:border-[var(--ink)] file:bg-[var(--mustard)] file:px-4 file:py-1.5 file:text-xs file:font-extrabold file:text-[#17130C] hover:border-[var(--ink)] focus:border-[var(--ember)] ${className}`
                  : `w-full rounded-xl border-2 border-[var(--line)] bg-[var(--surface)] px-3.5 py-2.5 text-[15px] font-medium text-[var(--ink)] placeholder:font-normal placeholder:text-[var(--muted)] outline-none transition-all duration-200 hover:border-[var(--ink)]/40 focus:border-[var(--ember)] focus:ring-4 focus:ring-[var(--ember)]/15 ${className}`
              }
              ref={ref}
              {...props}
              id={id}
            />
        </div>
    )
})

export default Input
