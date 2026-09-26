import React from 'react'

function Logo({ width = '100px' }) {
  return (
    <span className="inline-flex items-center gap-2.5 select-none" style={{ maxWidth: width === '100%' ? '100%' : undefined }}>
      <span
        className="relative grid shrink-0 place-items-center rounded-[13px] border-2 border-[var(--ink)] bg-[var(--ember)] text-[#FAF6EF] hard-sm"
        style={{ width: '38px', height: '38px' }}
        aria-hidden="true"
      >
        <span className="font-display text-[22px] leading-none font-black -mt-0.5">M</span>
        <span className="absolute -right-1.5 -top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[var(--ink)] bg-[var(--mustard)]" />
      </span>
      <span className="flex flex-col leading-none text-left">
        <span className="font-display text-[19px] font-black tracking-tight text-[var(--ink)]">
          Mega<span className="text-[var(--ember)]">Blog</span>
        </span>
        <span className="mt-1 font-mono text-[9.5px] font-medium uppercase tracking-[0.22em] text-[var(--muted)]">
          fresh ink daily
        </span>
      </span>
    </span>
  )
}

export default Logo
