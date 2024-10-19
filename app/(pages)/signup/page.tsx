'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import useSignup from '@/hooks/useSignup';

const Page = () => {
    const { inputs, isErrors, loading, handleChange, handleSubmit } = useSignup();

    return (
        <div className="flex-grow flex items-center justify-center">
            <div className="bg-card w-80 md:w-[600px] p-4 rounded-md my-4 shadow-md">
                <div className="mb-4">
                    <h1 className="font-bold text-base sm:text-2xl md:text-xl tracking-wide text-center">
                        New Here? Sign up now!
                    </h1>
                </div>
                <form action="" className="" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 md:gap-4 lg:gap-6 md:gap-y-6 grid-cols-1 gap-2">
                        <div className="space-y-2">
                            <label htmlFor="" className="text-xs sm:text-sm md:text-xl">
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                name="name"
                                value={inputs.name || ""}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5 outline-none placeholder:italic"
                            />
                            {isErrors.name && (
                                <span className="text-red-600 text-sm">{isErrors.name}</span>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="" className="text-xs sm:text-sm md:text-xl">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="name@company.com"
                                name="email"
                                value={inputs.email || ""}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5 outline-none placeholder:italic"
                            />
                            {isErrors.email && (
                                <span className="text-red-600 text-sm">{isErrors.email}</span>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="" className="text-xs sm:text-sm md:text-xl">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                name="password"
                                value={inputs.password || ""}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5 outline-none placeholder:italic"
                            />
                            {isErrors.password && (
                                <span className="text-red-600 text-sm">{isErrors.password}</span>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="" className="text-xs sm:text-sm md:text-xl">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                name="confirmPassword"
                                value={inputs.confirmPassword || ""}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5 outline-none placeholder:italic"
                            />
                            {isErrors.confirmPassword && (
                                <span className="text-red-600 text-sm">{isErrors.confirmPassword}</span>
                            )}
                        </div>
                        <div className="space-y-2 overflow-hidden">
                            <label htmlFor="" className="text-xs sm:text-sm md:text-xl">
                                Upload Profile Pic
                            </label>
                            <input
                                type="file"
                                name="profilePic"
                                onChange={handleChange}
                                className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100 file:cursor-pointer"
                                accept="image/*"
                            />
                            {isErrors.profilePic && (
                                <span className="text-red-600 text-sm block">{isErrors.profilePic}</span>
                            )}
                        </div>
                    </div>
                    <div>
                        <Button disabled={loading} className="w-full mt-3">
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {loading ? "Please wait..." : "Create Account"}
                        </Button>
                    </div>
                    <div>
                        <h3 className="text-gray-500 mt-2 md:text-end text-sm md:text-lg">
                            Already have an account?
                            <Link href="/login" className="text-slate-900 font-semibold">
                                {" "}
                                Login
                            </Link>
                        </h3>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;
