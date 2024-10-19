'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import useLogin from '@/hooks/useLogin';

const LoginComponent = () => {
    const { inputs, isErrors, loading, handleChange, handleSubmit } = useLogin();

    return (
        <div className='flex-grow flex items-center justify-center'>
            <div className="bg-card max-w-[400px] md:w-80 p-4 rounded-md shadow-md">
                <h1 className="text-center font-bold text-2xl tracking-wide">
                    Welcome Back!
                </h1>
                <form action="" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4 mt-9">
                        <div className="flex flex-col gap-1">
                            <label>Email</label>
                            <input
                                type="text"
                                placeholder="name@company.com"
                                value={inputs.email || ""}
                                onChange={handleChange}
                                name="email"
                                className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5 outline-none"
                            />
                            {isErrors.email && (
                                <span className="text-red-600 text-sm">{isErrors.email}</span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={inputs.password || ""}
                                onChange={handleChange}
                                name="password"
                                className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5 outline-none"
                            />
                            {isErrors.password && (
                                <span className="text-red-600 text-sm">{isErrors.password}</span>
                            )}
                        </div>
                        <Button disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {loading ? "Please wait..." : "Login"}
                        </Button>
                        <div>
                            <h3 className="text-gray-500 text-end">
                                Do not have an account?
                                <Link href="/signup" className="text-slate-900 font-semibold">
                                    {" "}
                                    Signup
                                </Link>
                            </h3>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginComponent;
