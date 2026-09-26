import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from "./index"
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(authLogin({ userData }));
                }
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='flex w-full items-center justify-center'>
        <div className="grid w-full max-w-4xl overflow-hidden rounded-[26px] border-2 border-[var(--ink)] bg-[var(--surface)] hard-lg rise-2 dark:border-[var(--line)] md:grid-cols-[.9fr_1.1fr]">
          {/* editorial rail */}
          <div className="relative hidden flex-col justify-between gap-6 bg-[#17130C] p-8 text-[#F6F0E4] md:flex dark:bg-black/40">
            <div
              className="pointer-events-none absolute -bottom-8 -left-6 select-none font-display text-[130px] font-black leading-none text-white/[0.05]"
              aria-hidden="true"
            >
              Hi
            </div>
            <div className="inline-flex w-fit rotate-[-2deg] items-center rounded-full border-2 border-black bg-[var(--mustard)] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#17130C]">
              ✳ Welcome back
            </div>
            <div>
              <p className="font-display text-[32px] font-black leading-tight">
                Your desk is<br />exactly how<br />you left it.
              </p>
              <p className="mt-3 max-w-[240px] text-sm leading-relaxed text-white/65">
                Drafts waiting, stories brewing. Sign in and pick up the pen.
              </p>
            </div>
            <ul className="space-y-2.5 text-sm font-medium text-white/70">
              {['Continue your drafts', 'Reply to readers', 'Publish in one click'].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-[var(--ember)] text-[11px] font-black text-white" aria-hidden="true">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* form side */}
          <div className="p-7 sm:p-10">
            <div className="mb-2 flex justify-center md:justify-start">
              <span className="inline-block">
                <Logo width="100%" />
              </span>
            </div>
            <h2 className="font-display mt-4 text-3xl font-black tracking-tight text-[var(--ink)]">Sign in to your account</h2>
            <p className="mt-2 text-[15px] text-[var(--muted)]">
              Don&apos;t have any account?&nbsp;
              <Link
                to="/signup"
                className="font-bold text-[var(--ember)] underline decoration-2 underline-offset-4 transition-colors hover:text-[var(--ember-deep)]"
              >
                Sign Up
              </Link>
            </p>
            {error && (
              <p className="mt-5 rounded-xl border-2 border-[#C2431F]/40 bg-[#C2431F]/10 px-4 py-2.5 text-sm font-semibold text-[#C2431F] dark:text-[#FF8A66]">
                {error}
              </p>
            )}
            <form onSubmit={handleSubmit(login)} className='mt-6'>
              <div className='space-y-4'>
                <Input
                label="Email "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full !py-3 text-[15px]"
                >Sign in →</Button>
                <p className="text-center font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
                  Protected by good coffee &amp; better passwords
                </p>
              </div>
            </form>
          </div>
        </div>
    </div>
  )
}

export default Login
