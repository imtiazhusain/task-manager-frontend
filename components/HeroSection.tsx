import Link from "next/link";
import React from "react";

const HeroSection = () => {
    return (
        <>


            <section
                className=" lg:pt-32 bg-[url('https://pagedone.io/asset/uploads/1691055810.png')] bg-center bg-cover h-svh"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">

                    <h1
                        className="max-w-2xl mx-auto text-center font-manrope font-bold text-4xl text-gray-900 mb-5 md:text-5xl leading-[50px] text-card-foreground"
                    >
                        Organize, Prioritize, and Succeed with Our <br />
                        <span className="text-indigo-600"> Task Management App</span>
                    </h1>
                    <p
                        className="max-w-sm mx-auto text-center text-base font-normal leading-7 text-gray-500 mb-9"
                    >
                        Post, Track, and Manage Your Tasks Effortlessly. Stay on Top of Every Deadline.
                    </p>
                    <Link
                        href='/signup'
                        className="w-full md:w-auto mb-14 inline-flex items-center justify-center py-3 px-7 text-base font-semibold text-center text-white rounded-full bg-indigo-600 shadow-xs hover:bg-indigo-700 transition-all duration-500"
                    >
                        Create an account
                        <svg
                            className="ml-2"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7.5 15L11.0858 11.4142C11.7525 10.7475 12.0858 10.4142 12.0858 10C12.0858 9.58579 11.7525 9.25245 11.0858 8.58579L7.5 5"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Link>

                </div>
            </section>

        </>
    );
};

export default HeroSection;
