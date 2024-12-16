import React from "react";
import bird from '../assets/items/gameBird.png'
import { Link } from "react-router-dom";

const Footer = () => {
    return(
        <div className="bg-gray-700 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="col-span-2">
                <img src={bird} className="w-full h-32"></img>
            </div>
            <div className="items-center flex flex-col">
                <div className="text-emerald-400">
                <Link to="/aboutus" className="hover:text-emerald-100">About</Link>
                <hr />
                </div>
                <div className="flex flex-col text-emerald-400">
                    <p>abc</p>
                    <p>bdb</p>
                </div>
            </div>
            <div className="items-center flex flex-col mb-4">
                <div className="text-emerald-400">
                <Link to='/contactus' className="hover:text-emerald-100">Contact</Link>
                <hr />
                </div>
                <div className="flex flex-col text-emerald-400">
                    <p>abc</p>
                    <p>bdb</p>
                </div>
            </div>

        </div>
    )
}

export default Footer;