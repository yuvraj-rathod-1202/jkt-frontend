import React, { useState } from 'react';
import adminLoginLogo from '../assets/adminLoginLogo.png';
import EnglishToGujrati from '../assets/EnglishToGujrati.jpeg';
import jkaLogo from '../assets/jkaLogo.jpeg';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-white">
            {/* Top Bar */}
            <div className="bg-green-900 h-12 flex items-center justify-center">
                <div className="bg-orange-500 w-72 h-10 text-3xl text-white font-medium rounded-md flex items-center justify-center">
                    Jay Kishan Trading
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex sm:block">
                <div className="relative flex sm:flex-row items-center justify-between h-16 w-full">
                    {/* Left: Logo */}
                    <div className="flex items-center content-center sm:w-auto">
                        <img
                            src={jkaLogo}
                            alt="jka logo"
                            className="mr-10 w-12 h-12" // Adjust size as needed
                        />
                        {/* Search Bar */}
                        <div className="relative w-full max-w-md hidden sm:block">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="block w-full rounded-md border border-green-500 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-green-500 focus:outline-none"
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center justify-center bg-orange-500 w-10 h-full rounded-l-md">
                                <svg
                                    className="h-5 w-5 text-black"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8.5 3a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 8.5a6.5 6.5 0 1111.73 4.228l4.482 4.482a1 1 0 01-1.415 1.415l-4.482-4.482A6.5 6.5 0 012 8.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Right: Language, Login */}
                    <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end">
                        {/* Language Selector */}
                        <div className="relative ml-5">
                            <div className="flex items-center text-gray-600">
                                <img
                                    src={EnglishToGujrati}
                                    alt="Language Logo"
                                    className="mr-2 w-6 h-6"
                                />
                                <select
                                    id="language-select"
                                    className="border rounded-md px-2 py-1 bg-white text-gray-700 focus:outline-none"
                                >
                                    <option value="english">English</option>
                                    <option value="gujarati">Gujarati</option>
                                </select>
                            </div>
                        </div>

                        {/* Login */}
                        <button className="flex items-center text-gray-600 ml-5">
                            <img
                                src={adminLoginLogo}
                                alt="Profile"
                                className="w-8 h-8 rounded-full"
                            />
                            <Link to='/login' className="ml-2 text-sm font-medium hover:text-xl hover:text-green-700">Login</Link>
                        </button>
                    </div>
                </div>


                <button
                    onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                    className="sm:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                >
                    <span className="sr-only">Open main menu</span>
                    {isMobileMenuOpen ? (
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    )}
                </button>
            </div>

            {/* Search Bar for Mobile */}
            <div className="relative w-full max-w-md mx-auto mt-4 sm:hidden mb-4 sm:mb-0">
                <div className="flex justify-center items-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="block w-full rounded-md border border-green-500 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-green-500 focus:outline-none"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center justify-center bg-orange-500 w-10 h-full rounded-l-md">
                        <svg
                            className="h-5 w-5 text-black"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8.5 3a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 8.5a6.5 6.5 0 1111.73 4.228l4.482 4.482a1 1 0 01-1.415 1.415l-4.482-4.482A6.5 6.5 0 012 8.5z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
            </div>




            {/* Horizontal Line */}
            <hr className="border-green-700" />

            {/* Navigation Buttons */}
            {isMobileMenuOpen ? (
                <div className="sm:hidden flex flex-col items-center bg-white py-2">
                    <Link to='/' className="bg-white text-gray-600 px-4 py-2 rounded-md hover:bg-green-600 hover:text-black mb-2">
                        Home
                    </Link>
                    <Link to='/brands' className="bg-white text-gray-600 px-4 py-2 rounded-md hover:bg-green-600 hover:text-black mb-2">
                        Brands
                    </Link>
                    <Link to='/categories' className="bg-white text-gray-600 px-4 py-2 rounded-md hover:bg-green-600 hover:text-black mb-2">
                        Categories
                    </Link>
                    <Link to='/items' className="bg-white text-gray-600 px-4 py-2 rounded-md hover:bg-green-600 hover:text-black mb-2">
                        Items
                    </Link>
                    <Link to='/contactus' className="bg-white text-gray-600 px-4 py-2 rounded-md hover:bg-green-600 hover:text-black mb-2">
                        Contact Us
                    </Link>
                    <Link to='/aboutus' className="bg-white text-gray-600 px-4 py-2 rounded-md hover:bg-green-600 hover:text-black mb-2">
                        About Us
                    </Link>
                </div>
            ) : (
                <div className="hidden sm:flex justify-center bg-white py-2 space-x-4">
                    <Link to='/' className="bg-white text-gray-600 px-4 py-2 rounded-md hover:bg-green-600 hover:text-black">
                        Home
                    </Link>
                    <Link to='/brands' className="bg-white text-gray-600 px-4 py-2 rounded-md hover:bg-green-600 hover:text-black">
                        Brands
                    </Link>
                    <Link to='/categories' className="bg-white text-gray-600 px-4 py-2 rounded-md hover:bg-green-600 hover:text-black">
                        Categories
                    </Link>
                    <Link to='items' className="bg-white text-gray-600 px-4 py-2 rounded-md hover:bg-green-600 hover:text-black">
                        Items
                    </Link>
                    <Link to='aboutus' className="bg-white text-gray-600 px-4 py-2 rounded-md hover:bg-green-600 hover:text-black">
                        About Us
                    </Link>
                    <Link to='contactus' className="bg-white text-gray-600 px-4 py-2 rounded-md hover:bg-green-600 hover:text-black">
                        Contact Us
                    </Link>
                </div>
            )}
            <hr className="border-green-700" />

        </nav>
    );
};

export default Navbar;