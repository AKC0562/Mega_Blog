import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

const cols = [
  {
    title: 'Company',
    links: ['Features', 'Pricing', 'Affiliate Program', 'Press Kit'],
  },
  {
    title: 'Support',
    links: ['Account', 'Help', 'Contact Us', 'Customer Support'],
  },
  {
    title: 'Legals',
    links: ['Terms & Conditions', 'Privacy Policy', 'Licensing'],
  },
]

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-16 border-t-2 border-[var(--ink)] bg-[#17130C] text-[#F6F0E4] dark:border-[var(--line)] dark:bg-[#0E0D0B]">
      {/* stamp strip */}
      <div className="border-b border-white/15">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-3 px-4 py-4 sm:px-6">
          <span className="inline-flex -rotate-2 items-center gap-2 rounded-full border-2 border-[#17130C] bg-[var(--mustard)] px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#17130C]">
            ★ readers' favourite
          </span>
          <p className="font-display text-[15px] italic text-white/85">
            “Come for one story, stay for twelve.” — the MegaBlog promise
          </p>
          <Link
            to="/signup"
            className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-[var(--ember)] px-4 py-1.5 text-sm font-bold text-white transition-transform duration-200 hover:-translate-y-0.5"
          >
            Start writing <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <section className="relative overflow-hidden py-12">
        <div
          className="pointer-events-none absolute -right-10 -top-10 select-none font-display text-[180px] font-black leading-none text-white/[0.04]"
          aria-hidden="true"
        >
          Mk
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="-m-6 flex flex-wrap">
            <div className="w-full p-6 md:w-1/2 lg:w-5/12">
              <div className="flex h-full flex-col justify-between gap-6">
                <div>
                  <div className="mb-4 inline-flex items-center rounded-2xl bg-[#F6F0E4] px-3 py-2">
                    <Logo width="100px" />
                  </div>
                  <p className="max-w-xs text-[15px] leading-relaxed text-white/70">
                    A little independent corner of the internet for essays, build logs,
                    travel notes and midnight ideas. Written by humans, for humans.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em]">
                    <span className="rounded-full border border-white/20 px-3 py-1 text-white/70">Est. 2023</span>
                    <span className="rounded-full border border-white/20 px-3 py-1 text-white/70">Vol. 04</span>
                    <span className="rounded-full bg-[var(--mustard)] px-3 py-1 text-[#17130C]">100% human</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-white/55">
                    &copy; Copyright {year}. All Rights Reserved by MegaBlog.
                  </p>
                </div>
              </div>
            </div>
            {cols.map((col) => (
              <div key={col.title} className="w-full p-6 md:w-1/2 lg:w-2/12">
                <div className="h-full">
                  <h3 className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.22em] text-[var(--mustard)]">
                    {col.title}
                  </h3>
                  <ul>
                    {col.links.map((label) => (
                      <li key={label} className="mb-3">
                        <Link
                          className="group inline-flex items-center gap-1 text-[15px] font-medium text-white/80 transition-colors hover:text-white"
                          to="/"
                        >
                          <span className="h-px w-0 bg-[var(--ember)] transition-all duration-200 group-hover:w-3" aria-hidden="true" />
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            <div className="w-full p-6 md:w-1/2 lg:w-3/12">
              <div className="h-full rounded-2xl border border-dashed border-white/25 bg-white/[0.04] p-5">
                <h3 className="mb-2 font-display text-xl font-bold text-white">
                  The Sunday Margin
                </h3>
                <p className="text-sm leading-relaxed text-white/65">
                  One thoughtful email a week. Best stories, no spam, unsubscribe anytime.
                </p>
                <div className="mt-4 flex gap-2">
                  <span className="flex-1 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-sm text-white/50">
                    you@example.com
                  </span>
                  <Link
                    to="/signup"
                    className="rounded-full bg-[#F6F0E4] px-4 py-2 text-sm font-extrabold text-[#17130C] transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    Join
                  </Link>
                </div>
                <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/40">
                  12,408 readers already in
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  )
}

export default Footer
