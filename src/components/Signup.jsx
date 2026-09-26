import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const currentUser = await authService.getCurrentUser()
                if (currentUser) {
                    dispatch(login({ userData: currentUser }));
                }
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center">
            <div className="grid w-full max-w-4xl overflow-hidden rounded-[26px] border-2 border-[var(--ink)] bg-[var(--surface)] hard-lg rise-2 dark:border-[var(--line)] md:grid-cols-[.9fr_1.1fr]">
                {/* editorial rail */}
                <div className="relative hidden flex-col justify-between gap-6 bg-[var(--ember)] p-8 text-white md:flex">
                    <div
                      className="pointer-events-none absolute -bottom-8 -left-4 select-none font-display text-[120px] font-black leading-none text-black/10"
                      aria-hidden="true"
                    >
                      Go
                    </div>
                    <div className="inline-flex w-fit rotate-[2deg] items-center rounded-full border-2 border-[#17130C] bg-[#FAF6EF] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#17130C]">
                        ✎ Join 12,408 writers
                    </div>
                    <div>
                        <p className="font-display text-[32px] font-black leading-tight">
                            Blank page?<br />Perfect.<br />Start here.
                        </p>
                        <p className="mt-3 max-w-[240px] text-sm leading-relaxed text-white/85">
                            One account for reading, writing and getting read. Free forever-ish.
                        </p>
                    </div>
                    <div className="rounded-2xl border-2 border-black/20 bg-black/15 p-4">
                        <p className="font-display text-[15px] italic leading-snug">
                            “I published my first post in ten minutes. Felt like magic.”
                        </p>
                        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
                            — Priya, travel writer
                        </p>
                    </div>
                </div>

                {/* form side */}
                <div className="p-7 sm:p-10">
                    <div className="mb-2 flex justify-center md:justify-start">
                        <span className="inline-block">
                            <Logo width="100%" />
                        </span>
                    </div>
                    <h2 className="font-display mt-4 text-3xl font-black tracking-tight text-[var(--ink)]">Sign up to create account</h2>
                    <p className="mt-2 text-[15px] text-[var(--muted)]">
                        Already have an account?&nbsp;
                        <Link
                            to="/login"
                            className="font-bold text-[var(--ember)] underline decoration-2 underline-offset-4 transition-colors hover:text-[var(--ember-deep)]"
                        >
                            Sign In
                        </Link>
                    </p>
                    {error && (
                      <p className="mt-5 rounded-xl border-2 border-[#C2431F]/40 bg-[#C2431F]/10 px-4 py-2.5 text-sm font-semibold text-[#C2431F] dark:text-[#FF8A66]">
                        {error}
                      </p>
                    )}

                    <form onSubmit={handleSubmit(create)} className="mt-6">
                        <div className='space-y-4'>
                            <Input
                            label="Full Name "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                            />
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
                                required: true,})}
                            />
                            <Button type="submit" className="w-full !py-3 text-[15px]">
                                Create Account →
                            </Button>
                            <p className="text-center font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
                                No spam. No drama. Just stories.
                            </p>
                        </div>
                    </form>
                </div>
            </div>

    </div>
  )
}

export default Signup
