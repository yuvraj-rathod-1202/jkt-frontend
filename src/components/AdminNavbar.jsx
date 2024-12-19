import React, { Children, useState } from 'react';
import adminLoginLogo from '../assets/adminLoginLogo.png';
import jkaLogo from '../assets/jkaLogo.jpeg';
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { RiBillFill } from "react-icons/ri";
import { CgShutterstock } from "react-icons/cg";

const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="flex">
            {/* Sidebar */}
            <nav className="bg-gray-900 w-[250px] h-screen text-white flex-shrink-0">
                {/* Logo and Title */}
                <div className="flex flex-col items-center py-4 border-b border-gray-700">
                    <img
                        src={jkaLogo}
                        alt="jka logo"
                        className="w-20 h-20 mb-2" // Adjust size as needed
                    />
                    <h2 className="text-lg font-semibold text-center">
                        Jay Kishan Trading
                    </h2>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col mt-4 space-y-4 px-4">
                    <Link
                        to="/admin"
                        className="flex items-center hover:bg-green-600 px-4 py-2 gap-4 rounded-md"
                    >
                        Home        <FaHome />
                    </Link>
                    <Link
                        to="/admin/edititem"
                        className="flex items-center hover:bg-green-600 px-4 py-2 gap-4 rounded-md"
                    >
                        Edit Item <FaEdit />
                    </Link>
                    <Link
                        to="/admin/bill"
                        className="flex items-center hover:bg-green-600 gap-4 px-4 py-2 rounded-md"
                    >
                        Create Bill <RiBillFill />
                    </Link>
                    <Link
                        to="/admin/stock"
                        className="flex items-center hover:bg-green-600 gap-4 px-4 py-2 rounded-md"
                    >
                        Add stock <CgShutterstock />
                    </Link>
                    <Link to = "/admin/stocklist" className='flex items-center hover:bg-green-600 gap-4 px-4 py-2 rounded-md'>
                        Stock List <CgShutterstock />
                    </Link>
                    <Link to = "/admin/customerList" className='flex items-center hover:bg-green-600 gap-4 px-4 py-2 rounded-md'>
                        Customer List <CgShutterstock />
                    </Link>

                    <div className="absolute bottom-4 left-0 px-4">
                    <button className="flex items-center bg-red-600 hover:bg-red-500 px-2 py-2 w-full rounded-md">
                        <img
                            src={adminLoginLogo}
                            alt="Profile"
                            className="w-6 h-6 rounded-full"
                        />
                        <Link to="/" className="ml-2 text-white font-medium">
                            Log Out
                        </Link>
                    </button>
                </div>
                </div>

                {/* Logout Section */}
                {/* <div className="absolute bottom-4 left-0 w-full px-4">
                    <button className="flex items-center bg-red-600 hover:bg-red-500 px-4 py-2 w-full rounded-md">
                        <img
                            src={adminLoginLogo}
                            alt="Profile"
                            className="w-6 h-6 rounded-full"
                        />
                        <Link to="/" className="ml-2 w-[250px] text-white font-medium">
                            Log Out
                        </Link>
                    </button>
                </div> */}
            </nav>

            {/* Main Content */}
            
        </div>
    );
};

export default Navbar;
